export interface IResult {
	key: string,
	res: string[][],
}

export interface IObject {
	[index: string]: any
}

export interface IComplexResult {
	res: string,
	complex?: IResult[],
}