<script>
  import { Bulma } from "Mixins";
  export default{
    mixins: Bulma('hero', ['colors','sizes']),
    props: {

    },
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .hero
    .hero-body
      slot
</template>
