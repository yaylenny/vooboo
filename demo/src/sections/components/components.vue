<script>
  const componentList=[
    { icon: 'table', title: "Table", route: "components/table"},
    { icon: 'tree', title: "Tree", route: "components/tree"},
    { icon: 'square', title: "Modal", route: "components/modal"},
  ]
  export default{
    props: {},
    data(){
      return {
        componentList
      };
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  section
    .container: .navbar: .navbar-menu: .navbar-start
      .navbar-item.tabs
        ul
          li( v-for="tab in componentList" :class="{'is-active': $route.name===tab.route }")
            router-link( :to="{ name: tab.route }")
              vb-icon {{tab.icon}}
              span {{tab.title}}
    router-view
</template>
