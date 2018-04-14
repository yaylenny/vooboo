<script>
  import { Bulma } from "Mixins";
  import icon from "../../icon/icon.vue"
  let passEvents=['focus', 'blur', 'change', 'keydown', 'keyup' ];

  let methods=passEvents.reduce(( o, name )=>{
    return Object.assign({}, o,{
      [name]( ...args ){
        if( this.$refs.input ){
          this.$nextTick( this.$refs.input[name]( ...args ));
        }
      }
    })
  }, {});
  export default{
    mixins:[ Bulma('input') ],
    data(){
      return{
        baseClass: this.type==='textarea' ? 'textarea' : 'input',
        listeners:{},
      }
    },
    props:{
      // iconsLeft: [ String, Array ],
      // iconsRight: [ String, Array ],
      // icon: String,
      placeholder: String,
      type:{ type: String, default: 'text'},
      rows:[String,Number],
      columns:[String,Number]
    },
    computed:{
      controlClass(){
        let ret=['control'];
        if( this.leftIcons ) ret.push( 'has-icons-left' );
        if( this.rightIcons ) ret.push( 'has-icons-right' );
        if( this.isExpanded ) ret.push( 'is-expanded' )
        return ret;
      },
      allIcons(){
        let map=(ico, right)=>{
          return {
            fa: ico,
            right,
          }
        }
        return (this.leftIcons || [])
          .map( ico=>map( ico, false ))
          .concat( ( this.rightIcons || [] )
            .map( ico=>map( ico, true )));
      },
      leftIcons(){
        let icons=this.getIcons('left');
        if( !icons && this.icon ) icons=[ this.icon ];
        return icons;
      },
      rightIcons(){
        return this.getIcons('right')
      }
    },
    components:{
      'vue-icon': icon
    },
    methods:{
      ...methods,
      bindEvents(){
        let $el=this.$refs.input;
        if( !$el ) return console.log( 'cannot bind events, input ref not found')
        passEvents.forEach( name=>{
          let fn=e=>this.$emit( name, e );
          this.$set( this.listeners, name, fn );
          $el.addEventListener( name, fn );
        });
      },
      unbindEvents(){
        let $el=this.$refs.input;
        if( !$el ) return;
        passEvents.forEach( name=>{
          $el.removeEventListener( name, this.listeners[ name ]);
        });
      },
      getIcons( side="right"){
        let icons=this[ side==='right' ? 'iconsRight' : 'iconsLeft'];
        return icons && ( Array.isArray( icons ) ? icons : [ icons ]);
      }
    },
    mounted(){
      this.bindEvents();
    },
    destroyed(){
      this.unbindEvents();
    }
  }
</script>
<template>
  <div :class="controlClass">
    <textarea
      v-if="type==='textarea'"
      ref="input"
      :class="classList"
      :value="value"
      @change="onInput( $event.target.value )"
      :rows="rows || 3"
      :placeholder="placeholder">
    </textarea>
    <input
      v-else
      ref="input"
      :type="type"
      :class="classList"
      :value="value"
      @change="onInput( $event.target.value )"
      :placeholder="placeholder" />

    <vue-icon v-for="( icon, i ) in allIcons"
      :key="i"
      :is-right="icon.right"
      :is-left="!(icon.right)"
      :is-small="icon.isSmall"
      :is-medium="icon.isMedium"
      :is-large="icon.isLarge">
      {{icon.fa}}
    </vue-icon>
  </div>
</template>
