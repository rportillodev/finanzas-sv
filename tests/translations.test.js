
import test from 'node:test';
import assert from 'node:assert/strict';

import { translations } from '../src/translations.js';

// Test 1: Both languages must have the same keys
test('Spanish and English have matching translation keys', () => {
  const spanishKeys = Object.keys(translations.es).sort();
  const englishKeys = Object.keys(translations.en).sort();

  assert.deepEqual(spanishKeys, englishKeys);
});

// Test 2: Translations must not be empty
test('All translations contain non-empty text', () => {
  for (const [language, dictionary] of Object.entries(translations)) {
    for (const [key, value] of Object.entries(dictionary)) {
      assert.equal(
        typeof value,
        'string',
        `${language}.${key} must be a string`
      );

      assert.ok(
        value.trim().length > 0,
        `${language}.${key} cannot be empty`
      );
    }
  }
});

// Test 3: Important dynamic labels must exist
test('Financial results and errors have translations', () => {
  const requiredKeys = [
    'totalPay',
    'monthlyPayment',
    'financedAmount',
    'upfrontTotal',
    'additionalFee',
    'schedule',
    'installmentLabel',
    'fullyPaid',
    'outdated',
    'invalidPrice',
    'invalidDown',
    'invalidCount',
    'invalidFee',
    'tooLarge',
    'tooManyPayments',
    'calculationError'
  ];

  for (const language of ['es', 'en']) {
    for (const key of requiredKeys) {
      assert.ok(
        typeof translations[language][key] === 'string' &&
        translations[language][key].trim().length > 0,
        `Missing translation: ${language}.${key}`
      );
    }
  }
});
