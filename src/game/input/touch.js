import Hammer from 'hammerjs';

let pan = {pressed: false, x: 0, y: 0};
export const installPan = (game, config) => {
    //permet d'avoir la position du doigt dans les coordonnées du svg (-1 -1 2 2)
    const svg = game.$refs.svg;
    const svgPoint = svg.createSVGPoint();
    const getSvgPoint = (game, pt) => {
        svgPoint.x = pt.x;
        svgPoint.y = pt.y;
        return svgPoint.matrixTransform(svg.getCTM().inverse());
    };
    let startPoint = {x: 0, y: 0};

    //les actions lors des évènements de toucher
    const panstart = event => {
        startPoint = getSvgPoint(game, event.center);
        pan.pressed = true;
        tic(game, config);
    };
    const panmove = event => {
        const movePoint = getSvgPoint(game, event.center);
        pan.x = Math.min(config.max, (movePoint.x - startPoint.x) * 0.05);
        pan.y = Math.min(config.max, (movePoint.y - startPoint.y) * 0.05);
    };
    const panend = () => {
        pan = {moving: false, x: 0, y: 0};
    };

    //les abonnements aux évènements du toucher.
    const touchScreen = new Hammer(document.body);
    touchScreen.get('pan').set({direction: Hammer.DIRECTION_ALL});
    touchScreen.on("panstart", panstart);
    touchScreen.on("panmove", panmove);
    touchScreen.on("panend", panend);
};

//"cycle d'horloge" qui commence à panstart et cesse à panstop
const tic = (game, config) => {
    game.t.x -= pan.x;
    game.t.y -= pan.y;
    if (pan.pressed) {
        setTimeout(tic.bind(null, game, config), config.ips);
    }
};