
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  moneyToCents,
  calculatePurchase
} from '../src/calculator.js';

test('converts whole dollars to cents', () => {
  assert.equal(moneyToCents('100'), 10000);
});

test('converts decimal dollars to cents', () => {
  assert.equal(moneyToCents('0.29'), 29);
});

test('handles one decimal digit', () => {
  assert.equal(moneyToCents('15.5'), 1550);
});

test('converts an empty optional field to zero', () => {
  assert.equal(moneyToCents('', true), 0);
});

test('rejects more than two decimal places', () => {
  assert.equal(moneyToCents('12.999'), null);
});


test('calculates a purchase with a down payment and fee', () => {
  const result = calculatePurchase(120000, 20000, 2000, 10);

  assert.equal(result.financedCents, 100000);
  assert.equal(result.upfrontCents, 22000);
  assert.equal(result.totalCents, 122000);

  assert.deepEqual(
    result.paymentSchedule,
    Array(10).fill(10000)
  );
});


test('distributes remaining cents correctly', () => {
  const result = calculatePurchase(10000, 0, 200, 6);

  assert.deepEqual(result.paymentSchedule, [
    1667, 1667, 1667, 1667, 1666, 1666
  ]);

  const installmentTotal = result.paymentSchedule.reduce(
    (sum, payment) => sum + payment,
    0
  );

  assert.equal(installmentTotal, 10000);

  assert.equal(
    result.upfrontCents + installmentTotal,
    result.totalCents
  );
});


test('does not generate installments when fully paid upfront', () => {
  const result = calculatePurchase(90000, 90000, 500, 12);

  assert.equal(result.financedCents, 0);
  assert.equal(result.upfrontCents, 90500);
  assert.equal(result.totalCents, 90500);
  assert.deepEqual(result.paymentSchedule, []);
});


