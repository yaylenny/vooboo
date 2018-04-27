<script>
import { registerTree, getNode } from "./trees.js";
import { isNumber, isPlainObject } from "lodash";
import branch from "./branch.vue";

export default{
  props: {
    source: Array,
    root: {},
    labelProp: { type: String, default: 'label'},
    nodesProp: { type: String, default: 'items'},
    idProp:{ type: String, default: 'id' },
    iconBase:{ type: String, default: 'fas fa-fw' },
    iconPrefix: { type: String, default: 'fa-' },
    closedIcon:{ type: String, default: 'folder' },
    openIcon:{ type: String, default: 'folder-open' },
    leafIcon:{ type: String, default: 'leaf' },
    expandIcon:{ type: String, default: 'caret-down' },
    retractIcon:{ type: String, default: 'caret-right' },
    size: { type: String, default: 'default' },
    parent:{}
  },
  data(){
    let icons={
      base: this.iconBase,
      prefix: this.iconPrefix,
      closed: this.closedIcon,
      open: this.openIcon,
      expand: this.expandIcon,
      retract: this.retractIcon,
      leaf: this.leafIcon
    };

    let keys={
      label: this.labelProp,
      nodes: this.nodesProp,
      id: this.idProp
    }
    return {
      tid: 0,
      activeNodeID: 0,
      inDespose: true, // change this to false when ready to use again, dumbass
      keys,
      icons,
      ico:{}
    };
  },
  components:{
    'tree-branch': branch
  },
  computed:{
    activeNode:{
      get(){
        if( this.activeNodeID ){
          return getNode( this.tid, this.activeNodeID );
        }
      },
      set( v ){
        let nid=null;
        if( isPlainObject( v )){
          if( v.nid ) nid=v.nid;
        }
        else if( isNumber( v )) nid=v;
        if( isNumber( nid ) && getNode( this.tid, nid )){
          this.activeNodeID=nid;
        }
      }
    },
    baseIconClass(){
      return this.icons.base+' '+this.icons.prefix;
    },
    treeNodes(){
      let { labelProp, nodesProp }=this;
      if( this.source ){
        let nodes=this.source.map( node=>this.formatTreeNode( node ))
        return nodes;
      }
    }
  },
  methods:{
    formatTreeNode( node, level=0 ){
      let { idProp, labelProp, nodesProp }=this;
      let label=node[ labelProp ];
      let nodes=node[ nodesProp ];
      let id=node[ idProp ];
      if( !label ) return console.error('label key missing', labelProp, node );

      let treeNode={ id, label, level, node };
      if( nodes ) treeNode.nodes=nodes.map( node=>this.formatTreeNode( node, level+1 ) );
      return treeNode;
    },
    selectNode( nid ){
      this.activeNode=nid;
      this.$emit( 'select', getNode(nid) );
    },
    setupIcons(){
      let { icons }=this;
      let { base, prefix }=icons;
      [ 'closed', 'open', 'expand', 'retract', 'leaf' ].forEach( n=>{
        this.$set( this.ico, n, `${base} ${prefix}${icons[n]}`)
      });
    }

  },
  created(){
    this.tid=registerTree( this );
    this.setupIcons();
  },
  watch:{}
}
</script>

<template lang="pug">
  tree-branch(
    :tid="tid"
    :key="tid"
    :source="treeNodes"
    :root="root"
    :activeNodeID="activeNodeID"
    :ico="ico"
    :baseIconClass="baseIconClass"
    @select="selectNode")
</template>

<style lang="scss" src="./tree.scss"></style>
