// https://getflywheel.github.io/local-addon-api/modules/_local_main_.html
import * as LocalMain from '@getflywheel/local/main';
import addDirenv from "./helpers/addDirenv";

export default function (context: LocalMain.Services.AddonLoader['addonContext']) {
	const { hooks } = context;

	hooks.addAction('siteAdded', addDirenv);
	hooks.addAction('siteStarted', addDirenv);
}
