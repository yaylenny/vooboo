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
  dropdown,
  modal,

  pagination,
  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  table,
  tree

} from "./components";

import { /*  *  *     MIXINS    *   *   */
  Bulma,
  localDataConsumer
} from "./mixins";

import models from "./models"; // import/export default object
import forms from "./forms"; // form fields ( as opposed to components below )


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

  pagination,
  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  dropdown,
  modal,

  table,
  tree
};

export default{
  install( Vue, prefix="vb-" ){
    Object.keys( components ).forEach( key=>{
      Vue.component( prefix+kebabCase( key ), components[key]);
    })
  }
}

export{
  Bulma,
  localDataConsumer,
  forms,
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

  dropdown,
  modal,
  pagination,
  panel,
  PanelHeading,
  PanelTabs,
  PanelBlock,

  table,
  tree
}
