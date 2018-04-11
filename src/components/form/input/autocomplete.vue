<script>
  import TextInput from "./input.vue";
  import { Bulma } from "Mixins";
  import { assign, isArray, isObject, isString, isFunction, debounce } from "lodash";

  export default{
    mixins:[ Bulma('autocomplete') ],
    // modifiers:['colors','sizes','states','styles' ],
    // source: false,
    // getter: false,
    // searchProps: false,
    // labelProp: false,
    props: {
      source: Array,
      getter: String,// store getter takes priority
      url: String,
      searchProps: [Array, String], // properties on each object to search (if objects)
      labelProp:{ type: String, default: 'label' }, // property to use for label ( if object )
      valueProp:{ type: String, default: 'label' }, // property to use for v-model input
      forceSelect:Boolean, // if true, items not on the list are not accepted
      maxResults:{ type: Number, default: 50 },
      // performLabel: Function,
      // performSearch: Function,
      openOnFocus: Boolean,
      showAll:{ type: Boolean, default: true }, // when no search string or when raw result
      iconsLeft: [String, Array],
      iconsRight: [String, Array],
      icon:String,
      placeholder: String,
    },
    data(){
      let{ source, getter, url, searchProps, labelProp }=this.$options;
      let local=['source','getter','url','searchProps','labelProp', 'valueProp'].reduce(( o, prop )=>{
        return assign({}, o, {[ prop ]: this.$options[ prop ] || this[ prop ]})
      }, { value: `${this.value}`});
      if( !isArray( local.searchProps )) local.searchProps=[ local.searchProps ];
      return {
        local,
        dropdown:{
          visible: false
        },
        raw:{
          results: [],
          pointer: 0, // index of highlighted item
          result: null, // an entry inside the results array
          fetches: [], //server trips
          timer: 0
        }
      };
    },
    components:{
      'text-input': TextInput
    },
    computed:{
      activeResult(){
        let { pointer, results }=this.raw;
        if( pointer < 0 || pointer >= results.length-1 ) return console.error( 'OUT OF BOUNDS', pointer );
        return results[ pointer ];
      },
      dataSource(){
        let items=[];
        let { getter, source, url }=this.local;
        if( getter ) return this.$store.getters[ getter ];
        else if( source ) return source;
        return false;
      },
      results(){// taken from raw.results, which is the catchall for results, server or local
        let { results }=this.raw;
        if( !results ) return console.error( 'RAW REAULTS GONE', this.raw )
        if( results.length >  this.maxResults ) results=results.slice( 0, this.maxResults );

        return this.raw.results.map( result=>this.toResult( result ));
      }
    },
    methods:{
      fetchResults( value ){
        return new Promise(( resolve, reject )=>{
          if( !value ) return resolve( null );
          axios.get( this.local.url, { term: value }).then( response=>{
            resolve( response.data );
          }).catch( reject );

        });
      },
      filterResults( results, value ){
        let { searchProps }=this.local;
        if( !value ) return;
        let ret=results.reduce(( ret, result)=>{
          let searchValues=[];
          if( isString( result )) searchValues=[ result ];
          else if( isObject( result )){
            if( !searchProps ) searchProps=Object.keys( result );
            searchValues=searchProps.reduce(( arr, prop )=>{
              let v=result[ prop ];
              if( isString( v )) arr.push( v );
              return arr;
            }, []);
          }
          if( searchValues.length ){
            let score=this.testSearch( searchValues, value );
            if( score ) ret.push({ score, result });
          }
          return ret;
        }, []);
        ret.sort(( a, b )=>( b.score -  a.score ));
        return ret.map( n=>n.result );
      },
      getLabel( result ){
        if( isFunction( this.$options.getLabel )) return this.$options.getLabel( result );
        if( isString( result )) return result;
        let prop=this.labelProp || this.valueProp;
        if( prop ) return result[ prop ];
        return ({}).toString.call( result );
      },
      getResults( value ){
        return new Promise(( resolve, reject )=>{
          if( this.dataSource ){
            resolve( this.filterResults( this.dataSource, value ));
          }
          else{
            this.fetchResults().then( results=>resolve( results )).catch( reject );
          }
        })
      },
      getValue( result ){
        if( isFunction( this.$options.getValue )) return this.$options.getValue( result );
        if( isString( result )) return result;
        let prop=this.valueProp || this.labelProp;
        if( prop ) return result[ prop ];
      },
      hideDropdown(){
        this.dropdown.visible=false;
      },
      onBlur( e ){
        clearTimeout( this.raw.timer );
        this.raw.timer=setTimeout(()=>{
          this.hideDropdown();
        }, 300 );
      },
      onChange(){
        // console.log( 'value change', this.local.value )
      },
      onKeyup(e){
        if( this.local.value !== e.target.value ){
          this.local.value=e.target.value;
          this.dropdown.visible=!!(this.local.value);
          this.updateResults( this.local.value );
        }
      },
      onFocus(e){ console.log( 'focus acutocmplete')
        e.target.select();
        if( this.openOnFocus || this.raw.result ) this.dropdown.visible=true;
      },
      onNavigateDown(e){
        let p=this.raw.pointer+1;
        this.raw.pointer=Math.min( p, this.raw.results.length-1 );
      },
      onNavigateTab(e){
        // this.hideDropdown();
      },
      onNavigateUp(e){
        let p=this.raw.pointer-1;
        this.raw.pointer=Math.max( p, 0 );
      },
      onSelectPointer(){
        this.onSelectResult( this.activeResult );
      },
      onSelectResult( result ){
        if( !result ){
          return;
        }
        this.raw.result=result;
        this.local.value=this.getLabel( result );
        this.$emit('input', this.getValue( result ));
        this.$emit('select', result )
        this.hideDropdown();
      },
      setRawResult(){
        if( this.value ){
          if( this.dataSource ){
            let item=this.dataSource.find( o=>this.getValue( o )===this.value );
            if( item ) this.raw.result=item;
            this.local.value=this.getLabel( item );
          }
        } else{
          this.raw.result=null;
        }
      },
      testSearch( results, value ){
        let scores=[
          new RegExp( value, 'i' ),
          new RegExp( value ),
          new RegExp( `^${value}`, 'i' ),
          new RegExp( `^${value}` )
        ];
        return results.reduce(( ret, result )=>{
          scores.forEach(( reg, i )=>{
            if( reg.test( result )) ret=i+1;
          });
          return ret;
        }, 0 );
      },
      toResult( result ){
        return { result, label: this.getLabel( result )};
      },
      toRepresentation( result ){// string version

      },
      toValue(){

      },
      updateResults( value ){
        this.getResults( value ).then( results=>{
          this.raw.pointer=0;
          this.raw.results=results || [];
        });
      }
    },
    mounted(){
      this.setRawResult();
    },
    watch:{
      value:'setRawResult'
    }
  }
