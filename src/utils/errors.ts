export function returnError(err: Error) {
	return err;
}

export function isError(err: any): err is Error {
	return err instanceof Error;
}

export function result<T>(promise: Promise<T>): Promise<T | Error> {
	return promise.then((data) => data).catch((err) => err);
}
