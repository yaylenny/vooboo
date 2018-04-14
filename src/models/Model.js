
import fields from "./fields";
import Manager from "./Manager.js";

export default class Model{
  constructor(){
    this.fields={};
    this.manager=null;
    console.log( 'Model', this )
  }

  get objects(){

  }
}
