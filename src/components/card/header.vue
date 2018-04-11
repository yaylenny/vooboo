<script>
  export default{
    props: {
      title: String,
      icon: String
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
<template lang="pug">
  header.card-header
    .card-header-title
      slot
        | {{title}}
    slot( name="icon" )
</template>
