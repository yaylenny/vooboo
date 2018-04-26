<script>
  import { Bulma } from "Mixins";
  import moment from "moment";
  import TableIcon from "../icon/icon.vue";
  import TableCell from "./td.vue";
  import Pagination from "../pagination/pagination.vue";
  import editable from "./editable.vue";

  import { isString, isArray, assign, capitalize } from "lodash";
  let locals={
    getter: String,
    source: [Array, String],
    columns: Array,
    per:{ type: Number, default: 10 },
    overrides: Array,
    caption: String,
    sortable:{ type: Boolean, default: true },
    editable:{ type: Boolean, default: true },
    editEvents:{ type: Array, default:()=>(['dblclick'])},
    selectable:{ type: Boolean, default: true },
    autosort:{ type: Boolean, default: true },
    autopage:{ type: Boolean, default: true },
    sortBy: String,
    sortAsc: Boolean,
    sortIcon:{ type: String, default: 'chevron' },
    multiselect:{ type: Boolean, default: true } // more than one active row at a time
  };
  export default{
    locals,
    mixins:[ Bulma( 'table', 'table' ), editable ],
    props: {
      ...locals
    },
    baseClass: 'table',
    data(){
      let opt=this.$options;
      let local=Object.keys( locals ).reduce(( ret, key )=>{
        return Object.assign({}, ret, {[key]: this[ key ] || opt[ key ]})
      }, {});
      // console.log( 'table data', local );
      return {
        local,
        selected:{
          items:[]
        },
        sort:{
          by: ''+this.sortBy,
          page: 1,
          asc: !!this.sortAsc
        }
       };
    },
    components:{
      TableIcon,
      TableCell,
      'vb-pagination': Pagination
    },
    computed:{
      activeSortIcon(){
        return `${this.sortIcon}-${this.sort.asc ? 'up' : 'down'}`;
      },
      tableColumns(){
        let { columns }=this.local;
        if( !columns && this.dataSource && this.dataSource.length ){
          columns=Object.keys( this.dataSource[0] ).map( c=>({ title: c, prop: c }))
        }
        if( columns ){
          return columns.map( c=>{
            c=isString( c ) ? { prop: c, title: capitalize( c )} : c;
            let column=assign({
              align: 'auto',
              widget: 'auto',
              sortable: true,
              type: String,// Date, Number,
              format:false, // function or string used by some column types ( like dates )
              sort: null, // fn to use to sort two items in sort
              width: 'auto',
              title: '',
              prop: ''
            }, c );
            if( !column.tile && column.prop ) column.title=capitalize( column.prop );
            return column;
          }).filter( c=>c.prop )
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
      dataItems(){// local copy of data sorted
        if( this.dataSource ){
          if( !this.local.autopage ) return this.dataSource;
          let { by, page, asc }=this.sort;
          let items=this.dataSource.slice();
          let start=(page-1) * this.local.per;
          let end=start + this.local.per;
          if( this.local.autosort && by ){
            items.sort(( a, b )=>{
              let av=a[ by ], bv=b[ by ];
              let ret=av < bv ? -1 : 1;
              return asc ? ret : -ret;
            });
          }

          return items.slice( start, end );
        }
      },
      paginationData(){
        let { per }=this.local;
        let { page }=this.sort;
        let count=this.totalDataCount;
        let start=Math.max(( page-1 ) * per, 1 );
        let end=Math.min(start + per, count );
        return{
          page,
          per,
          start,
          end,
          count
        }
      },
      totalDataCount(){
        return this.dataSource && this.dataSource.length;
      },
      rows(){

      }
    },
    methods:{
      cellStyle( col, item ){
        let ret={};
        if( col.align!=='auto') ret['text-align']=col.align;
        return ret;
      },
      columnClass( col ){
        return {
          'is-sortable': col.sortable,
          'is-sorted has-background-dark has-text-white': col.prop===this.sort.by
        }
      },
      columnStyle( col ){
        let ret={
          width: this.colWidth( col )
        };
        if( col.align !== 'auto' ) ret['text-align']=col.align;
        return ret;
      },
      colWidth( col ){
        let autos=this.tableColumns.filter( c=>c.width==='auto');
        let reserved=this.tableColumns.filter( c=>c.width!=='auto' ).reduce(( n, c )=>{
          return n + ( c.width < 100 ? c.width : 0 );
        }, 0 );
        if( col.width==='auto') return (100-reserved)/autos.length+'%';
        else if( col.width < 100 ) return col.width+'%';
      },
      onSort( prop ){
        let col=this.tableColumns.find( c=>c.prop===prop );
        if( col  && col.sortable ){
          if( this.local.autosort ){
            let { by }=this.sort;
            if( by===prop ) this.sort.asc=!(this.sort.asc);
            else{
              this.sort.asc=true;
              this.sort.by=prop;
            }
          }
          this.$emit('sort', prop );
        }
      },
      isCurrent( item ){
        return this.selected.items.indexOf( item ) >= 0;
      },
      select( item, un ){
        let { items }=this.selected;
        let index=items.indexOf( item );
        if( un ){
          if( index >= 0 ) items.splice( index, 1 );
        }
        else if( index < 0 ) items.push( item );
      },
      unselect( item ){
        return this.select( item, true );
      },
      toRepresentation( column, item ){
        let { prop, type, format }=column;
        let value=item[ prop ];
        if( type===Date ){
          return moment( value ).format( format );
        }
        return value;
      }
    },
    created(){},
    mounted(){
      // console.log( 'data', this.dataSource )
    },
    watch:{}
  }
</script>
<template lang="pug">
  section
    table( :class="classList")
      slot
        caption( v-if="local.caption") {{local.caption}}
        thead
          tr( v-if="tableColumns" )
            th( v-for="col in tableColumns"
              :class="columnClass( col )"
              :style="columnStyle( col )"
              @click="onSort( col.prop )")
              .field.has-addons
                .control.is-expanded( :style="{'text-align': col.align==='auto' ? 'left' : col.align}") {{col.title}}
                .control
                  span.icon( v-if="sort.by===col.prop && sort.asc===true "): i.fa( :class="'fa-'+sortIcon+'-up'")
                  span.icon( v-else-if="sort.by===col.prop"): i.fa( :class="'fa-'+sortIcon+'-down'")


        tbody( v-if="tableColumns")
          tr( v-for="item in dataItems" )
            table-cell( v-for="col in tableColumns"
              :col="col"
              :item="item"
              :toRepresentation="toRepresentation"
              :editEvents="editEvents"
              :editable="editable"
              :editing="isEditing( item )"
              @edit="startEditor( item )" )
    .columns
      .column.is-3
        .content
          p.
            Showing {{paginationData.start}} - {{paginationData.end}} of {{paginationData.count}} rows
      .column
        vb-pagination( is-rounded is-centered v-if="autopage" :items="dataSource" :page="sort.page" :per="local.per"
          @page="v=>sort.page=v")
      .column.is-3

</template>
