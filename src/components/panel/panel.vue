<script>
  import PanelHeading from "./heading.vue";
  import { Bulma } from "Mixins";
  export default{
    name: 'VooBooPanel',
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
