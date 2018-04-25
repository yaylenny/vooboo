<script>
  import { forms } from "Lib/vooboo";
  let megaFields={
    name: forms.StringField({ required: true }),
    adult: forms.BooleanField({}),
    fields: ['name', 'adult']
  }
  export default{
    props: {},
    data(){
      return {
        megaFields
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
    .hero.is-light
      .hero-body: .container
        h3.title Forms
    .container
      .content
        p Forms components are made easy with Vooboo.

      .columns
        .column
          vb-form( :Fields="megaFields")
</template>
