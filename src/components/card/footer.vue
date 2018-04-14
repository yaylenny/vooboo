<script>
  export default{
    props: {
      items: Array
    }
  }
</script>
<template lang="pug">
  .card-footer
    slot
      a( v-for="item in items" v-if="items" )
</template>
