<script>
  import { Bulma } from "Mixins";
  export default{
    mixins:[ Bulma('radio') ],
  }
</script>
<template>
  <label class="radio">
    <input type="radio" :name="name" :value="value" />
    {{label}}
  </label>
</template>
