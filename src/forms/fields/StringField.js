import Field from "./Field.js";

export default class StringField extends Field{
  constructor( options ){
    super( options );

  }
  get _defaultWidget(){
    return 'input';// vb-input component
  }
}
