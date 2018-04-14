// export your default mixins

import { isPlainObject, isFunction, isString, assign, keys, isArray, hasIn, kebabCase } from "lodash";
import localDataConsumer from "./localDataConsumer.vue";

const MODS={
  colors:['isPrimary','isInfo','isSuccess','isDanger','isWarning','isText','isDark','isLight', 'isWhite', 'isBlack'],
  icons: [ 'icon','iconsLeft','iconsRight'],
  sizes:[ 'isSmall','isNormal','isMedium','isLarge'],
  states:[ 'isHovered','isFocused','isLoading'],
  styles:[ 'isRounded' ],
  expanders:[ "isExpanded" ],
  table:['isBordered', 'isStriped', 'isHoverable', 'isFullwidth', 'isNarrow'],
  input:[ 'colors', 'sizes', 'styles', 'states', 'expanders', 'icons' ],
  all:[ 'colors', 'sizes', 'styles', 'states', 'expanders', 'icons' ]
};


const EXCLUSIONS=[ 'icons' ];// dont apply classes for these mods
const EXTENSIONS=[ 'input' ]; // make up multiple mods
const FORMITEMS=['input','autocomplete','datepicker','radio','checkbox','select','button'];
const UNSTYLED=['checkbox', 'select'];
const MULTIS=['table']
const SPECIALMODS={
  icons(){
    return{
      icon: String, iconsLeft: [ Array, String ], iconsRight:[ Array, String ]
    }
  }
}

let isIn=( arr, item )=>( isArray( arr ) && arr.indexOf( item ) >=0 );
let itHas=arr=>(item=>isIn( arr, item ));
let isForm=itHas( FORMITEMS );
let isExt=itHas( EXTENSIONS );
let isExc=itHas( EXCLUSIONS );
let isMulti=itHas(MULTIS);
let getConfig=( mods )=>{
  if( mods.length ){
    let index=mods.findIndex( m=>isPlainObject( m ));
    if( index >= 0 ){
      return mods.splice( index, 1 ).pop();
    }
  }
  return {};
};
let getMixins=( id, config )=>{
  let mixins=keys( config ).reduce(( mixins, key )=>{
    if( isIn( configMixins, key )) mixins.push( configMixins[ key ]);
    return mixins;
  }, []);
  if( isForm( id )) mixins.push( formMixin );
  return mixins;
};
let getModifiers=( id, mods )=>{
  if( !mods.length ){
    if( isForm( id ) && !isIn( UNSTYLED, id )) mods=MODS.all;// form items get all style props
    else if( isIn( MODS, id )) mods=MODS[ id ];
  }
  return mods.reduce(
    ( arr, mod )=>arr.concat( isExt( mod ) ? MODS[ mod ] : [ mod ]), [])
    .filter( mod=>MODS[ mod ]);
};

let getProps=( id, modifiers )=>{
  let props=modifiers.reduce(( o, mod )=>{
    if( SPECIALMODS[ mod ]){
      return assign({}, o,  SPECIALMODS[ mod ]());
    }
    else{
      MODS[ mod ].forEach( p=>o[p]=Boolean );
    }
      return o;
    }, {});
  if( isForm( id )){
    assign( props,{ name: String, value: {}});
  }
  return props;
};

let formMixin={
  props:{
    name: String,
    value: {}
  },
  methods:{
    onInput( value ){
      this.$emit('input', value );
    }
  },
  on:{
    input: 'onInput'
  }
};

let localMixin={
  data(){
    return {};
  }
}
let configMixins={ hasLocals: localMixin };

function Bulma( id, ...mods ){// returns an object to be used as a mixin
  // id of the component i.e. input, select, checkbox
  let config=getConfig( mods );
  let modifiers=getModifiers( id, mods );
  let mixins=getMixins( id, config );
  let props=getProps( id, modifiers );
  return {
    mixins,
    props,
    computed:{
      classList(){
        return this.getClassList();
      }
    },
    methods:{
      getClassList(){
        let ret=modifiers.reduce(( arr, mod )=>{
          let mods=MODS[ mod ].filter( p=>this[ p ]);
          if( !isExc( mod ) ){
            if( !isMulti( mod )){
              mods=mods.length ? [ mods[0]] : [];
            }
            return arr.concat( mods.map( m=>kebabCase( m )));
          }
          return arr;
        }, [ this.baseClass ]);
        this.touchClassList( ret );
        return ret;
      },
      touchClassList( arr ){
        // extenders use this to manipulate classlist
      }
    },
    data(){
      return{
        baseClass: this.$options.baseClass || ''
      }
    }
  };
}

export {
  Bulma,
  localDataConsumer
};
