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
        menuItems:[
          { route: 'components/autocomplete', title: 'Auto Complete' },
          { route: 'components/datepicker', title: 'Date picker' },
          { route: 'components/table', title: 'Table' },
          { route: 'components/modal', title: 'Modal' },
          { route: 'components/tree', title: 'Tree' },
        ]
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
    .sidebar
      .hero.is-primary.is-small
        .hero-body
          h1.title.is-5 VooBoo
      .sidebar-menu: .menu
        p.menu-label Components
        ul.menu-list
          li( v-for="item in menuItems" )
            router-link( :to="{ name: item.route }" :class="{'is-active': item.route===$route.name }") {{item.title}}
    .main
      router-view()
</template>

<style lang="scss">
  .demo{
    display: flex;
    position: fixed;
    align-items: stretch;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .sidebar{
      flex: 1;
      border-right: 1px solid #ddd;
      .sidebar-menu{
        padding: 1rem;
      }
    }
    .main{
      flex: 5;
      overflow: auto;
    }
  }
  code{
    white-space: pre-wrap;
  }
  section.page{
    padding: 2rem 0;
  }
</style>
