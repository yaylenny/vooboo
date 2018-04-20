<script>
  import moment from "moment";
  import TextInput from "./input.vue";
  import { Bulma } from "Mixins";
  import { range } from "lodash";

  export default{
    name: 'vueTagspicker',
    mixins:[ Bulma('tagsInput', 'input'), TextInput ],
    baseClass: 'tags-input',
    props: {
      placeholder: String,
      name: String,
      value: Array
      // icon: String,
      // iconsLeft: [ String, Array ],
      // iconsRight: [ String, Array ],
      // isPrimary: Boolean,
      // value:{}
    },
    data(){

      return {
        hasFocus: false,
        tempTag: '',
        textInputValue: '',
        timer: 0,
        local:{
          tag: '',
          tags: (this.value || []).slice()
        }
      };
    },
    components:{
      TextInput
    },
    computed:{
    },
    methods:{
      deleteTag( tag ){
        tag=tag.trim();
        let index=this.local.tags.findIndex( t=>t===tag );
        if( index >= 0 ){
          this.local.tags.splice( index, 1 );
          this.$emit('input', this.local.tags );
        }
        else console.log( 'tag not found', tag , this.local.tags)
      },
      onClick( e ){
        if( this.$refs.input ){
          this.$refs.input.focus();
        }
      },
      onFocus( e ){
        this.hasFocus=true;
      },
      onBlur( e ){
        this.hasFocus=false;
      },
      onSubmit( e ){
        let { tag, tags }=this.local;
        if( tag ){
          let arr=[ tag ];
          if( tag.includes(',')) arr=tag.split(',');
          arr.forEach( t=>{
            if( tags.indexOf( t ) <0 ){
              tags.push( t );
            }
          });
          this.$emit('input', tags );
          this.local.tag='';
        }
      },
      writeActiveData(){

      }
    },
    created(){
      this.writeActiveData();
    },
    watch:{
      tags: 'writeActiveData',
      value( arr ){
        this.local.tags=arr.slice().map( n=>n.trim());
      }
    }
  }
</script>
<template lang="pug">
  .tags-input
    .control( :class="controlClass" )
      .input.field.is-grouped.is-grouped-multiline.faux-input(
        @click="onClick"
        :class="[ classList, {'is-focused': hasFocus }]")
        .control( v-for="tag in local.tags")
          .tags.has-addons
            span.tag.is-primary {{tag}}
            a.tag.is-delete.is-dark( @click.stop.prevent="deleteTag( tag )" )
        input.input.is-small.tag-input( v-model="local.tag"
          ref="input"
          @focus="onFocus"
          @blur="onBlur"
          :placeholder="placeholder"
          @keydown.enter="onSubmit" )
      vue-icon( v-for="( icon, i ) in allIcons"
        :key="i"
        :is-right="icon.right"
        :is-left="!(icon.right)"
        :is-small="icon.isSmall"
        :is-medium="icon.isMedium"
        :is-large="icon.isLarge") {{icon.fa}}

</template>

<style lang="scss">
  .tag-input{
    width: 100px;
    padding-left: 2px!important;
    &, &:focus, &:active{
      border: none!important;
      box-shadow: none!important;
    }
  }
  .tags-input{
    .tag{
      margin: 0!important;
    }
    .tags{
      margin: 0 .2em 0 0!important;
    }
    .faux-input{
      height: auto!important;
    }
    .control{
      margin: .1em 0!important;
    }
  }
</style>
