<script>
  export default{
    props: {},
    data(){
      return {
        modalActive: false
      };
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  section
    .hero: .hero-body: .container
      h1.title Modal
      .subtitle A centered popup box
    .container
      .box: code.
        &lt;vb-modal :is-active="modalActive"&gt;
        &lt;/vb-modal&gt;
      p: vb-button( is-large @click="modalActive=true" is-primary )
        vb-icon( is-medium ) square
        span Launch modal
    vb-modal( :is-active="modalActive" @close="modalActive=false")
      .box
        h3.title.is-4 A modal component
        .content
          p Mucho content can go inside a modal
        .field.is-grouped.is-grouped-centered
          .control: vb-button( is-primary ) OK
          .control: vb-button( is-danger ) Cancel
</template>
