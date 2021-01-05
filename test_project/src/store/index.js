import Vuex from 'vuex';
import Vue from 'vue';
import divModule from './modules/divisionModule';

// Загружает Vuex
Vue.use(Vuex);

// Создаёт Store
export default new Vuex.Store({
    modules: {
        divModule
    }
});

