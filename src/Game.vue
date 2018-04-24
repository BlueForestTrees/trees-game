<template>
    <span>
    <svg id="svg" width="100%" height="100%" viewBox="-1 -1 2 2">
        <rect x="-1" y="-1" width="100%" height="100%" fill="#89C791"/>
        <g id="arbres" :transform="`translate(${t.x} ${t.y})`">
            <template v-for="y in 9">
                <image :x="treeMap[x][y].x" :y="treeMap[x][y].y" height="0.1" width="0.1" v-for="x in 9" xlink:href="img/arbre.svg"/>
            </template>
        </g>

        <circle id="bonhomme" cx="0" cy="0" r="0.05" fill="blue"/>
        <rect id="positionDoigt" :x="doiX" :y="doiY" width="0.05" height="0.05" fill="red"/>
    </svg>
    </span>
</template>

<script>

    import Hammer from 'hammerjs';

    export default {
        name: 'game',
        data: function () {

            const treeMap = [];

            for (let x = 0; x < 10; x++) {
                treeMap.push([]);
                for (let y = 0; y < 10; y++) {
                    treeMap[x].push({x: this.gen(), y: this.gen()});
                }
            }

            Object.freeze(treeMap);

            return ({
                treeMap,
                ctx: {moving: false, left: 0, right: 0, up: 0, down: 0},
                t: {x: 0, y: 0},
                step: 0.005,
                add: 0.005,
                max: 0.03,
                doiX: 0,
                doiY: 0
            })
        },
        methods: {
            gen: () => 6 * (Math.random() - 0.5),
            move: function (sens) {
                console.log("move");
                if (!this.ctx.moving) {
                    this.ctx.moving = true;
                    this.tic(this.ctx);
                }
                this.ctx = {...this.ctx, ...sens};
            },
            unmove: function (sens) {
                console.log("unmove");
                this.ctx = {...this.ctx, ...sens};
                if (!this.ctx.left && !this.ctx.right && !this.ctx.up && !this.ctx.down) {
                    this.ctx.moving = false;
                }
            },
            tic: function () {
                console.log("tic");
                this.t.x += this.ctx.right;
                this.t.x -= this.ctx.left;
                this.t.y += this.ctx.down;
                this.t.y -= this.ctx.up;

                this.ctx.right = Math.min(this.max, this.ctx.right + this.add);
                this.ctx.left = Math.min(this.max, this.ctx.left + this.add);
                this.ctx.up = Math.min(this.max, this.ctx.up + this.add);
                this.ctx.down = Math.min(this.max, this.ctx.down + this.add);

                //console.log(JSON.stringify(this.ctx, null, 4));

                if (this.ctx.moving) {
                    setTimeout(this.tic.bind(null, this.ctx), 25);
                }
            }
        },
        mounted: function () {
            window.addEventListener("keydown", (event) => {
                switch (event.keyCode) {
                    case 37:
                        if (!this.ctx.right) {
                            this.move({right: this.step});
                        }
                        break;
                    case 38:
                        if (!this.ctx.down) {
                            this.move({down: this.step});
                        }
                        break;
                    case 39:
                        if (!this.ctx.left) {
                            this.move({left: this.step});
                        }
                        break;
                    case 40:
                        if (!this.ctx.up) {
                            this.move({up: this.step});
                        }
                        break;
                }

            }, true);
            window.addEventListener("keyup", (event) => {
                switch (event.keyCode) {
                    case 37:
                        this.unmove({right: 0});
                        break;
                    case 38:
                        this.unmove({down: 0});
                        break;
                    case 39:
                        this.unmove({left: 0});
                        break;
                    case 40:
                        this.unmove({up: 0});
                        break;
                }
            }, true);

            const mc = new Hammer(document.body);
            mc.get('pan').set({direction: Hammer.DIRECTION_ALL});
            mc.on("panstart panmove panend", event => {
                if (!this.ctx.right) {
                    this.doiX = event.center.x;
                    this.doiY = event.center.y;
                    console.log(event);
                }
            });

        }
    }
</script>