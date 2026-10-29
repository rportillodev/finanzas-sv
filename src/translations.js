
export const translations = {
  es: {
    // General interface
    pageTitle: 'Calculadora de cuotas | Finanzas SV',
    brand: 'Finanzas SV',
    title: 'Calculadora de compras a cuotas',
    description: 'Descubre cuánto pagarás por tus compras a cuotas sin intereses.',
    formTitle: 'Detalles de la compra',

    // Form fields
    purchasePrice: 'Precio de compra (USD)',
    downPayment: 'Prima o pago inicial (USD)',
    installments: 'Número de cuotas',
    upfrontFee: 'Cargo único inicial (USD)',
    calculate: 'Calcular',

    // Financial results
    resultsTitle: 'Resultados',
    placeholder: 'Ingresa los datos de tu compra y presiona Calcular.',
    totalPay: 'Total a pagar',
    monthlyPayment: 'Cuota mensual',
    financedAmount: 'Monto financiado',
    upfrontTotal: 'Total a pagar hoy',
    additionalFee: 'Cargo adicional',

    // Installment schedule
    schedule: 'Ver desglose de cuotas',
    installmentLabel: 'Cuota',
    fullyPaid: 'No hay saldo pendiente de financiar. La compra se paga completamente al inicio.',

    // Warnings
    outdated: 'Los datos cambiaron. Presiona Calcular para actualizar los resultados.',

    // Validation messages
    invalidPrice: 'Ingresa un precio válido mayor que cero.',
    invalidDown: 'La prima no puede superar el precio de compra.',
    invalidCount: 'Ingresa un número de cuotas entre 1 y 36.',
    invalidFee: 'Ingresa un cargo inicial válido.',
    tooLarge: 'El monto ingresado es demasiado grande.',
    tooManyPayments: 'Reduce el número de cuotas para este monto.',
    calculationError: 'No se pudo completar el cálculo. Revisa los valores ingresados.'
  },

  en: {
    // General interface
    pageTitle: 'Installment Calculator | Finanzas SV',
    brand: 'Finanzas SV',
    title: 'Installment Purchase Calculator',
    description: 'Find out how much you will pay for purchases made in interest-free installments.',
    formTitle: 'Purchase details',

    // Form fields
    purchasePrice: 'Purchase price (USD)',
    downPayment: 'Down payment (USD)',
    installments: 'Number of installments',
    upfrontFee: 'One-time upfront fee (USD)',
    calculate: 'Calculate',

    // Financial results
    resultsTitle: 'Results',
    placeholder: 'Enter your purchase details and press Calculate.',
    totalPay: 'Total purchase cost',
    monthlyPayment: 'Monthly installment',
    financedAmount: 'Financed amount',
    upfrontTotal: 'Total payable today',
    additionalFee: 'Additional fee',

    // Installment schedule
    schedule: 'View installment breakdown',
    installmentLabel: 'Installment',
    fullyPaid: 'No balance remains to be financed. The purchase is paid entirely upfront.',

    // Warnings
    outdated: 'Purchase details have changed. Press Calculate to update the results.',

    // Validation messages
    invalidPrice: 'Enter a valid purchase price greater than zero.',
    invalidDown: 'The down payment cannot exceed the purchase price.',
    invalidCount: 'Enter a number of installments between 1 and 36.',
    invalidFee: 'Enter a valid upfront fee.',
    tooLarge: 'The entered amount is too large.',
    tooManyPayments: 'Reduce the number of installments for this amount.',
    calculationError: 'The calculation could not be completed. Review the entered values.'
  }
};
