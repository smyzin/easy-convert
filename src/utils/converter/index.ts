import { checkJsonString, checkType } from '../hepler';
import { IResult, IObject, IComplexResult } from './converter.props';

export function initConverting(initJSON: string): string {
	const json = checkJsonString(initJSON);
	const type = checkType(json);

	const mappedJSON = mapJSON(type === 'array' ? { data: json } : json);
	return exportInterfaces(mappedJSON);
}

export function createInterfaceName(name?: string): string {
	const interfaceName = name && name.length > 0 ? name : 'root';
	return 'I' + interfaceName[0].toUpperCase() + interfaceName.slice(1);
}

export function exportInterfaces(list: IResult[]): string {
	const exportTitle: string = 'export interface ';
	return list.reduce((acc, cur) => {
		return acc + exportTitle + cur.key + ' {\n' + cur.res.reduce((ac: string, current: any) => {
			return ac + '  ' + current[0] + ': ' + current[1] + ',\n'
		}, '') + '}\n\n';
	}, '')
}

export function runByArray(array: any[], key: string): IComplexResult {
	if (!array.length) return { res: 'any[]' };

	let complex!: IResult[];

	let typeSet = new Set();
	array.forEach(value => {
		const type = checkType(value);
		typeSet.add(type === 'object' ? key : type)
	});
	if (typeSet.size > 2) return { res: 'any[]' };
	if (typeSet.size === 1 && typeSet.has(key)) complex = countNumberOfKeys(array, key);
	if (typeSet.size === 1 && typeSet.has('array')) complex = countNumberOfKeys(array, createInterfaceName(key));

	const dType = Array.from(typeSet);
	const res = typeSet.size > 1 ? `${dType.join('|')}[]` : `${dType.join('')}[]`;
	return { res, complex: complex };
}

export function countNumberOfKeys(arrayOfObjects: IObject[], keyName: string): IResult[] {
	let count: { [index: string]: number } = {};
	const size = arrayOfObjects.length;
	let resultArray = new Map();
	let arrayToConcat: IResult[] = []
	arrayOfObjects.forEach(element => {
		for (let key in element) {
			const type = checkType(element[key]);
			count[key] = count.hasOwnProperty(key) ? count[key] + 1 : 1;
			if (!resultArray.has(key)) {
				if (type === 'array') {
					const { res, complex } = runByArray(element[key], createInterfaceName(key));

					if (complex) arrayToConcat.push(...complex);
					resultArray.set(key, res);
				}
				else if (type === 'object') {
					const ttt = mapJSON(element[key], key);
					resultArray.set(key, ttt[0].key);
					arrayToConcat.push(ttt[0])
				} else resultArray.set(key, type);
			}
		}
	});
	for (let i in count) {
		if (count[i] !== size) {
			resultArray.set(`${i}?`, resultArray.get(i));
			resultArray.delete(i);
		}
	}

	return [{ key: keyName, res: Array.from(resultArray) }, ...arrayToConcat];
}

export function mapJSON(json: IObject, rootName?: string): IResult[] {
	let result = [];
	let reRunThrough = [];

	for (let key in json) {
		const type = checkType(json[key]);
		switch (type) {
			case 'object':
				result.push([key, createInterfaceName(key)]);
				reRunThrough.push(...mapJSON(json[key], key));
				break;
			case 'array':
				const { res, complex } = runByArray(json[key], createInterfaceName(key));
				result.push([key, res]);
				if (complex) reRunThrough.push(...complex);
				break;
			case 'string':
			case 'number':
			case 'boolean':
				result.push([key, type]);
				break;
			default:
				result.push([key, 'any']);
				break;
		}
	}
	return [{ key: createInterfaceName(rootName ? rootName : ''), res: result }, ...reRunThrough];
}

// @Todo: create function to check all interface's names for avoiding errors
// @Todo: create closure function for creating Enums
export function createEnum() { }