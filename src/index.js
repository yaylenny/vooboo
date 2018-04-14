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
