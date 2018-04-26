<script>
  export default{
    props: {},
    data(){
      return {
        editing:{
          items: []
        }
      };
    },
    components:{},
    computed:{},
    methods:{
      startEditor( item ){
        if( !this.editable ) return false;
        if( !this.isEditing( item )) this.editing.items.push( item );
      },
      toggleEdit( item ){
        let index=this.editing.items.indexOf( item );
        if( index >= 0 ) this.editing.items.splice( index );
        else this.editing.items.push( item );
      },
      isEditing( item ){
        return this.editing.items.indexOf( item ) >= 0;
      },
      onMousedown( e, col, item ){
        // console.log( 'mousedown item', item )
      },
      bindHandlers(){

      },
      unbindHandlers(){

      }
    },
    created(){},
    watch:{}
  }
</script>
