import Vue from 'vue';
import './css/style.css';
import Game from './Game'

new Vue({
    el: '#app',
    components: {Game},
    template: '<Game/>'
});