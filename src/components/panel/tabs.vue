<script>
  export default{
    props: {
      tabs: Array
      active:{}
    },
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{
      isActive( item ){
        return this.active && ( this.active===item );
      }
    },
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .panel-tabs
    slot
      a( v-for="item in items" v-if="items"
        :class="{'is-active': isActive( item )}") {{item.text}}
</template>
