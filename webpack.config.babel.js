import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import Visualizer from 'webpack-visualizer-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const NODE_ENV = process.env.NODE_ENV;

const conf = {
    mode: NODE_ENV,
    entry: './src/index.js',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {}
    },
    module: {
        rules: [
            {test: /\.vue$/, exclude: /node_modules/, use: 'vue-loader'},
            {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
            {test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader']}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html', inject: 'body', hash: 'true'}),
        new CopyWebpackPlugin([{from: './src/img', to: 'img'}]),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version)
        }),
        new LodashModuleReplacementPlugin,
    ],
};

if (conf.mode === "development") {
    conf.devServer = {
        host: "0.0.0.0",
        proxy: {
            "/api": "http://localhost:8080"
        }
    };
    conf.resolve.alias.vue$ = "vue/dist/vue.esm.js";
}

if (conf.mode === "production") {
    conf.output = {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/play.blueforest.org/static')
    };
    conf.plugins.push(new Visualizer({filename: '../../visualizer/statistics.html'}));
    conf.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }));
    conf.resolve.alias.vue$ = "vue/dist/vue.min.js";
    conf.plugins.push(new CopyWebpackPlugin([{from: 'nginx', to: '../nginx/'}]));
}

console.log(conf);

module.exports = conf;