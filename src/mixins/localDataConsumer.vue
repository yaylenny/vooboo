<script>
  import { assign, isObject, isArray, isString, isNumber, isNull, isUndefined, hasIn, keys } from "lodash";
  let storage=( window && window.localStorage );
  if( !storage ){
    storage=(()=>{
      let fail={};
      return{
         getItem:n=>fail[n] || null,
         setItem:(n,v)=>fail[n]=v
      }
    })();
  }

  let needsJSON=( type )=>{
    return [ Array, Object ].indexOf( type ) >= 0;
  };
  export default{
    data(){
      return {
        localDataConfig: {},
        storage
      };
    },
    components:{},
    computed:{
      configKeys(){
        return keys( this.localDataConfig );
      }
    },
    methods:{
      bindLocalDataWatchers(){
        keys( this.localDataConfig ).forEach( prop=>{
          let { autoSave }=this.localDataConfig[ prop ];
          if( autoSave ){
            this.$watch( prop, value=>this.storeLocalData( prop ));
          }
        })
      },
      getItem( key ){
        return storage.getItem( key );
      },
      loadLocalData( prop, checkAuto ){
        if( !hasIn( this.localDataConfig, prop )) return console.error('prop not found', prop );
        let local=this.localDataConfig[ prop ];
        let { key, type, autoLoad }=local;
        if( checkAuto && !autoLoad ) return;
        let value=this.getItem( key );
        if( value===null && local.default ){
          this.storeLocalData( prop, local.default );
        }
        else{
          try{ value=JSON.parse( value )} catch( e ){}
          if( !( isNull( value ) || isUndefined( value )) ) this[ prop ]=value;
          console.log( 'load data', prop, value )
        }
      },
      storeLocalData( prop, value=null ){
        value=value===null ? this[ prop ] : value;
        let { key }=this.localDataConfig[ prop ];
        if( key ) this.setItem( key, value );
      },
      setItem( key, value ){
        [ isArray, isObject ].forEach( f=>{
          if( f( value )){
            value=JSON.stringify( value );
            return false;
          }
        });
        storage.setItem( key, value );
        return value;
      },
      setupLocalData(){
        let localData=this.$options.localData || this.localData;
        if( isObject( localData )){
          console.log( 'setting up local data', localData )
          keys( localData ).forEach( prop=>{
            let opt=localData[ prop ];
            if( isString( opt )) opt={ key: opt };
            if( isObject( opt )){
              opt=assign({
                prop,
                autoLoad: true,
                autoSave: true,
                type: {},
                default: '',
                key: null
              }, opt );
              if( opt.key && hasIn( this, prop )){
                this.$set( this.localDataConfig, prop, opt );
              }
            }
          });
          console.log( 'localDataConfig', this.localDataConfig )
        }
        else console.log( 'not localdata', localData )
      }
    },
    created(){
      this.setupLocalData();
      keys( this.localDataConfig ).forEach( prop=>this.loadLocalData( prop, true ));
      this.bindLocalDataWatchers();
    },
    watch:{}
  }
</script>
