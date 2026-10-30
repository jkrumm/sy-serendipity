/** Geometry for the "Visitors per day" column chart. Pure, so it can be checked without a page. */

export const CHART_HEIGHT = 168
/** Headroom above the tallest bar for the request marker. */
export const CHART_TOP = 22
export const SLOT = 10

/** Smallest "round" number (1, 2, 4, 5 × 10^k) that is >= value, at least 4 so tiny counts look calm. */
export function niceMax(value: number): number {
  const target = Math.max(value, 4)
  const magnitude = 10 ** Math.floor(Math.log10(target))
  for (const step of [1, 2, 4, 5, 10]) {
    if (step * magnitude >= target) return step * magnitude
  }
  return 10 * magnitude
}

export type Column = {
  index: number
  /** Slot centre on the x axis (viewBox units). */
  x: number
  barTop: number
  hasBar: boolean
  markerY: number | null
}

export function layoutColumns(visitors: number[], requests: number[], max: number): Column[] {
  const plot = CHART_HEIGHT - CHART_TOP
  return visitors.map((count, index) => {
    const barTop = CHART_HEIGHT - (count / max) * plot
    return {
      index,
      x: index * SLOT + SLOT / 2,
      barTop,
      hasBar: count > 0,
      markerY: (requests[index] ?? 0) > 0 ? Math.max(barTop - 11, 8) : null,
    }
  })
}

export function gridLines(max: number): { value: number; y: number }[] {
  const plot = CHART_HEIGHT - CHART_TOP
  return [max / 2, max].map((value) => ({ value, y: CHART_HEIGHT - (value / max) * plot }))
}

/** Indices of the sparse axis labels: first, last and evenly spaced ones between. */
export function labelIndices(length: number, target = 5): number[] {
  if (length <= target) return Array.from({ length }, (_, i) => i)
  const step = (length - 1) / (target - 1)
  return Array.from({ length: target }, (_, i) => Math.round(i * step))
}
