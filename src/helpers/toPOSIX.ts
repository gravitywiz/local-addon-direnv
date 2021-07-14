import * as os from "os";

export default function toPOSIX(path: string): string {
	let posixPath: string = path.replace(/\\/g, '/');
	let isWin32NetworkPath: boolean = false;

	if (os.platform() === 'win32') {
		if (path.indexOf('\\\\') === 0) {
			isWin32NetworkPath = true;
		}

		if (path.indexOf(':') === 1) {
			posixPath = posixPath.replace(':', '');
		}

		const pathSplit = posixPath.split('/').filter((e) => e);

		if (pathSplit[0].length === 1) {
			pathSplit[0] = pathSplit[0].toLowerCase();
		}

		posixPath = `/${pathSplit.join('/')}`;

		/**
		 * Re-add leading double-slash if this was a Windows network path to begin with.
		 */
		if (isWin32NetworkPath) {
			posixPath = `/${posixPath}`;
		}
	}

	return posixPath;
}
