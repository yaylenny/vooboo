<script>
  export default{
    props: {},
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
  .dropdown( :class="{ 'is-active': isActive }")
    .dropdown-trigger
      slot( name="trigger")
    .dropdown-menu( role="menu")
      .dropdown-content
        slot

</template>
