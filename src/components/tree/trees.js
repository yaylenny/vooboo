
let trees=new Map;


let _uid=0;
let uid=()=>++_uid;

function registerTree( tree ){
  if( trees.has( tree )){
    return console.error('That component instance is already in...wtf??')
  }
  let tid=uid();
  let nodes=[];
  let data={ tid, tree, nodes };
  let reg=( node )=>{

  }
  trees.set( tid, data );
  return tid;
}

function registerNode( node, tid ){
  let treeData=trees.get( tid );
  let data=Object.assign({}, node, { nid: uid(), tid });
  if( treeData ){
    treeData.nodes.push( data );
  }
  return data.nid;
}

function getNode( tid, nid ){
  return getNodes( tid ).find( n=>n.nid===nid )
}

function getNodes( tid ){
  let treeData=trees.get( tid );
  return treeData ? treeData.nodes : [];
}

export{
  getNode,
  getNodes,
  registerTree,
  registerNode
}
