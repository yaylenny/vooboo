<script>
  import  from "./card.vue";
  import PanelHeading from "./header.vue";
  export default{
    mixins:[ Bulma( 'panel' )],
    baseClass: 'panel',
    props: {
      title: String
    },
    data(){
      return {};
    },
    components:{
      PanelHeading
    },
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  section( :class="classList" )
    panel-heading( v-if="title" :title="title" )
    slot
</template>
