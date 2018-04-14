

export default class Manager{
  constructor(){// new managers are created before they are attached to any model
    this.model=null;
    this.name='';
  }
  meetModel( model ){
    this.model=model;
    
  }
}
