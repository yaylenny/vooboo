<script>
  export default{
    props: {
      title: String
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
  p.panel-heading
    slot( name="title" )
      | {{title}}
</template>
