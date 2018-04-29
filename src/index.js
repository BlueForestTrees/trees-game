import Vue from 'vue';
import './css/style.css';
import Game from './vue/Game'

new Vue({
    el: '#app',
    components: {Game},
    template: '<Game/>'
});