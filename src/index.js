import * as components from "./components";

export default{
  install( Vue, prefix="vb-" ){
    console.log( 'installing vooboo');
    Object.keys( components ).forEach( key=>{
      Vue.component( prefix+key, components[key]);
    })
  },
  ...components
}

export{
  ...components
}
