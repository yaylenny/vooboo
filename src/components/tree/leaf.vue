<script>
  import { getNode } from "./trees.js";
  export default{
    props: {
      label: { type: String, required: true },
      level:{ type: Number, default: 0 },
      elbowIcon:{ type: [ String, Boolean ] },
      mainIcon: { type: String }
    },
    methods:{
      onSelect(){
        this.$emit('select');
      },
      onToggle(){
        this.$emit('toggle', this.id );
      }
    },
    created(){},
    watch:{
      elbowIcon(v){ console.log( 'elbwo chabge', v )}
    }
  }
</script>
<template lang="pug">
  .tree-leaf( @click.stop="onSelect")
    .tree-icon.spacer( v-for="n in level" is-spacer )
    .tree-icon.elbow-icon( v-if="elbowIcon" @click.stop="onToggle")
      i( :class="elbowIcon" )
    .tree-icon.half-spacer( v-else )
    .tree-icon.main-icon
      i( :class="mainIcon")
    span.tree-label {{label}}
</template>
