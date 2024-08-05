import dotenv from "dotenv";
import "reflect-metadata"; //must import

dotenv.config();

function getCommonPrefix(strs: string[]) {
	const comparer: string = strs.reduce((a, b) => a.length <= b.length ? a : b);
	const strWithoutComparer = strs.filter(a => a != comparer);
	
	// check if all string are the same
	if (!strWithoutComparer.length) { return comparer; }

	let lenToCompare: number = comparer.length;
	
	let common: string = '';
	let result: string = '';
	while(lenToCompare > 0) {
		common = comparer.substring(0, lenToCompare);
		if (strWithoutComparer.filter(a => a.indexOf(common) >= 0).length === strWithoutComparer.length) {
			result = common;
			break;
		}
		lenToCompare -= 1;
	}

	return result;
}

function main() {
	const input: string[] = ['flower', 'flow', 'flight'];
  const output: string = getCommonPrefix(input);

	const input2: string[] = ['dog', 'racecar', 'car'];
  const output2: string = getCommonPrefix(input2);

	const input3: string[] = ['tester', 'tester', 'tester', 'tester', 'tester'];
  const output3: string = getCommonPrefix(input3);

	console.log(`Output: ${output}`);
	console.log(`Output: ${output2}`);
	console.log(`Output: ${output3}`);
}

main();
