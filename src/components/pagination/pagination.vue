<script>
  import { Bulma } from "Mixins";
  import { range, first, last } from "lodash";
  export default{
    mixins:[ Bulma('pagination', 'sizes', 'styles', 'sides' )],
    props: {
      items: { type: Array, required: true },
      prevText:{ type: String, default: "Previous"},
      nextText:{ type: String, default: "Next"},
      per: { type: Number, default: 15 },
      page: { type: Number, default: 1 },
      pagesAhead:{ type: Number, default: 1 },
      pagesBehind:{ type: Number, default: 1 }
    },
    data(){
      return {};
    },
    components:{},
    computed:{
      pageCount(){
        return Math.ceil(this.items.length/this.per);
      },
      pageListItems(){// the buttons
        let { page, pagesAhead, pagesBehind, pageCount }=this;
        let start=Math.max( page-pagesBehind, 1 );
        let end=Math.min(page + pagesAhead + 1, pageCount);
        let values=range( start, end )

        console.log( 'values oaggggg', values, 'oageciout', pageCount );
        let items=values.map( n=>({ value: n }));
        if( start >= 2 ){
          // if( start> 2 )
          items.unshift({ value: false })
          items.unshift({ value: 1 });
        }
        if( end <= pageCount ){
          if( pageCount - end > 2 ) items.push({ value: false });
          items.push({ value: pageCount });
        }
        return items;
      }
    },
    methods:{
      selectPage( n ){
        if( n===this.page ) return;
        this.$emit('page', n );
      }
    },
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  .pagination( :class="classList")
    a.pagination-previous( :disabled="page===1") {{prevText}}
    a.pagination-next( :disabled="page===pageCount") {{nextText}}
    ul.pagination-list
      li( v-for="item in pageListItems")
        a.pagination-link( v-if="item.value" @click="selectPage( item.value )" :class="{'is-current': item.value===page}" ) {{item.value}}
        span.pagination-ellipsis( v-else ) &hellip;
</template>
