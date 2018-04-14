<script>
  import { Bulma } from "Mixins";
  import ButtonIcon from "../../icon/icon.vue";
  export default{
    baseClass: 'button',
    mixins:[ Bulma('button') ],
    components:{ ButtonIcon },
    computed:{
      mediumIcon(){
        return this.isMedium || this.isLarge;
      },
      smallIcon(){
        return !(this.mediumIcon);
      }
    },
    props:{
      icon: String,
      text: String,
      iconOnly: Boolean
    }
  }
</script>
<template>
  <div class="control">
    <button
      :class="classList"
      @click="$emit( 'click', $event )">
      <button-icon v-if="icon">
        {{icon}}
      </button-icon>
      <span v-if="!iconOnly"><slot>{{text}}</slot></span>
    </button>
  </div>
</template>
