/**
 * Format a price value in the specified currency
 * @param price Price in cents (smallest currency unit)
 * @param currencyCode Currency code (e.g., 'USD', 'EUR')
 * @param locale Optional locale for formatting (defaults to 'en-US')
 */
export function formatPrice(price: number, currencyCode: string, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
    }).format(price / 100);
}
