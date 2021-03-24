import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { responsive } from "./modules/responsive";
import svg4everybody from 'svg4everybody/dist/svg4everybody.legacy.js';
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	forms.init();
	modals.init();
	responsive.init();
	svg4everybody()

	
};

export { App };