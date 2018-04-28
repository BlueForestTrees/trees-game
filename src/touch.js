import Hammer from 'hammerjs';

let pan = {pressed: false, x: 0, y: 0};
export const installPan = (game, config) => {
    const svg = game.$refs.svg;
    const svgPoint = svg.createSVGPoint();
    const getSvgPoint = (game, pt) => {
        svgPoint.x = pt.x;
        svgPoint.y = pt.y;
        return svgPoint.matrixTransform(svg.getCTM().inverse());
    };
    let startPoint = {x: 0, y: 0};

    const touchScreen = new Hammer(document.body);
    touchScreen.get('pan').set({direction: Hammer.DIRECTION_ALL});
    touchScreen.on("panstart", event => {
        startPoint = getSvgPoint(game, event.center);
        pan.pressed = true;
        tic(game, config);
    });
    touchScreen.on("panmove", event => {
        const movePoint = getSvgPoint(game, event.center);
        pan.x = Math.min(config.max, (movePoint.x - startPoint.x) * 0.05);
        pan.y = Math.min(config.max, (movePoint.y - startPoint.y) * 0.05);
    });
    touchScreen.on("panend", event => {
        pan = {moving: false, x: 0, y: 0};
    });
};

const tic = (game, config) => {
    game.t.x -= pan.x;
    game.t.y -= pan.y;
    if (pan.pressed) {
        setTimeout(tic.bind(null, game, config), config.ips);
    }
};