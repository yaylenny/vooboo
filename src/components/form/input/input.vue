<script>
  import { Bulma } from "Mixins";
  import text from "./base/text.vue";
  import icon from "../icon/icon.vue"

  export default{
    // modifiers:['colors','sizes','states','styles' ],
    mixins:[ Bulma('input'), text ],
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
      getIcons( side="right"){
        let icons=this[ side==='right' ? 'iconsRight' : 'iconsLeft'];
        return icons && ( Array.isArray( icons ) ? icons : [ icons ]);
      }
    },
    watch:{
    },
    destroyed(){
      // this.unbindEvents();
    },
    mounted(){
    },
    // render( h ){
    //   let tag=this.type==='textarea' ? 'textarea' : 'input';
    //   let attrs={ placeholder: this.placeholder };
    //   if( tag==='textarea' ){
    //     if( this.rows ) attrs.rows=this.rows;
    //     if( this.columns ) attrs.columns=this.columns;
    //   }
    //   else{
    //     attrs.type=this.type;
    //   }
    //   let icons=this.allIcons.map(({ fa, right }, index )=>h( icon, {
    //     key: index,
    //     props:{
    //       icon: fa,
    //       isRight: right,
    //       isLeft: !right,
    //       isSmall: this.isSmall,
    //       isMedium: this.isMedium,
    //       isLarge: this.isLarge
    //
    //     }
    //   }));
    //   console.log(' ALLL ', this.allIcons )
    //   return h( 'div', { class: this.controlClass },
    //     [
    //       h( tag, {
    //         ref: 'input',
    //         class: this.classList,
    //         attrs,
    //         props:{
    //           value: this.value,
    //         },
    //         on:{
    //           change: this.onInput
    //         }
    //       }),
    //       icons
    //     ]
    //   )
    // }
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
