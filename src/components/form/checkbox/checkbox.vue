<script>
  import { Bulma } from "Mixins";
  export default{
    mixins:[ Bulma('checkbox') ],
    props: {
      label: String
    },
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template>
  <div class="control">
    <label class="checkbox">
      <input type="checkbox" :checked="value" @change="onInput( $event.target.checked )" />
      <slot>{{label}}</slot>
    </label>
  </div>
</template>
