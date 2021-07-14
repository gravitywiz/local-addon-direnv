import * as path from "path";
import * as Local from "@getflywheel/local";
import * as LocalMain from "@getflywheel/local/main";
import toPOSIX from "./toPOSIX";
import * as fs from 'fs-extra';
import * as os from 'os';

export default function addDirenv(site: Local.Site) : void {
	const { lightningServices } = LocalMain.getServiceContainer().cradle;

	const wpCliDir = path.join((process as any).electronPaths.resourcesPath, 'bin', 'wp-cli');
	const composerDir = path.join((process as any).electronPaths.resourcesPath, 'bin', 'composer');

	let wpCliPATH = path.join(wpCliDir, 'posix');
	let composerPATH = path.join(composerDir, 'posix');

	if (os.platform() === 'win32') {
		wpCliPATH = path.join(wpCliDir, 'win32');
		composerPATH = path.join(composerDir, 'win32');
	}

	const phpService = lightningServices.getSiteServiceByRole(site, Local.SiteServiceRole.PHP);
	const dbService = lightningServices.getSiteServiceByRole(site, Local.SiteServiceRole.DATABASE);

	const direnvContent = `export MYSQL_HOME="${toPOSIX(dbService!.configPath)}"
export PHPRC="${toPOSIX(phpService!.configPath)}"
export WP_CLI_CONFIG_PATH="${toPOSIX(path.join(wpCliDir, 'config.yaml'))}"
export WP_CLI_DISABLE_AUTO_CHECK_UPDATE=1
export PATH="${toPOSIX(dbService!.$PATH)}:$PATH"
export PATH="${toPOSIX(phpService!.$PATH)}:$PATH"
export PATH="${toPOSIX(wpCliPATH)}:$PATH"
export PATH="${toPOSIX(composerPATH)}:$PATH"

${phpService!.siteShellStartupPOSIX}`;

	fs.writeFileSync(path.join(site.paths.app, '.envrc'), direnvContent);
}
