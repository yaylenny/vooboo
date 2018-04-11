<script>
  import { Bulma } from "Mixins";
  import CardHeader from "./header.vue";

  export default{
    mixins:[ Bulma( 'card')],
    props: {
      title: String,
    },
    data(){
      return {};
    },
    components:{
      CardHeader
    },
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .card
    slot( name="header" )
      card-header( v-if="title" :title="title" )
    .card-content: slot

</template>
