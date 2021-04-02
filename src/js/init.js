import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { sliders } from "./modules/sliders";
import { wrapSlider } from "./modules/wrapSlider";
import { select } from "./modules/select";
import { responsive } from "./modules/responsive";
import svg4everybody from 'svg4everybody/dist/svg4everybody.legacy.js';
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	defaults.init();
	responsive.init();
	forms.init();
	sliders.init();
	wrapSlider.init();
	select.init();
	svg4everybody()

	
};

export { App };