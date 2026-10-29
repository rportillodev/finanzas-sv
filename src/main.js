
import './style.css';

import {
  moneyToCents,
  calculatePurchase
} from './calculator.js';

import { translations } from './translations.js';

// ==========================================
// 1. APPLICATION STATE
// ==========================================

// Spanish is the default language
let currentLanguage = 'es';

// Store the most recent successful calculation
let lastResult = null;

// Track the currently displayed validation error
let currentError = null;

// ==========================================
// 2. FIND HTML ELEMENTS
// ==========================================

const form = document.getElementById('installment-form');
const resultsSection = document.getElementById('results');
const languageSelect = document.getElementById('language-select');

// Create a container for the financial results
const resultsContent = document.createElement('div');
resultsContent.id = 'results-content';
resultsContent.setAttribute('aria-live', 'polite');

// Move the initial placeholder into the container
const placeholder = resultsSection.querySelector('p');
placeholder.replaceWith(resultsContent);
resultsContent.append(placeholder);

// Create the outdated-results warning
const outdatedNotice = document.createElement('p');
outdatedNotice.className = 'outdated-notice';
outdatedNotice.hidden = true;

resultsSection.insertBefore(outdatedNotice, resultsContent);

// JavaScript will handle form validation
form.noValidate = true;

// ==========================================
// 3. FORMAT MONEY AS USD
// ==========================================

function formatUSD(amountCents) {
  const digits = String(amountCents).padStart(3, '0');

  const dollars = digits
    .slice(0, -2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const cents = digits.slice(-2);

  return `$${dollars}.${cents}`;
}

// ==========================================
// 4. MANAGE VALIDATION ERRORS
// ==========================================

function clearErrors() {
  form.querySelectorAll('.field-error').forEach(error => {
    error.remove();
  });

  form.querySelectorAll('[aria-invalid="true"]').forEach(input => {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
  });

  currentError = null;
}

function showError(inputId, translationKey) {
  clearErrors();

  const input = document.getElementById(inputId);
  const error = document.createElement('p');

  error.className = 'field-error';
  error.id = `${inputId}-error`;

  // Get the message in the currently selected language
  error.textContent = translations[currentLanguage][translationKey];

  input.after(error);

  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', error.id);

  // Remember the error so it can be translated later
  currentError = {
    inputId,
    translationKey
  };

  input.focus();
}

// ==========================================
// 5. CREATE REUSABLE RESULT ROWS
// ==========================================

function addResultRow(parent, label, value, primary = false) {
  const row = document.createElement('div');

  row.className = primary
    ? 'result-row result-row--primary'
    : 'result-row';

  const labelElement = document.createElement('span');
  labelElement.textContent = label;

  const valueElement = document.createElement('strong');
  valueElement.textContent = value;

  row.append(labelElement, valueElement);
  parent.append(row);
}

// ==========================================
// 6. DISPLAY FINANCIAL RESULTS
// ==========================================

function displayResults(result) {
  const t = translations[currentLanguage];

  const {
    financedCents,
    upfrontCents,
    totalCents,
    feeCents,
    paymentSchedule
  } = result;

  // Remember whether the breakdown is expanded
  const wasExpanded =
    resultsContent.querySelector('details')?.open ?? false;

  // Clear previous content, including the placeholder
  resultsContent.replaceChildren();

  // Primary financial results
  addResultRow(
    resultsContent,
    t.totalPay,
    formatUSD(totalCents),
    true
  );

  if (paymentSchedule.length > 0) {
    const lowestPayment = Math.min(...paymentSchedule);
    const highestPayment = Math.max(...paymentSchedule);

    const monthlyText = lowestPayment === highestPayment
      ? formatUSD(lowestPayment)
      : `${formatUSD(lowestPayment)} – ${formatUSD(highestPayment)}`;

    addResultRow(
      resultsContent,
      t.monthlyPayment,
      monthlyText,
      true
    );
  } else {
    addResultRow(
      resultsContent,
      t.monthlyPayment,
      formatUSD(0),
      true
    );
  }

  // Supporting financial information
  addResultRow(
    resultsContent,
    t.financedAmount,
    formatUSD(financedCents)
  );

  addResultRow(
    resultsContent,
    t.upfrontTotal,
    formatUSD(upfrontCents)
  );

  addResultRow(
    resultsContent,
    t.additionalFee,
    formatUSD(feeCents)
  );

  // Handle purchases paid entirely upfront
  if (paymentSchedule.length === 0) {
    const message = document.createElement('p');
    message.textContent = t.fullyPaid;

    resultsContent.append(message);
    return;
  }

  // Create the expandable installment breakdown
  const details = document.createElement('details');
  details.className = 'installment-details';
  details.open = wasExpanded;

  const summary = document.createElement('summary');
  summary.textContent = t.schedule;

  const list = document.createElement('ol');

  paymentSchedule.forEach((payment, index) => {
    const item = document.createElement('li');

    item.textContent =
      `${t.installmentLabel} ${index + 1}: ${formatUSD(payment)}`;

    list.append(item);
  });

  details.append(summary, list);
  resultsContent.append(details);
}

// ==========================================
// 7. LANGUAGE SWITCHING
// ==========================================

function changeLanguage(language) {
  // Ignore unsupported language values
  if (!translations[language]) {
    return;
  }

  currentLanguage = language;
  languageSelect.value = language;

  const t = translations[currentLanguage];

  // Update the document language and browser tab
  document.documentElement.lang = language;
  document.title = t.pageTitle;

  // Translate static HTML elements
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;

    if (t[key] !== undefined) {
      element.textContent = t[key];
    }
  });

  // Translate the outdated-results warning
  outdatedNotice.textContent = t.outdated;

  // Translate an existing validation error
  if (currentError) {
    const error = document.getElementById(
      `${currentError.inputId}-error`
    );

    if (error) {
      error.textContent = t[currentError.translationKey];
    }
  }

  // Redisplay the last calculation in the selected language
  if (lastResult !== null) {
    displayResults(lastResult);
  }
}

