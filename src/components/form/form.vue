<script>
  import FormField from "./field/field.vue";
  import FieldClass from "../../forms/fields/Field.js";

  import { isPlainObject, assign, keys } from "lodash";

  let mods=[];
  export default{
    Fields:{}, // subclasses use this as a singleton to build forms
    props: {
      Fields: Object,
      instance: {},
      data: Object,
      action: String,
      method:{ type: String, default: 'post' }
    },
    data(){
      return {
        fields:{},
        form:{
          data:{},
          fields:{},
          specs:{}
        }
      };
    },
    components:{
      FormField
    },
    computed:{
      formFields(){
        return keys( this.fields ).map( name=>{
          return assign({}, this.fields[ name ], { name })
        });
      },
      isValid(){
        return true;
      }
    },
    methods:{
      buildFormFields(){
        this.fields={};
        let Fields=Object.assign({}, this.$options.Fields || {}, this.Fields || {});
        Object.keys( Fields ).forEach( key=>{
          if( Fields[key] instanceof FieldClass ){
            this.fields[ key ]=Fields[key];
          }
        })
      },
      load( instance ){

      },
      submit(){

      }
    },
    created(){
      this.buildFormFields();
    },
    watch:{
      instance: 'load'
    }
  }
</script>
<template lang="pug">
  .vue-form
    slot
      form-field( v-for="field in formFields" :key="field.name" :field="field")

</template>
