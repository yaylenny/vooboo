<script>
  import { registerNode, getNode } from "./trees.js";
  import branch from "./branch.vue";
  import leaf from "./leaf.vue";

  export default{
    name: 'tree-branch',
    props: {
      tid: Number, // the outermost tree component's  tid
      source: Array, // only passed to top level tree nodes
      level:{ type: Number, default: 0 },
      label: { type: String },
      ico:{ type: Object, required: true }, // classnames already mapped
      icon: String,
      baseIconClass: String,
      id: {},
      nodes: Array,
      raw:{}, // node options as passed in
      expanded: { type: Boolean, default: true },
      activeNodeID: Number,
      format: Function // the function used by tree to parse data
    },
    data(){
      return {
        isExpanded: this.expanded,
        nid: 0
      };
    },
    components:{
      'tree-branch': branch,
      'tree-leaf': leaf
    },
    computed:{
      pk(){

      },
      elbowIcon(){
        if( this.nodes ) return this.getIcon( this.isExpanded ? 'expand' : 'retract');
        return false;
      },
      nodeItems(){
        return this.source || this.nodes;
      },
      nodeLabel(){// data representing the leaf portion of this node
        let { label, nodes }=this;
        if( this.source ){// this is the root node but might not have a root setup
          if( this.root ){
            label=this.root.label;
          }
        }
        if( !label ) return false;
        return label;
      },
      mainIcon(){// a folder or leaf or custom
        return this.getIcon( this.nodes ? (this.isExpanded ? 'open' : 'closed'):'leaf');
      }
    },
    methods:{
      getIcon( state ){// expand/ retract/open/closed /leaf  ( allow for override per level )
        let node=this.raw && this.raw.node;
        // console.log( 'geticon', state, node )
        let value=node && node[ state ];
        if( value ){
          return this.baseIconClass+value;
        }
        return this.ico[ state ];
      },
      toggle(){
        if( this.nodes ){
          this.isExpanded=!this.isExpanded;
          // console.log ('treenode toggle, expanded?', this.elbowIcon )
        }
      },
      selectPassThrough( id ){
        this.$emit( 'select', id );
      },
      selectNode(){
        this.$emit('select', this.nid );
        this.toggle();
        // console.log( 'branch node data', getNode( this.tid, this.nid ))
      }
    },
    created(){
      this.nid=registerNode( this.raw || this, this.tid );
    },
    watch:{}
  }
</script>
<template lang="pug">

  .tree-branch( :class="{'vue-tree': source }")
    tree-leaf(
      v-if="nodeLabel"
      :label="nodeLabel"
      :level="level"
      :elbowIcon="elbowIcon"
      :expandIcon="ico.expand"
      :retractIcon="ico.retract"
      :mainIcon="mainIcon"
      :id="id"
      :class="{'is-active': nid===activeNodeID }"
      @toggle="toggle"
      @select="selectNode")

    .leaf-nodes( v-if="nodeItems" v-show="isExpanded" )
      tree-branch(
        v-for="node in nodeItems"
        :tid="tid"
        :id="node.id"
        :key="node.id"
        :icon="node.icon"
        :ico="ico"
        :baseIconClass="baseIconClass"
        :level="node.level"
        :label="node.label"
        :nodes="node.nodes"
        :raw="node"
        :activeNodeID="activeNodeID"
        @select="selectPassThrough")
</template>
