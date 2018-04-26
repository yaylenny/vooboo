import FieldClass from "./fields/Field.js";
import BooleanFieldClass from "./fields/BooleanField.js";
import StringFieldClass from "./fields/StringField.js";

let Field=opt=>new FieldClass( opt );
let BooleanField=opt=>new BooleanFieldClass( opt );
let StringField=opt=>new StringFieldClass( opt );

export{
  Field,
  BooleanField,
  StringField
};

export default{
  Field,
  BooleanField,
  StringField
};
