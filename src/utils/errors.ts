export function returnError(err: Error) {
	return err;
}

export function isError(err: any): err is Error {
	return err instanceof Error;
}
