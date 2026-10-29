
export function moneyToCents(rawValue, optional = false) {
  // If an optional field is empty, return zero
  if (optional && rawValue === '') {
    return 0;
  }

  // Verify that the amount has up to two decimal places
  const validFormat = /^\d+(\.\d{1,2})?$/.test(rawValue);

  if (!validFormat) {
    return null;
  }

  // Separate dollars and cents
  const [dollars, decimals = ''] = rawValue.split('.');

  // Ensure two decimal digits
  const cents = decimals.padEnd(2, '0');

  // Convert the monetary amount into integer cents
  const totalCents = Number(dollars + cents);

  // Return the amount only if it is a safe integer
  return Number.isSafeInteger(totalCents)
    ? totalCents
    : null;

    
}

export function calculatePurchase(
  priceCents,
  downCents,
  feeCents,
  count
) {
  // Calculate the financial amounts
  const financedCents = priceCents - downCents;
  const upfrontCents = downCents + feeCents;
  const totalCents = priceCents + feeCents;

  // Store the individual installments
  const paymentSchedule = [];

  // Generate payments only when financing is needed
  if (financedCents > 0) {
    const basePayment = Math.floor(financedCents / count);
    const remainingCents = financedCents % count;

    for (let i = 0; i < count; i++) {
      let payment = basePayment;

      if (i < remainingCents) {
        payment += 1;
      }

      paymentSchedule.push(payment);
    }
  }

  // Return all financial results together
  return {
    financedCents,
    upfrontCents,
    totalCents,
    paymentSchedule
  };
}
