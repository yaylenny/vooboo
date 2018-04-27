<script>
  const fsSource=[
    { name: 'Downloads', id: 1, children:[
      { name: 'Music', id: 2, children:[
        { name: 'Offspring', id: 4, children:[
          { name: 'Ixnay', id: 5 },
          { name: 'Conspiracy', id: 6 }
        ]},
        { name: 'Tool', id: 9, open: 'music', children:[
          { name: 'Undertow', id: 11, leaf: 'music' },
          { name: '3rd Eye', id: 12, leaf: 'table'},
          { name: 'Aenima', id: 18, leaf: 'card'}
        ]}
      ]},
      { name: 'Pictures', id: 3, children:[
        { name: 'Old lady', id: 33 },
        { name: 'Dog187', id: 34 },
        { name: 'Portrait of a Madman', id: 35 },
        { name: 'Swimming with the sharks', id: 36 },
        { name: 'Bouncin in da 40s', id: 37 },
      ]},

    ]}
  ]
  export default{
    props: {},
    data(){
      return {
        fsSource,
        fsString: JSON.stringify( fsSource )
      };
    },
    components:{},
    computed:{

    },
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template lang="pug">
  section.page
    .container: .columns
      .column.is-3
        .card: vb-tree( :source="fsSource"
          label-prop="name"
          nodes-prop="children")
      .column
        .hero: .hero-body: .container
          h1.title.is-5 vb-tree
          .subtitle.is-5 For the rarest of occasion when a tree is actually useful
        .box: code.
          data(){
            return {
              mockfiles: {{fsString}}
            }
          }
          &lt;vb-tree
            :source="mockFiles"
            label-prop="name"
            nodes-prop="children"&gt;
          &lt;/vb-tree&gt;
</template>
