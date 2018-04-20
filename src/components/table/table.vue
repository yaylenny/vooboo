<script>
  import { Bulma } from "Mixins";
  import TableIcon from "../icon/icon.vue";

  import { isString, isArray, assign } from "lodash";
  let locals={
      getter: String,
      source: [Array, String],
      columns: Array,
      per:{ type: Number, default: 10 },
      overrides: Array,
      sortable:{ type: Boolean, default: true }
    };
  export default{
    locals,
    mixins:[ Bulma( 'table', 'table' ) ],
    props: {
      sortBy: String,
      sortAsc: Boolean,
      sortIcon:{ type: String, default: 'chevron' },
      ...locals
    },
    baseClass: 'table',
    data(){
      let opt=this.$options;
      let local=Object.keys( locals ).reduce(( ret, key )=>{
        return Object.assign({}, ret, {[key]: this[ key ] || opt[ key ]})
      }, {});
      console.log( 'table data', local );
      return {
        local,
        sort:{
          by: '',
          asc: true
        }
       };
    },
    components:{
      TableIcon
    },
    computed:{
      activeSortIcon(){
        return `${this.sortIcon}-${this.sortAsc ? 'up' : 'down'}`;
      },
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
            return this[ source ];
          }
          if( isArray( source )) return source;
          return console.error( 'Source provided but not found', this.source );
        }
      },
      rows(){

      }
    },
    methods:{
      onSort( prop ){
        let col=this.tableColumns.find( c=>c.prop===prop );
        if( col  && col.sortable ){
          this.$emit('sort', prop );
        }
      },
      eatit(){
        console.log( 'EEE')
      }
    },
    created(){},
    mounted(){
      console.log( 'data', this.dataSource )
    },
    watch:{}
  }
</script>
<template lang="pug">
  table( :class="classList")
    slot
      thead
        tr( v-if="tableColumns" )
          th( v-for="col in tableColumns"
            :class="{'is-sortable': col.sortable, 'is-sorted': col.prop===sortBy }"
            @click="onSort(col.prop)")
            span() {{col.title}}
            table-icon( v-if="sortBy===col.prop" :icon="activeSortIcon" is-small )

      tbody( v-if="tableColumns")
        tr( v-for="item in dataSource" )
          td( v-for="col in tableColumns" )
            slot( :name="col.prop+'-cell'")
              span {{item[ col.prop ]}}
</template>
