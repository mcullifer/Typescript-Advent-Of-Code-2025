import { Benchmark } from "@/util/benchmark";
import { Reader } from "@/util/reader";

function modulo(n: number, m: number): number {
	return ((n % m) + m) % m;
}

function part1(input: string[]) {
	let current = 50;
	let count = 0;
	for (const rotation of input) {
		const dir = rotation[0];
		const distance = parseInt(rotation.slice(1));
		switch (dir) {
			case "L":
				current = modulo(current - distance, 100);
				break;
			case "R":
				current = modulo(current + distance, 100);
				break;
		}
		if (current === 0) {
			count++;
		}
	}
	return count;
}

function part2(input: string[]) {
	let current = 50;
	let count = 0;
	for (const rotation of input) {
		const dir = rotation[0];
		const distance = parseInt(rotation.slice(1));

		switch (dir) {
			case "L":
				if (current === 0) {
					count += Math.floor(distance / 100);
				} else if (distance >= current) {
					count += 1 + Math.floor((distance - current) / 100);
				}
				current = modulo(current - distance, 100);
				break;
			case "R":
				count += Math.floor((current + distance) / 100);
				current = modulo(current + distance, 100);
				break;
		}
	}
	return count;
}

const test = Reader.read(1, "test");
const input = Reader.read(1, "input");
Benchmark.withTitle(1).run(part1, input).run(part2, input);
