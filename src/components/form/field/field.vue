<script>
  import horizontal from "./horizontal.vue";
  import vertical from "./vertical.vue";
  import { kebabCase } from "lodash";

  const recognizedControls=['text','number','date','tel', 'paddword',
    'email','textarea','checkbox','radio','select', 'file']
  export default{
    // mixins:[ item ],
    props: {
      // choices: Array, // radio and select elements
      // labelClass: String,
      // addons: Array,
      // addonsCentered: Array,
      // addonsRight: Array,
      // iconsLeft: Array,
      // iconsRight: Array,
      required: Boolean,
      widget:{},
      label: String,
      hasAddons:Boolean,
      hasAddonsCentered: Boolean,
      hasAddonsRight: Boolean,
      isGrouped: Boolean,
      isGroupedCentered: Boolean,
      isGroupedRight: Boolean,
      isGroupedMultiline: Boolean,
      isHorizontal: Boolean,
      isExpanded: Boolean,
      message: String,
      messageState: String, // is-primary
      // hasControl:{ type: Boolean, default: true },
      // placeholder:String
    },
    data(){
      return {};
    },
    components:{
      horizontal,
      vertical,
    },
    computed:{
      component(){
        return this.isHorizontal ? horizontal : vertical;
      },
      isLabelWrap(){
        return [ 'radio', 'checkbox' ].indexOf( this.type ) >= 0;
      },
      fieldClass(){
        let ret=[ 'field' ];
        let { hasAddons, hasAddonsRight, hasAddonsCentered ,
              isGrouped, isGroupedRight, isGroupedCentered,
              isGroupedMultiline, isHorizontal,  isExpanded }=this;
        if( isHorizontal ) ret.push('is-horizontal');
        if( isExpanded ) ret.push('is-expanded');
        if( hasAddons || hasAddonsRight || hasAddonsCentered ){
          ret.push( 'has-addons' );
          if( hasAddonsRight ) ret.push( 'has-addons-right' );
          if( isGroupedCentered ) ret.push( 'has-addons-centered' );
        }
        if( isGrouped || isGroupedRight || isGroupedCentered || isGroupedMultiline ){
          ret.push('is-grouped');
          if( isGroupedRight ) ret.push( 'is-grouped-right' );
          if( isGroupedCentered ) ret.push( 'is-grouped-centered' );
          if( isGroupedMultiline ) ret.push( 'is-grouped-multiline' );
        }
        return ret;
      },
      helpClass(){
        let ret=['help'];
        if( this.messageState ) ret.push( this.messageState );
        return ret;
      },
    },
    methods:{},
    created(){},
    watch:{}
  }
</script>

<template>
  <component :is="component" :class="fieldClass">
    <label slot="label" class="label" v-if="label">{{label}}</label>
    <slot>
    </slot>

    <p v-if="message" :class="helpClass">
      {{message}}
    </p>
  </component>
</template>
