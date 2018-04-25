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
  section
    .hero
      .hero-body: .container
        .message: .message-body.
          The components described herein are referred to throughout the documentation!

    .hero: .hero-body: .container:  h1.title Card
    .container: .columns
      .column.is-4
        vb-card( title="My card title" )
          .content
            p There are multiple uses for the card component
            ul
              li A sectional dismissable division of content or ideas
              li A quick, easy to digest small amount of potentially critical information
          template( slot="footer-items")
            a.card-footer-item( @click="" )
              vb-icon edit
              span Edit content
    hr
    .hero: .hero-body: .container: .h1.title Panel
      .container: .columns
        .column.is-4
          vb-panel( title="My Stupid Panel" s)
</template>
