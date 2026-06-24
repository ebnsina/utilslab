/** Core financial math. All functions are pure and framework-agnostic. */

/**
 * Fixed monthly payment for an amortizing loan (annuity formula).
 * @param principal loan amount
 * @param annualRatePct annual interest rate as a percentage (e.g. 6.5)
 * @param months total number of monthly payments
 */
export function monthlyPayment(principal: number, annualRatePct: number, months: number): number {
	if (months <= 0) return 0;
	const r = annualRatePct / 100 / 12;
	if (r === 0) return principal / months;
	return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export interface AmortizationRow {
	period: number;
	payment: number;
	principal: number;
	interest: number;
	balance: number;
}

export interface AmortizationResult {
	payment: number;
	totalInterest: number;
	totalPaid: number;
	schedule: AmortizationRow[];
}

/** Full month-by-month amortization schedule. */
export function amortize(
	principal: number,
	annualRatePct: number,
	months: number
): AmortizationResult {
	const payment = monthlyPayment(principal, annualRatePct, months);
	const r = annualRatePct / 100 / 12;
	const schedule: AmortizationRow[] = [];

	let balance = principal;
	let totalInterest = 0;

	for (let period = 1; period <= months; period++) {
		const interest = balance * r;
		let principalPaid = payment - interest;
		// Final payment: absorb rounding so the balance lands on zero.
		if (period === months || principalPaid > balance) principalPaid = balance;
		balance -= principalPaid;
		totalInterest += interest;
		schedule.push({
			period,
			payment: principalPaid + interest,
			principal: principalPaid,
			interest,
			balance: Math.max(balance, 0)
		});
	}

	return {
		payment,
		totalInterest,
		totalPaid: principal + totalInterest,
		schedule
	};
}

/**
 * Future value of a present sum with periodic compounding.
 * @param principal present value
 * @param annualRatePct annual nominal rate (%)
 * @param years investment horizon in years
 * @param compoundsPerYear e.g. 12 for monthly, 1 for annual
 * @param contribution recurring contribution added each compounding period
 */
export function futureValue(
	principal: number,
	annualRatePct: number,
	years: number,
	compoundsPerYear = 12,
	contribution = 0
): number {
	const n = compoundsPerYear;
	const t = years;
	const i = annualRatePct / 100 / n;
	const periods = n * t;

	if (i === 0) return principal + contribution * periods;

	const growth = Math.pow(1 + i, periods);
	const fvPrincipal = principal * growth;
	const fvContributions = contribution * ((growth - 1) / i);
	return fvPrincipal + fvContributions;
}

/** Return on investment as a percentage. */
export function roi(initial: number, final: number): number {
	return initial === 0 ? NaN : ((final - initial) / initial) * 100;
}

/**
 * Recurring monthly contribution needed to reach a savings target.
 * @param target goal amount
 * @param current starting balance
 */
export function requiredContribution(
	target: number,
	current: number,
	annualRatePct: number,
	years: number,
	compoundsPerYear = 12
): number {
	const i = annualRatePct / 100 / compoundsPerYear;
	const periods = compoundsPerYear * years;
	if (periods <= 0) return NaN;
	const growth = Math.pow(1 + i, periods);
	if (i === 0) return (target - current) / periods;
	return (target - current * growth) / ((growth - 1) / i);
}

/** Present value of a future sum. */
export function presentValue(
	future: number,
	annualRatePct: number,
	years: number,
	compoundsPerYear = 12
): number {
	const i = annualRatePct / 100 / compoundsPerYear;
	return future / Math.pow(1 + i, compoundsPerYear * years);
}
