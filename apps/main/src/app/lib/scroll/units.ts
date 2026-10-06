/**
 * Convert an artboard measurement to a CSS length that scales with the
 * viewport. The artboard is 1512x982 at desktop and 1000x982 at tablet
 * (`--ab-w` / `--ab-h` in `globals.css`); `--u` is one artboard pixel.
 *
 * @example
 * // A 120px-wide sun in Figma, 40px from the left:
 * <div style={{ width: u(120), left: u(40) }} />
 * // -> width: calc(120 * var(--u)); left: calc(40 * var(--u))
 */
export function u(n: number): string {
  return `calc(${n} * var(--u))`;
}
