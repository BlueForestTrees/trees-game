<template>
    <span>
    <svg id="svg" ref="svg" width="100%" height="100%" viewBox="-1 -1 2 2">
        <rect id="fond" x="-2" y="-2" width="200%" height="200%" fill="#89C791"></rect>
        <g id="arbres" :transform="`translate(${t.x} ${t.y})`">
            <image :x="tree.x" :y="tree.y" height="0.1" width="0.1" v-for="tree in trees" :xlink:href="tree.href"></image>
            <!--TODO créer des ressources sur le même modèle que les arbres. Du CO2, une dizaine d'éléments-->
        </g>
        <!--TODO ici remplacer le circle ci-dessous par stickman. Pour l'instant il est figé-->
        <circle id="bonhomme" cx="0" cy="0" r="0.05" fill="blue"></circle>
    </svg>
    </span>
</template>

<script>
    import {start} from "../game/game";
    import {generateMapTrees} from "../game/mapTrees";

    const config = {
        step: 0.005,
        add: 0.001,
        max: 0.05,
        ips: 40,

        nbArbres: 30,
        mapSize: 3
    };

    export default {
        name: 'game',
        data: function () {
            return ({
                trees: generateMapTrees(config),
                t: {x: 0, y: 0}
            })
        },
        mounted: function () {
            start(this, config);
        },
        watch: {
            't.x': function (val) {
                //TODO faire en sorte que le bonhomme fasse le tour de la map et n'en sorte jamais
                //if t.x > max => t.x = min
            },
            't.y': function (val) {
                //TODO faire en sorte que le bonhomme fasse le tour de la map et n'en sorte jamais
                //if t.x > max => t.x = min
            }
        }
    }
</script>