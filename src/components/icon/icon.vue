<script>
  import { kebabCase, camelCase } from "lodash";
  import { Bulma } from "Mixins";

  export default{
    mixins:[ Bulma( 'icon', 'sizes' )],
    props: {
      isLeft: Boolean,
      isRight: Boolean,
      // isSmall: Boolean,
      // isMedium: Boolean,
      // isLarge: Boolean,
      tag:{ type: String, default: 'span' },
      base:{ type: String, default: 'fa fa-'},
      small:{ type: String, default: 'fa-sm'},
      medium:{ type: String, default: 'fa-md'},
      large:{ type: String, default: 'fa-lg'},
      icon:{ type: String }
    },
    render( h ){
      return h( this.tag,{ class: this.wrapperClass },[
        h( 'i', { class: this.iconClass })
      ])
    },
    data(){
      return {};
    },
    components:{},
    computed:{
      iconClass(){
        let ret=[this.base+this.iconString];
        [ 'small', 'medium', 'large'].forEach( size=>{console.log( 'uya', camelCase( `is-${size}` ), this[ camelCase( `is-${size}` ) ] )
          if( this[ camelCase( `is-${size}` ) ]){
            ret.push( this[ size ] );
            return false;
          }
        });
        return ret;
      },
      iconString(){
        return (this.icon || this.$slots.default[0].text).trim();
      },
      wrapperClass(){
        let ret=['icon']
          .concat( this.firstOf('isSmall','isMedium','isLarge'))
          .concat( this.firstOf('isLeft','isRight'));
        return ret;
      }
    },
    methods:{
      firstOf( ...props ){
        return props.reduce(( arr, prop )=>{
          if( !arr.length && this[ prop ]) return [kebabCase( prop )];
          return arr;
        }, []);
      }
    },
    created(){},
    mounted(){
    },
    watch:{}
  }
</script>
