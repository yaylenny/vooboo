
import { isUndefined, assign } from "lodash";

export default class Field{
  constructor( options={} ){
    this.$options=assign({
      disabled: false,
      helptext: '',
      initial: '',
      label: '',
      messages: {},
      required: false,
      widget: this._defaultWidget,
      validators: []
    }, options );
    assign( this, this.$options, {

    })
  }
  get isValid(){
    return this.validate( this.value );
  }

  get _defaultWidget(){
    console.log( 'default widget beign called from the FIELD class??')
  }

  clean( value ){
    return value;
  }

  validate( value ){

  }
}
