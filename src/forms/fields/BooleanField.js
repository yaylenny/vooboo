import Field from "./Field.js";

export default class BooleanField extends Field{
  constructor( options ){
    super( options );

  }

  get _defaultWidget(){
    return 'checkbox';// vb-input component
  }

  clean( value ){
    return !!( value );
  }
}
