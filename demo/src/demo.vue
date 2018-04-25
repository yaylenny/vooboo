<script>
  import ModelSection from "./sections/models.vue";
  import FormSection from "./sections/forms.vue";``
  import ComponenSection from "./sections/components.vue";
  import routes from "./routes.js";
  import { capitalize, assign } from "lodash";

  let tabs=[

  ]
  export default{
    data(){
      return {
        routes,
        topTabs:[
          { name: 'components', title: 'Components' },
          { name: 'forms', title: 'Forms' },
          { name: 'models', title: 'Models'}
        ],
      };
    },
    computed:{
      component(){
        return sectionMap[ this.active.tab ];
      },
      demoRoutes(){
        return this.routes.filter( r=>r.name!=='home');
      },
      tabs(){
        return this.topTabs.map( r=>assign({}, r, {
          active: this.$route.name.includes(r.name )
        }))
      }
    },
    methods:{},
    // mixins:[],
    created(){
      console.log( 'created ', this.tabs )
    },
    // destroyed(){},
    // mounted(){},
    // watch:{}
  }
</script>

<template lang="pug">
  .demo
    .hero.is-black
      .hero-body: .container
        h1.title VooBoo
        h2.subtitle Javascript components and utilities using the Bulma css framework
      .hero-foot: .container: .tabs.is-boxed
        ul
          li( v-for="tab in tabs" :class="{'is-active': tab.active }")
            router-link( :to="{ name: tab.name }") {{tab.title}}
    router-view()
</template>

<style lang="scss">
  code{
    white-space: pre-wrap;
  }
  section.page{
    padding: 2rem 0;
  }
</style>
