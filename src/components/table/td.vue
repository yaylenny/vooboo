<script>
  import { input, datepicker } from "../form"
  export default{
    props: {
      col: {},
      item: {},
      editing: Boolean,
      editable: Boolean,
      editEvents: Array,
      toRepresentation: Function
    },
    data(){
      return {
        tempValue: this.toRepresentation( this.col, this.item )
      };
    },
    components:{
      'vb-input': input,
      'vb-datepicker': datepicker
    },
    computed:{},
    methods:{
      cellStyle( col, item ){
        let ret={};
        if( col.align!=='auto') ret['text-align']=col.align;
        return ret;
      },
      onClick( e ){

      },
      onDblClick( e ){
        if( this.editEvents && this.editEvents.indexOf( 'dblclick') >= 0 ){
          if( !this.editing ) this.$emit('edit');
        }
      },
      onMousedown( e ){

      }
    },
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  td( :style="cellStyle( col, item )")
    .representer( v-show="!editing"
      @click="onClick"
      @dblclick="onDblClick"
      @mousedown="onMousedown" )
      span {{toRepresentation( col, item )}}
    .editor( v-if="editable" v-show="editing")
      vb-input( v-if="col.type===String" v-model="tempValue")
      vb-datepicker( v-else-if="col.type===Date")
</template>
