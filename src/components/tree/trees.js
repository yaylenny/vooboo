
let trees=new Map;

let counter=()=>{
  let c=0;
  let f=()=>++c;
}

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
  let treeData=trees.get( tid );
  if( !treeData ) return console.error( 'Tree not found', tid, nid )
  return treeData.nodes.find( n=>n.nid===nid )
}

export{
  getNode,
  registerTree,
  registerNode
}
