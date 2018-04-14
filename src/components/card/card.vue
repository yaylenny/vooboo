<script>
  import { Bulma } from "Mixins";
  import CardHeader from "./header.vue";
  import CardFooter from "./footer.vue";

  export default{
    mixins:[ Bulma( 'card')],
    props: {
      title: String,
      isFooterless: Boolean,
      footerItems: [ Array, String ]
    },
    data(){
      return {};
    },
    components:{
      CardHeader,
      CardFooter
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
        slot( name="icon" slot="icon")
    .card-content: slot
    slot( name="footer" )
      card-footer( v-if="!isFooterless" )
        slot( name="footer-items" )
</template>
