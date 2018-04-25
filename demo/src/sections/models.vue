<script>
  import models from "Lib/vooboo";
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
    .hero.is-light
      .hero-body: .container
        h3.title Models
        h4.subtitle Used in conjunction with vuex
    .container: .columms
      .column.is-half
        .box
          h4.title.is-6 Creating models
          code.
            import models from "vooboo";

            class Person extends models.Model{
              name: models.StringField
            }

</template>
