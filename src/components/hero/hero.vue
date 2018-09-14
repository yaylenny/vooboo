<script>
  import { Bulma } from "Mixins";
  import HeroBody from "./herobody.vue";

  export default{
    mixins:[ Bulma( 'hero' ) ],
    props: {},
    data(){
      return {};
    },
    components:{ HeroBody },
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .hero( :class="classList" )
    slot
      hero-body
        slot( name="body" )
</template>