</script>
<template>
  <div class="ac-control">
    <text-input
      :value="local.value"
      type="text"
      :icon="icon"
      :icons-left="iconsLeft"
      :icons-right="iconsRight"
      :is-primary="isPrimary"
      :is-info="isInfo"
      :is-danger="isDanger"
      :is-warning="isPrimary"
      :is-success="isInfo"
      :is-small="isSmall"
      :is-normal="isNormal"
      :is-medium="isMedium"
      :is-large="isLarge"
      :is-hovered="isHovered"
      :is-focused="isFocused"
      :is-loading="isLoading"
      :is-rounded="isRounded"
      :placeholder="placeholder"
      @keyup="onKeyup"
      @blur="onBlur"
      @focus="onFocus"
      @keydown.escape="hideDropdown"
      @keydown.native.up="onNavigateUp"
      @keydown.native.down="onNavigateDown"
      @keydown.native.enter.prevent.stop="onSelectPointer"
      @keydown.native.tab="onNavigateTab">
    </text-input>
    <div class="vue-ac-results" v-show="dropdown.visible">
      <div class="menu is-small">
        <ul class="menu-list">
          <li v-for="(item, i ) in results">
            <a :class="{'is-active': raw.pointer===i }" @click="onSelectResult( item.result )">
              <slot name="item" :result="item.result" :label="item.label">
                {{item.label}}
              </slot>
            </a>
          </li>
        </ul>

      </div>
      <div  v-if="!results.length">
        <em>No results...</em>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ac-control{
  position: relative;
  .vue-ac-results{
    position: absolute;
    z-index: 500;
    top: 100%;
    left: 0;
    right: 0;
    overflow: auto;
    max-height: 240px;
    background: #fff;
    border: 1px solid #aaa;
  }
}
</style>
