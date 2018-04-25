import Vue from 'vue';

/* * *    OUR HERO    * * */
import vooboo from "Lib/vooboo.js";
Vue.use( vooboo );

/* * *    OUR DEMO    * * */
import demo from './demo.vue';
const config={
  el: '#demo',
  render:h=>h( demo )
};

/* * *    VUE ROUTER    * * */
import VueRouter from 'vue-router';
import routes from './routes.js';
Vue.use( VueRouter );
config.router=new VueRouter({ mode: 'hash', routes })

/* * *    VUEX - STORE    * * */
import Vuex from "vuex";
import storeConfig from './store.js';
Vue.use( Vuex );
config.store=new Vuex.Store( storeConfig );

new Vue( config );
