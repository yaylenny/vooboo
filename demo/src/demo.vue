<script>
  import ModelSection from "./sections/models.vue";
  import FormSection from "./sections/forms.vue";``
  import ComponenSection from "./sections/components.vue";

  let sectionMap={
    Models: ModelSection,
    Form: FormSection,
    Component: ComponenSection
  }
  export default{
    data(){
      return {
        active:{
          tab: 'Models'
        },
        tabs: Object.keys( sectionMap )
      };
    },
    components:{ ModelSection },
    computed:{
      component(){
        return sectionMap[ this.active.tab ];
      }
    },
    methods:{},
    // mixins:[],
    // created(){},
    // destroyed(){},
    // mounted(){},
    // watch:{}
  }
</script>

<template lang="pug">
  .demo
    .hero.is-dark.is-small
      .hero-body: .container
        h1.title VooBoo
        h2.subtitle Javascript components and utilities
      .hero-foot: .container: .tabs.is-boxed
        ul
          li( v-for="tab in tabs" :class="{'is-active': active.tab===tab }")
            a( @click="active.tab=tab" ) {{tab}}
    component( :is="component" )
</template>

<style lang="scss">

</style>
