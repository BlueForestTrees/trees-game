export const generateMapTrees = config => {

    const trees = [];

    //TODO ajouter le troisième modèle d'arbre.
    //génère un href de petit arbre au hasard
    const getRandomTree = () => "img/arbre-0" + (Math.floor(Math.random() * Math.floor(2))) + ".svg";

    //génère un chiffre au hasard entre -v et +v
    const getRandom = v => -v + 2 * v * Math.random();

    //génère une liste d'arbres avec x, y et href au hasard.
    for (let i = 0; i < config.nbArbres; i++) {
        trees.push({x: getRandom(config.mapSize), y: getRandom(config.mapSize), href: getRandomTree()});
    }
    //le jeu ne watchera pas les arbres
    Object.freeze(trees);

    return trees;
};
