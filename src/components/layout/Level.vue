<script>
  export default{
    props: {},
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
  .level
    .level-left
      slot( name="left" )
    .level-right
      slot( name="right" )
    slot
</template>
