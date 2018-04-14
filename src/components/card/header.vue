<script>
  export default{
    props: {
      title: String,
      icon: String,
      isIconless: Boolean
    }
  }
</script>
<template lang="pug">
  header.card-header
    .card-header-title
      slot {{title}}
    .card-header-icon( v-if="!isIconless")
      slot( name="icon" )
</template>
