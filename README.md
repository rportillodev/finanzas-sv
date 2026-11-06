
# Finanzas SV

**Bilingual personal finance tools for El Salvador.**

[Live Demo](https://rportillodev.github.io/finanzas-sv/) | [GitHub Repository](https://github.com/rportillodev/finanzas-sv)

Finanzas SV is a responsive web application that helps users understand the cost of purchases made through interest-free installment plans.

Built with vanilla JavaScript, HTML, CSS, and Vite.

## Application Preview

![Finanzas SV desktop calculator showing purchase inputs and calculated financial results](docs/images/installment-calculator-desktop.png)

## Features

### Interest-Free Installment Calculator

- Spanish and English interface
- Purchase price and down payment inputs
- 1–36 monthly installments
- Optional upfront fee
- Exact financed amount and total purchase cost
- Expandable installment-by-installment schedule
- Input validation with translated error messages
- Responsive layout for desktop and mobile

## Example Calculation

Consider a $1,200 purchase with a $200 down payment, 10 installments, and a $20 upfront fee.

| Result | Amount |
|---|---:|
| Financed amount | $1,000.00 |
| Monthly installment | $100.00 |
| Total payable today | $220.00 |
| Total purchase cost | $1,220.00 |

Try this example in the [live calculator](https://rportillodev.github.io/finanzas-sv/).

## Engineering Decisions

### Financial Accuracy

The application converts monetary values into integer cents before performing calculations to reduce floating-point rounding errors.

When the financed amount cannot be divided evenly, remaining cents are distributed among the first installments.

### Separation of Concerns

Financial calculations are implemented in `src/calculator.js`, independently of the interface logic in `src/main.js`.

This separation allows financial functions to be tested without a browser.

### Internationalization

Spanish and English text is maintained in `src/translations.js`.

Both languages share the same financial calculation logic. Results, installment breakdowns, and validation messages are translated dynamically.

### Automated Testing

The project uses Node.js's built-in test runner.

The tests cover:
- Currency conversion
- Installment calculations
- Rounding and cent distribution
- Fully upfront purchases
- Translation dictionary consistency

### Continuous Deployment

GitHub Actions runs the automated tests, builds the application with Vite, and deploys the production files to GitHub Pages.

## Technology Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- Node.js test runner
- Git and GitHub
- GitHub Actions and GitHub Pages

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

Open the local URL provided by Vite.

## Run Tests

```bash
node --test
```

## Production Build

```bash
npm run build
```

Vite generates the production website in the `dist` directory.

## Roadmap

- [x] Interest-free installment calculator
- [x] Spanish and English support
- [x] Automated financial and translation tests
- [x] GitHub Pages deployment
- [ ] Monthly budget calculator
- [ ] Additional personal finance tools

## Disclaimer

The calculator provides estimates for interest-free installment purchases. Actual fees, financing conditions, and payment schedules depend on the merchant or financial institution.
