import type { Tool, Inputs, Result } from './types';
import { quadratic } from '$lib/engine/math';
import { number } from '$lib/engine/format';

export const quadraticTool: Tool = {
	slug: 'quadratic',
	title: 'Quadratic Formula Calculator',
	category: 'math',
	description: 'Solve ax² + bx + c = 0 and see the roots and discriminant.',
	keywords: ['quadratic', 'roots', 'equation', 'discriminant', 'parabola'],
	fields: [
		{ name: 'a', label: 'a', type: 'number', default: 1, step: 0.1 },
		{ name: 'b', label: 'b', type: 'number', default: -5, step: 0.1 },
		{ name: 'c', label: 'c', type: 'number', default: 6, step: 0.1 }
	],
	compute(i: Inputs): Result[] {
		const { roots, complex, discriminant } = quadratic(Number(i.a), Number(i.b), Number(i.c));
		const out: Result[] = [];
		if (complex) {
			out.push({
				kind: 'stat',
				label: 'Roots (complex)',
				value: `${number(complex[0].re, 3)} ± ${number(Math.abs(complex[0].im), 3)}i`,
				primary: true
			});
		} else if (roots.length === 2) {
			out.push({ kind: 'stat', label: 'x₁', value: number(roots[0], 4), primary: true });
			out.push({ kind: 'stat', label: 'x₂', value: number(roots[1], 4) });
		} else if (roots.length === 1) {
			out.push({ kind: 'stat', label: 'Double root', value: number(roots[0], 4), primary: true });
		} else {
			out.push({ kind: 'stat', label: 'Roots', value: 'No solution', primary: true });
		}
		if (Number.isFinite(discriminant)) {
			out.push({ kind: 'stat', label: 'Discriminant', value: number(discriminant, 3) });
		}
		return out;
	}
};
