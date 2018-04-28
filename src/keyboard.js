let keys = {pressed: false, left: 0, right: 0, up: 0, down: 0};
export const installKeyboard = (game,config)=>{
    installKeydown(game, config);
    installKeyup();
};
const installKeydown = (game, config) => {

    const tic = () => {
        game.t.x += keys.right;
        game.t.x -= keys.left;
        game.t.y += keys.down;
        game.t.y -= keys.up;

        keys.right = keys.right && Math.min(config.max, keys.right + config.add);
        keys.left = keys.left && Math.min(config.max, keys.left + config.add);
        keys.up = keys.up && Math.min(config.max, keys.up + config.add);
        keys.down = keys.down && Math.min(config.max, keys.down + config.add);

        if (keys.pressed) {
            setTimeout(tic, config.ips);
        }
    };

    const move = (sens) => {
        keys = {...keys, ...sens};
        if (!keys.pressed) {
            keys.pressed = true;
            tic();
        }
    };

    window.addEventListener("keydown", (event) => {
        switch (event.keyCode) {
            case 37:
                if (!keys.right) {
                    move({right: config.step});
                }
                break;
            case 38:
                if (!keys.down) {
                    move({down: config.step});
                }
                break;
            case 39:
                if (!keys.left) {
                    move({left: config.step});
                }
                break;
            case 40:
                if (!keys.up) {
                    move({up: config.step});
                }
                break;
        }

    }, true);
};
const installKeyup = () => {
    const unmove = sens => {
        keys = {...keys, ...sens};
        if (!keys.left && !keys.right && !keys.up && !keys.down) {
            keys.pressed = false;
        }
    };
    window.addEventListener("keyup", (event) => {
        switch (event.keyCode) {
            case 37:
                unmove({right: 0});
                break;
            case 38:
                unmove({down: 0});
                break;
            case 39:
                unmove({left: 0});
                break;
            case 40:
                unmove({up: 0});
                break;
        }
    }, true);
};