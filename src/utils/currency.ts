import DineroFactory from "dinero.js";

export function dineroFormat(n: number): string {
	const d = DineroFactory({ amount: n * 100, currency: "IQD" });
	return d.toFormat("$0,0");
}

export function dineroToStr(d: DineroFactory.Dinero): string {
	return d.toFormat("$0,0");
}

export function dineroToNum(d: DineroFactory.Dinero): number {
	return d.toUnit();
}

export function dineroFromNum(n: number): DineroFactory.Dinero {
	return DineroFactory({ amount: n * 100, currency: "IQD" });
}
