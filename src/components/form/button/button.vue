<script>
  import { Bulma } from "Mixins";
  import ButtonIcon from "../icon.vue";
  export default{
    baseClass: 'button',
    mixins:[ Bulma('button') ],
    components:{ ButtonIcon },
    props:{
      icon: String,
      text: String
    }
  }
</script>
<template>
  <div class="control">
    <button
      :class="classList"
      @click="$emit( 'click', $event )">
      <button-icon v-if="icon"
        :is-small="isSmall"
        :is-medium="isMedium"
        :is-large="isLarge">
        {{icon}}
      </button-icon>
      <slot>{{text}}</slot>
    </button>
  </div>
</template>
