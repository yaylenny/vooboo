<script>
  export default{
    props: {},
    data(){
      return {};
    },
    components:{},
    computed:{
      moviesColumns(){
        return [
          { prop: 'id', width: 5 },
          'title',
          { prop: 'release', type: Date, format: 'MM/d/YY', width: 15, align: 'right'}
        ]
      },
      peopleColumns(){
        return [
          'first', 'last',
          { prop:'date', type: Date, format: 'MMMM D, YYYY' },
          'city', { prop: 'movie', width: 40 }]
      }
    },
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  section
    .hero: .hero-body: .container
      h1.title Table Component
      p.subtitle Sort, edit and resize tabular data constructs
    .container
      vb-table(
        getter="people"
        :columns="peopleColumns"
        sort-by="date"
        sort-icon="angle"
        :per="20"
        caption="A table using the getter option"
        is-bordered is-striped is-hoverable is-fullwidth is-narrow)
    .container: hr
    .hero: .hero-body: .container
      h1.title Editable Table
      p.subtitle Edit data in place
    .container
      vb-table(
        getter="movies"
        :editable="true"
        :columns="moviesColumns"
        is-fullwidth
      )

</template>
