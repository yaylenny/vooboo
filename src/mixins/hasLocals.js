
import { assign, keys } from "lodash";

export default function( localProps ){
  let names=keys( localProps );
  let props=Object.assign({}, localProps );
  return {
    props,
    created(){
      this.local={};
      names.forEach( name=>{
        this.$set( this.local, name, this[ name ] || this.$options[ name ]);
      })
    }
  }
}
