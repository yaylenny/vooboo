<script>
  import moment from "moment";

  export default{
    props: {},
    data(){
      return {
        dates:{
          moment: moment(),
          date: new Date(),
          string: 'July 4, 2018'
        }
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
  section.page
    .hero: .hero-body: .container
      h1.title Datepicker
      h2.subtitle A datepicker component for vue
    .demo-entry.container
      .columns
        .column
          vb-field( label="Moment instance" )
            .columns
              .column.is-4
                vb-datepicker( icon="calendar" v-model="dates.moment" )
              .column
                .content
                  p Passing a moment instance as your value gets a moment instance back
                .box
                  code.
                    vb-datepicker( v-model="mymoment" )
          vb-field( label="Date instance")
            vb-datepicker( icon="calendar" v-model="dates.date" )
          vb-field( label="Date string" )
            vb-datepicker( icon="calendar" v-model="dates.string" format="MMMM DD, YYYY" )
</template>
