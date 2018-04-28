<template>
    <span>
    <svg id="svg" ref="svg" width="100%" height="100%" viewBox="-1 -1 2 2">
        <rect x="-2" y="-2" width="200%" height="200%" fill="#89C791"/>
        <g id="arbres" :transform="`translate(${t.x} ${t.y})`">
            <image :x="tree.x" :y="tree.y" height="0.1" width="0.1" v-for="tree in treeMap" :xlink:href="tree.href"/>
        </g>
        <circle id="bonhomme" cx="0" cy="0" r="0.05" fill="blue"/>
    </svg>
    </span>
</template>

<script>

    import {installKeyboard} from "./keyboard";
    import {installPan} from "./touch";

    let config = {
        step: 0.005,
        add: 0.001,
        max: 0.05,
        ips: 40
    };
    const install = function () {
        const game = this;
        installKeyboard(game, config);
        installPan(game, config);
    };

    const createData = () => {
        const getRandomPosition = () => -3 + 6 * Math.random();
        const getRandomTree = () => "img/arbre-0" + (Math.floor(Math.random() * Math.floor(2))) + ".svg";
        const treeMap = [];
        for (let i = 0; i < 30; i++) {
            treeMap.push({x: getRandomPosition(), y: getRandomPosition(), href: getRandomTree()});
        }
        Object.freeze(treeMap);
        return ({
            treeMap,
            t: {x: 0, y: 0}
        })
    };

    export default {
        name: 'game',
        data: createData,
        mounted: install
    }
</script>