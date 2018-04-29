import {installKeyboard} from "./input/keyboard";
import {installPan} from "./input/touch";

export const start = function (game, config) {
    //TODO installer QUE l'input dont on a besoin: détecter touchescreen ou souris.
    installKeyboard(game, config);
    installPan(game, config);
};