export function checkJsonString(jsonString: string): {} {
	const regexpTest = /^[\],:{}\s]*$/;
	const text = jsonString
		.replace(/\\["\\/bfnrtul]/g, '@')
		// eslint-disable-next-line
		.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
		.replace(/(?:^|:|,)(?:\s*\[)+/g, '')

	return regexpTest.test(text) ? JSON.parse(jsonString) : {};
}

export function checkType(data: any): string {
	if (Array.isArray(data)) return 'array';
	else if (data && data.constructor === Object) return 'object';
	else if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') return typeof data;
	return 'any'
}