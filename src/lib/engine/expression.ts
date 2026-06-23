/**
 * A small, dependency-free math expression evaluator (shunting-yard → RPN).
 * Supports + - * / ^, unary minus, parentheses, constants (pi, e) and the
 * functions used by the scientific calculator. Angles are in radians.
 *
 * Returns NaN on malformed input rather than throwing, so the UI can simply
 * show "Error" without try/catch noise.
 */

type Tok =
	| { type: 'num'; value: number }
	| { type: 'op'; value: string }
	| { type: 'fn'; value: string }
	| { type: 'paren'; value: '(' | ')' };

const FUNCTIONS: Record<string, (x: number) => number> = {
	sin: Math.sin,
	cos: Math.cos,
	tan: Math.tan,
	asin: Math.asin,
	acos: Math.acos,
	atan: Math.atan,
	ln: Math.log,
	log: Math.log10,
	sqrt: Math.sqrt,
	abs: Math.abs,
	exp: Math.exp
};

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

const PRECEDENCE: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3, 'u-': 4 };
const RIGHT_ASSOC = new Set(['^', 'u-']);

function tokenize(input: string): Tok[] | null {
	const tokens: Tok[] = [];
	let i = 0;
	const src = input.replace(/\s+/g, '');

	while (i < src.length) {
		const ch = src[i];

		if (/[0-9.]/.test(ch)) {
			let num = '';
			while (i < src.length && /[0-9.]/.test(src[i])) num += src[i++];
			const value = Number(num);
			if (Number.isNaN(value)) return null;
			tokens.push({ type: 'num', value });
			continue;
		}

		if (/[a-z]/i.test(ch)) {
			let name = '';
			while (i < src.length && /[a-z]/i.test(src[i])) name += src[i++].toLowerCase();
			if (name in CONSTANTS) tokens.push({ type: 'num', value: CONSTANTS[name] });
			else if (name in FUNCTIONS) tokens.push({ type: 'fn', value: name });
			else return null;
			continue;
		}

		if (ch === '(' || ch === ')') {
			tokens.push({ type: 'paren', value: ch });
			i++;
			continue;
		}

		if ('+-*/^'.includes(ch)) {
			// Detect unary minus: at start, or after an operator / opening paren.
			const prev = tokens.at(-1);
			const isUnary =
				ch === '-' &&
				(!prev || prev.type === 'op' || (prev.type === 'paren' && prev.value === '('));
			tokens.push({ type: 'op', value: isUnary ? 'u-' : ch });
			i++;
			continue;
		}

		return null; // unknown character
	}
	return tokens;
}

function toRpn(tokens: Tok[]): Tok[] | null {
	const output: Tok[] = [];
	const stack: Tok[] = [];

	for (const tok of tokens) {
		if (tok.type === 'num') {
			output.push(tok);
		} else if (tok.type === 'fn') {
			stack.push(tok);
		} else if (tok.type === 'op') {
			while (stack.length) {
				const top = stack.at(-1)!;
				if (
					top.type === 'op' &&
					(PRECEDENCE[top.value] > PRECEDENCE[tok.value] ||
						(PRECEDENCE[top.value] === PRECEDENCE[tok.value] && !RIGHT_ASSOC.has(tok.value)))
				) {
					output.push(stack.pop()!);
				} else break;
			}
			stack.push(tok);
		} else if (tok.value === '(') {
			stack.push(tok);
		} else {
			// Closing paren: pop until matching '('.
			while (stack.length && !(stack.at(-1)!.type === 'paren')) output.push(stack.pop()!);
			if (!stack.length) return null;
			stack.pop(); // discard '('
			if (stack.at(-1)?.type === 'fn') output.push(stack.pop()!);
		}
	}
	while (stack.length) {
		const top = stack.pop()!;
		if (top.type === 'paren') return null; // mismatched parens
		output.push(top);
	}
	return output;
}

function evalRpn(rpn: Tok[]): number {
	const stack: number[] = [];
	for (const tok of rpn) {
		if (tok.type === 'num') {
			stack.push(tok.value);
		} else if (tok.type === 'fn') {
			const a = stack.pop();
			if (a === undefined) return NaN;
			stack.push(FUNCTIONS[tok.value](a));
		} else if (tok.type === 'op') {
			if (tok.value === 'u-') {
				const a = stack.pop();
				if (a === undefined) return NaN;
				stack.push(-a);
				continue;
			}
			const b = stack.pop();
			const a = stack.pop();
			if (a === undefined || b === undefined) return NaN;
			switch (tok.value) {
				case '+':
					stack.push(a + b);
					break;
				case '-':
					stack.push(a - b);
					break;
				case '*':
					stack.push(a * b);
					break;
				case '/':
					stack.push(a / b);
					break;
				case '^':
					stack.push(a ** b);
					break;
			}
		}
	}
	return stack.length === 1 ? stack[0] : NaN;
}

/** Evaluate a math expression string. Returns NaN on any error. */
export function evaluate(input: string): number {
	if (!input.trim()) return NaN;
	const tokens = tokenize(input);
	if (!tokens) return NaN;
	const rpn = toRpn(tokens);
	if (!rpn) return NaN;
	return evalRpn(rpn);
}
