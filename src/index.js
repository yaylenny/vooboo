import { kebabCase } from "lodash";
import {
  card,
  CardHeader,

  icon,
  autocomplete,
  button,
  checkbox,
  datepicker,
  field,
  file,
  form,
  input,
  radio,
  select,
  TagsInput,

  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  table

} from "./components";

import { /*  *  *     MIXINS    *   *   */
  Bulma,
  localDataConsumer
} from "./mixins";

import models from "./models"; // import/export default object

let components={
  card,
  CardHeader,

  icon,
  autocomplete,
  button,
  checkbox,
  datepicker,
  field,
  file,
  form,
  input,
  radio,
  select,
  TagsInput,

  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  table
};

export default{
  install( Vue, prefix="vb-" ){
    console.log( 'installing vooboo', Object.keys( components ).join(', '));
    Object.keys( components ).forEach( key=>{
      Vue.component( prefix+kebabCase( key ), components[key]);
    })
  }
}

export{
  Bulma,
  localDataConsumer,
  models,
  
  card,
  CardHeader,

  icon,
  autocomplete,
  button,
  checkbox,
  datepicker,
  field,
  file,
  form,
  input,
  radio,
  select,
  TagsInput,

  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  table
}