languageSelect.addEventListener('change', function (event) {
  changeLanguage(event.target.value);
});

// Initialize the interface in Spanish
changeLanguage('es');

// ==========================================
// 8. DETECT INPUT CHANGES
// ==========================================

form.addEventListener('input', function () {
  clearErrors();

  if (lastResult !== null) {
    outdatedNotice.hidden = false;
  }
});

// ==========================================
// 9. HANDLE FORM SUBMISSION
// ==========================================

form.addEventListener('submit', function (event) {
  event.preventDefault();
  clearErrors();

  // Read all four input strings
  const purchasePrice =
    document.getElementById('purchase-price').value;

  const downPayment =
    document.getElementById('down-payment').value;

  const installments =
    document.getElementById('installments').value;

  const upfrontFee =
    document.getElementById('upfront-fee').value;

  // Convert monetary values into integer cents
  const priceCents = moneyToCents(purchasePrice);
  const downCents = moneyToCents(downPayment, true);
  const feeCents = moneyToCents(upfrontFee, true);

  const count = Number(installments);

  // ========================================
  // 10. VALIDATE INPUTS
  // ========================================

  if (priceCents === null || priceCents <= 0) {
    showError('purchase-price', 'invalidPrice');
    return;
  }

  if (downCents === null || downCents > priceCents) {
    showError('down-payment', 'invalidDown');
    return;
  }

  if (
    !/^\d+$/.test(installments) ||
    !Number.isInteger(count) ||
    count < 1 ||
    count > 36
  ) {
    showError('installments', 'invalidCount');
    return;
  }

  if (feeCents === null) {
    showError('upfront-fee', 'invalidFee');
    return;
  }

  // ========================================
  // 11. PERFORM FINANCIAL CALCULATIONS
  // ========================================

  const calculation = calculatePurchase(
    priceCents,
    downCents,
    feeCents,
    count
  );

  const {
    financedCents,
    upfrontCents,
    totalCents,
    paymentSchedule
  } = calculation;

  // Verify safe integer amounts
  if (
    !Number.isSafeInteger(financedCents) ||
    !Number.isSafeInteger(upfrontCents) ||
    !Number.isSafeInteger(totalCents)
  ) {
    showError('purchase-price', 'tooLarge');
    return;
  }

  // Prevent payments smaller than one cent
  if (financedCents > 0 && financedCents < count) {
    showError('installments', 'tooManyPayments');
    return;
  }

  // ========================================
  // 12. VERIFY FINANCIAL ACCURACY
  // ========================================

  const installmentTotal = paymentSchedule.reduce(
    (sum, payment) => sum + payment,
    0
  );

  if (
    installmentTotal !== financedCents ||
    upfrontCents + installmentTotal !== totalCents
  ) {
    showError('purchase-price', 'calculationError');
    return;
  }

  // ========================================
  // 13. STORE AND DISPLAY RESULTS
  // ========================================

  lastResult = {
    financedCents,
    upfrontCents,
    totalCents,
    feeCents,
    paymentSchedule
  };

  displayResults(lastResult);

  outdatedNotice.hidden = true;

  // Scroll to the results on mobile devices
  if (window.matchMedia('(max-width: 799px)').matches) {
    resultsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
});
