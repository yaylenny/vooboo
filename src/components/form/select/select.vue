<script>
  // import { isArray, isFunction } from "lodash";

  import { Bulma } from "Mixins";
  export default{
    mixins:[ Bulma('select') ],
    props: {
      options: [ Array, Function ]
    },
    data(){
      return {};
    },
    components:{},
    computed:{
      selectOptions(){
        let ret=this.options;
        if( typeof ret==='function'){
          ret=ret( this );
        }
        if( Array.isArray( ret )) return ret;
      }
    },
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template>
  <div class="select">
    <select :value="value" @change="$emit('input', $event.target.value )">
      <option v-for="option in selectOptions" :value="(option.value || option )">
        {{option.text || option.title || option }}
      </option>
    </select>
  </div>
</template>
