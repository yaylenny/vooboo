<script>
  import { Bulma } from "Mixins";
  import { isString, isArray, assign } from "lodash";
  let locals={
      getter: String,
      source: [Array, String],
      columns: Array,
      per:{ type: Number, default: 10 },
      overrides: Array
    };
  export default{
    locals,
    mixins:[ Bulma( 'table', 'table' ) ],
    props: locals,
    baseClass: 'table',
    data(){
      let opt=this.$options;
      let local=Object.keys( locals ).reduce(( ret, key )=>{
        return Object.assign({}, ret, {[key]: this[ key ] || opt[ key ]})
      }, {});
      console.log( 'table data', local );
      return { local };
    },
    components:{},
    computed:{
      tableColumns(){
        let { columns }=this.local;
        if( columns ){
          return columns.map( c=>{
            return assign({
              sortable: true,
              type: String,
              sort: null, // fn to use to sort two items in sort
              title: '',
              prop: ''
            }, c );
          })
        }
      },
      dataSource(){
        let { getter, source }=this.local;
        if( getter ) return this.$store.getters[ getter ];
        else if( source ){
          if( isString( source )){
            source=this[ source ];
          }
          if( isArray( source )) return source;
          return console.error( 'Source provided but not found', this.source );
        }
      },
      rows(){

      }
    },
    methods:{
      enSorte( col ){
        console.log( 'enSorte', col );
        // this.$emit('sort', col.prop );
      },
      eatit(){
        console.log( 'EEE')
      }
    },
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  table( :class="classList")
    slot
      thead
        tr( v-if="tableColumns" )
          th( v-for="col in tableColumns" :class="{'is-sortable': col.sortable }" @click="enSorte(col)")
            span() {{col.title}}


      tbody( v-if="tableColumns")
        tr( v-for="item in dataSource" )
          td( v-for="col in tableColumns" )
            span {{item[ col.prop ]}}
</template>
