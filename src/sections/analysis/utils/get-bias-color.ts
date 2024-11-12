export function getBiasColor(
    biasRate: number,
    suffix: string = "stroke",
): string {
    if (biasRate < 0.3) return `${suffix}-chart-2`
    if (biasRate < 0.7) return `${suffix}-chart-4`
    return `${suffix}-chart-1`
}
