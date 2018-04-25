<script>
  export default{
    props: {
      closable:{ type: Boolean, default: true },
      closeOnBackgroundClick:{ type: Boolean, default: true },
      isActive: Boolean
    },
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{
      close( ...args ){
        this.$emit('close', ...args );
      },
      onBackgroundClick(){
        if( this.closeOnBackgroundClick ) this.close();
      }
    },
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .modal( :class="{ 'is-active': isActive }")
    .modal-background( @click="onBackgroundClick")
    .modal-content( @click.stop="" )
      slot
      button.modal-close( v-if="closable" @click="close")
</template>
