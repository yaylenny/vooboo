<script>
  import { Bulma } from "Mixins";
  export default{
    mixins:[ Bulma('radio') ],
    props:{
      choices: Array
    },
    methods:{
      onChange( option ){
        this.onInput( option.value )
      }
    },
    computed:{
      options(){
        return ( this.choices || [] ).filter( n=>( n.label && n.value ));
      }
    }
  }
</script>
<template lang="pug">
  .control
    label.radio( v-for="option in options" v-if="options")
      input( type="radio" :name="name" @change="onInput( option.value )")
      | {{option.label}}
</template>
