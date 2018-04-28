<template>
    <span>
    <svg id="svg" ref="svg" width="100%" height="100%" viewBox="-1 -1 2 2">
        <rect x="-2" y="-2" width="200%" height="200%" fill="#89C791"/>
        <g id="arbres" :transform="`translate(${t.x} ${t.y})`">
            <image :x="tree.x" :y="tree.y" height="0.1" width="0.1" v-for="tree in treeMap" xlink:href="img/arbre.svg"/>
        </g>

        <circle id="bonhomme" cx="0" cy="0" r="0.05" fill="blue"/>
    </svg>
    </span>
</template>

<script>

    import Hammer from 'hammerjs';

    const getRandomPosition = () => -3 + 6 * Math.random();
    const createData = () => {
        const treeMap = [];
        for (let i = 0; i < 30; i++) {
            treeMap.push({x: getRandomPosition(), y: getRandomPosition()});
        }
        Object.freeze(treeMap);
        return ({
            treeMap,
            ctx: {moving: false, left: 0, right: 0, up: 0, down: 0},
            pan: {moving: false, x: 0, y: 0},
            t: {x: 0, y: 0},
            step: 0.005,
            add: 0.001,
            max: 0.05,
            ips: 40,
            svg: null,
            svgPoint: null
        })
    };
    const installKeydown = game => {
        window.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 37:
                    if (!game.ctx.right) {
                        game.move({right: game.step});
                    }
                    break;
                case 38:
                    if (!game.ctx.down) {
                        game.move({down: game.step});
                    }
                    break;
                case 39:
                    if (!game.ctx.left) {
                        game.move({left: game.step});
                    }
                    break;
                case 40:
                    if (!game.ctx.up) {
                        game.move({up: game.step});
                    }
                    break;
            }

        }, true);
    };
    const installKeyup = game => {
        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 37:
                    game.unmove({right: 0});
                    break;
                case 38:
                    game.unmove({down: 0});
                    break;
                case 39:
                    game.unmove({left: 0});
                    break;
                case 40:
                    game.unmove({up: 0});
                    break;
            }
        }, true);
    };
    const installPan = game => {
        const mc = new Hammer(document.body);
        let startPoint = {x: 0, y: 0};

        mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
        mc.on("panstart", event => {
            startPoint = getSvgPoint(game, event.center);
            game.pan.moving = true;
            ticPan(game);
        });
        mc.on("panmove", event => {
            const movePoint = getSvgPoint(game, event.center);
            game.pan.x = Math.min(game.max, (movePoint.x - startPoint.x) * 0.05);
            game.pan.y = Math.min(game.max, (movePoint.y - startPoint.y) * 0.05);
        });
        mc.on("panend", event => {
            game.pan = {moving: false, x: 0, y: 0};
        });
    };
    const installSvg = game => {
        game.svg = game.$refs.svg;
        game.svgPoint = game.svg.createSVGPoint();
    };
    const ticPan = game => {
        game.t.x -= game.pan.x;
        game.t.y -= game.pan.y;
        if (game.pan.moving) {
            setTimeout(ticPan.bind(null, game), game.ips);
        }
    };
    const getSvgPoint = (game, pt) => {
        game.svgPoint.x = pt.x;
        game.svgPoint.y = pt.y;
        return game.svgPoint.matrixTransform(game.svg.getCTM().inverse());
    };

    export default {
        name: 'game',
        data: createData,
        methods: {
            move: function (sens) {
                this.ctx = {...this.ctx, ...sens};
                if (!this.ctx.moving) {
                    this.ctx.moving = true;
                    this.tic(this.ctx);
                }
            },
            unmove: function (sens) {
                this.ctx = {...this.ctx, ...sens};
                if (!this.ctx.left && !this.ctx.right && !this.ctx.up && !this.ctx.down) {
                    this.ctx.moving = false;
                }
            },
            tic: function () {
                this.t.x += this.ctx.right;
                this.t.x -= this.ctx.left;
                this.t.y += this.ctx.down;
                this.t.y -= this.ctx.up;

                this.ctx.right = this.ctx.right && Math.min(this.max, this.ctx.right + this.add);
                this.ctx.left = this.ctx.left && Math.min(this.max, this.ctx.left + this.add);
                this.ctx.up = this.ctx.up && Math.min(this.max, this.ctx.up + this.add);
                this.ctx.down = this.ctx.down && Math.min(this.max, this.ctx.down + this.add);

                if (this.ctx.moving) {
                    setTimeout(this.tic.bind(null, this.ctx), this.ips);
                }
            }
        },
        mounted: function () {
            installKeydown(this);
            installKeyup(this);
            installPan(this);
            installSvg(this);
        }
    }
</script>