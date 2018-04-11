// export your default mixins

import { isPlainObject, isFunction, isString, assign, isArray, hasIn, kebabCase } from "lodash";


const MODS={
  colors:['isPrimary','isInfo','isSuccess','isDanger','isWarning','isText','isDark','isLight'],
  icons: [ 'icon','iconsLeft','iconsRight'],
  sizes:[ 'isSmall','isNormal','isMedium','isLarge'],
  states:[ 'isHovered','isFocused','isLoading'],
  styles:[ 'isRounded' ],
  expanders:[ "isExpanded" ],
  input:[ 'colors', 'sizes', 'styles', 'states', 'expanders', 'icons' ],
  all:[ 'colors', 'sizes', 'styles', 'states', 'expanders', 'icons' ]
};


const EXCLUSIONS=[ 'icons' ];// dont apply classes for these mods
const EXTENSIONS=[ 'input' ]; // make up multiple mods
const FORMITEMS=['input','autocomplete','datepicker','radio','checkbox','select','button'];
const UNSTYLED=['checkbox', 'select'];
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

function Bulma( id, ...mods ){// returns an object to be used as a mixin
  // id of the component i.e. input, select, checkbox
  if( !mods.length ){
    if( isForm( id ) && !isIn( UNSTYLED, id )) mods=MODS.all;// form items get all style props
  }
  const modifiers=mods.reduce(
    ( arr, mod )=>arr.concat( isExt( mod ) ? MODS[ mod ] : [ mod ]), [])
    .filter( mod=>MODS[ mod ]);


  let ret={
    props: modifiers.reduce(( o, mod )=>{
      if( SPECIALMODS[ mod ]){
        return assign({}, o,  SPECIALMODS[ mod ]());
      }
      else{
        MODS[ mod ].forEach( p=>o[p]=Boolean );
      }
        return o;
      }, {}),
    computed:{
      classList(){
        return modifiers.reduce(( arr, mod )=>{
          if( !isExc( mod ) ){
            let prop=MODS[ mod ].find( s=>this[ s ]);
            if( prop ) arr.push( kebabCase( prop ));
          }
          return arr;
        }, [ this.baseClass ]);
      }
    },
    data(){
      return{
        baseClass: this.$options.baseClass || ''
      }
    }
  };
  if( isForm( id )){
    assign( ret.props, { name: String, value: {}});
    assign( ret,{
      methods:{
        onInput( value ){console.log( 'onInput', value )
          this.$emit('input', value );
        }
      },
      on:{
        input: 'onInput'
      }
    })
  }
  return ret;
}

export {
  Bulma
};
