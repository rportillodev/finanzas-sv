
# Finanzas SV

**A bilingual personal finance web application for El Salvador.**

[Live Demo](https://rportillodev.github.io/finanzas-sv/) | [Source Code](https://github.com/rportillodev/finanzas-sv)

Finanzas SV helps users understand the cost of purchases made through interest-free installment plans.

The first release includes a responsive installment calculator with Spanish and English support, upfront payment calculations, input validation, and detailed payment schedules.


## Engineering Decisions

### Financial Accuracy
Currency values are converted to integer cents before calculations to reduce floating-point rounding errors.

When financed amounts cannot be divided evenly, remaining cents are distributed among the first installments, preserving the exact financed total.

### Separation of Concerns
Financial calculations are implemented in `src/calculator.js`, separately from the user interface in `src/main.js`.

This allows the financial logic to be tested independently.

### Internationalization
Spanish and English translations are maintained in `src/translations.js`.

The application uses the same calculation logic for both languages and translates dynamically generated results.

### Automated Testing and Deployment
The project includes automated tests for financial calculations and translation dictionary integrity.

GitHub Actions runs tests, builds the application with Vite, and deploys it to GitHub Pages.
