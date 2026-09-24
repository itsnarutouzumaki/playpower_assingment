const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODELS_URL = "https://api.groq.com/openai/v1/models";
const PREFERRED_MODELS = [
  "openai/gpt-oss-20b",
  "llama-4-scout-17b-16e-instruct",
  "llama-3.3-70b-versatile",
  "qwen/qwen3-32b",
];

async function getAvailableModel(apiKey) {
  const modelsResponse = await fetch(GROQ_MODELS_URL, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!modelsResponse.ok) {
    const errorBody = await modelsResponse.text();
    throw new Error(
      `Could not load Groq models (HTTP ${modelsResponse.status}): ${errorBody.slice(0, 160)}`,
    );
  }

  const modelsResult = await modelsResponse.json();
  const availableModels = (modelsResult.data || []).map((model) => model.id);
  const selectedModel =
    PREFERRED_MODELS.find((model) => availableModels.includes(model)) ||
    availableModels.find(
      (model) =>
        !model.includes("whisper") &&
        !model.includes("guard") &&
        !model.includes("safety") &&
        !model.includes("embedding"),
    );

  if (!selectedModel) {
    throw new Error(
      "No compatible Groq chat model is available for this API key",
    );
  }

  return selectedModel;
}

export default async function handler(request, response) {
  console.info("[review-summary] handler:start", {
    method: request.method,
    hasKey: Boolean(process.env.LLM_KEY),
  });

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.LLM_KEY) {
    return response.status(500).json({ error: "LLM_KEY is not configured" });
  }

  const reviews = Array.isArray(request.body?.reviews)
    ? request.body.reviews.filter(
        (review) => typeof review === "string" && review.trim(),
      )
    : [];

  if (reviews.length === 0) {
    return response
      .status(400)
      .json({ error: "At least one review is required" });
  }

  console.info("[review-summary] input:validated", {
    reviewCount: reviews.length,
    reviewLengths: reviews.map((review) => review.length),
  });

  const reviewText = reviews
    .map((review, index) => `${index + 1}. ${review}`)
    .join("\n");
  const prompt = [
    "Summarize the following guest reviews for a vacation rental listing.",
    "Mention the strongest recurring positives and any notable concern, if one exists.",
    "Be concise and grounded only in the supplied reviews.",
    'Return valid JSON only with this exact shape: {"summary":"..."}.',
    "Reviews:",
    reviewText,
  ].join("\n\n");

  try {
    const groqModel = await getAvailableModel(process.env.LLM_KEY);
    console.info("[review-summary] groq:model-selected", { model: groqModel });

    const groqResponse = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LLM_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: groqModel,
        temperature: 0.9,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: "You are a precise review summarizer. Output JSON only.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    console.info("[review-summary] groq:response", {
      status: groqResponse.status,
      ok: groqResponse.ok,
      contentType: groqResponse.headers.get("content-type"),
    });

    if (!groqResponse.ok) {
      const errorBody = await groqResponse.text();
      let errorMessage = "Groq request failed";

      try {
        const parsedError = JSON.parse(errorBody);
        errorMessage = parsedError.error?.message || errorMessage;
      } catch {
        errorMessage = errorBody.trim() || errorMessage;
      }

      console.error("[review-summary] groq:error", {
        status: groqResponse.status,
        message: errorMessage,
        bodyPreview: errorBody.slice(0, 200),
      });
      return response
        .status(502)
        .json({ error: `Groq error: ${errorMessage}` });
    }

    const result = await groqResponse.json();
    const content = result.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);

    if (typeof parsed.summary !== "string" || !parsed.summary.trim()) {
      return response
        .status(502)
        .json({ error: "Groq returned an invalid summary" });
    }

    console.info("[review-summary] success", {
      summaryLength: parsed.summary.length,
    });
    return response.status(200).json({ summary: parsed.summary.trim() });
  } catch (error) {
    console.error("[review-summary] handler:error", { message: error.message });
    return response
      .status(502)
      .json({ error: `Unable to summarize reviews: ${error.message}` });
  }
}
