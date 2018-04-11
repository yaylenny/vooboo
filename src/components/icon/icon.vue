<script>
  import { kebabCase } from "lodash";
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
        let icon=this.icon || this.$slots.default[0].text;
        console.log( 'icon', icon );
        icon=icon.trim();
        return this.base+icon;
      },
      wrapperClass(){
        let ret=['icon']
          .concat( this.firstOf(['isSmall','isMedium','isLarge']))
          .concat( this.firstOf(['isLeft','isRight']));
        return ret;
      }
    },
    methods:{
      firstOf( ...props ){
        return props.reduce(( arr, prop )=>{
          if( !arr.length && this[ prop ]) arr[0]=kebabCase( prop );
        }, []);
      }
    },
    created(){},
    watch:{}
  }
</script>
