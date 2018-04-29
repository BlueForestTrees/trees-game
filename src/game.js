import {installKeyboard} from "./keyboard";
import {installPan} from "./touch";

export const start = function (game, config) {
    //TODO installer QUE l'input qu'il y a besoin.
    installKeyboard(game, config);
    installPan(game, config);
};