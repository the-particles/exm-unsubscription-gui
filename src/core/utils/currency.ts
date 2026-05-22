/**
 * Format a number amount to currency string.
 * Supports VND, USD, EUR, etc., formatting appropriately.
 */
export const formatCurrency = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount)
  } catch (exception) {
    console.info('Error while parsing number:', exception)
    return `${currency.toUpperCase()} ${amount.toFixed(2)}`
  }
}
