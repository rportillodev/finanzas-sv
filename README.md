
# Finanzas SV

A bilingual collection of personal finance tools designed for users in El Salvador.

Built with vanilla JavaScript, HTML, CSS, and Vite.

## Features

### Interest-Free Installment Calculator

- Spanish and English interface
- Purchase price and down payment inputs
- Configurable installment count (1–36)
- Optional upfront fee
- Total purchase cost calculation
- Monthly payment calculation
- Detailed installment breakdown
- Input validation and error messages
- Responsive mobile and desktop layout

## How It Works

The calculator uses the following rules:

- Financed amount = Purchase price − Down payment
- Upfront payment = Down payment + Upfront fee
- Total purchase cost = Purchase price + Upfront fee

All calculations use integer cents to reduce floating-point rounding issues.

When installment amounts cannot be divided evenly, the remaining cents are distributed among the first installments.

## Technologies

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Node.js test runner
- Git and GitHub

## Run Locally

Clone the repository:

```bash
git clone https://github.com/rportillodev/finanzas-sv.git
cd finanzas-sv
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed by Vite.

## Automated Tests

Run all automated tests:

```bash
node --test
```

The test suite covers financial calculations and translation dictionary integrity.

## Project Status

The interest-free installment calculator is functional.

Planned features:
- Monthly budget calculator
- Additional personal finance tools

## Disclaimer

This tool provides estimates for interest-free installment purchases. Actual financing conditions, fees, and payment schedules depend on the financial institution or merchant.
