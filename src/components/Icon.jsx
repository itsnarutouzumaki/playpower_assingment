/**
 * Icon
 *
 * Thin wrapper around a 24x24 viewBox `<svg>` shell so every inline icon in
 * the app (search, share, save, close, prev/next, etc.) shares consistent
 * stroke-based styling (`currentColor`, rounded line caps/joins) and only
 * needs to supply its own `<path>`/`<circle>` children.
 *
 * Why this exists instead of an icon library for every icon:
 * Several icons in this project are custom line-art matched to the
 * reference design rather than a stock icon set, so a small shared shell
 * keeps their stroke width/size/color consistent without duplicating the
 * surrounding `<svg>` attributes in every component. `aria-hidden="true"` is
 * set by default because these icons are decorative — the interactive
 * elements that contain them (buttons, links) carry their own
 * `aria-label`s.
 *
 * @author @itsnarutouzumaki
 */
export default function Icon({ children, size = 20, stroke = 2 }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      viewBox="0 0 24 24"
      width={size}
    >
      {children}
    </svg>
  );
}
