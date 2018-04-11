<script>
  import moment from "moment";
  import TextInput from "./input.vue";
  import { bulma, colors, styles, states, sizes } from "Mixins";
  import { range } from "lodash";

  export default{
    name: 'vueTagspicker',
    mixins:[ bulma, colors, styles, states, sizes ],
    baseClass: 'datepicker',
    props: {
      placeholder: String,
      name: String,
      icon: String,
      iconsLeft: [ String, Array ],
      iconsRight: [ String, Array ],
      // isPrimary: Boolean,
      value:{}
    },
    data(){

      return {
        active:{
          month: 0,
          year: 2000,
          day: 1
        },
        // activeMonth:0,
        // activeYear:2014,
        // activeDay: 1,
        dayNames: moment.weekdaysShort() ,
        textInputValue: '',
        datepickerVisible: this.hideInput,
        timer: 0
      };
    },
    components:{
      TextInput
    },
    computed:{
      activeFirst(){// first of the current month
        return moment({ year: this.active.year, month: this.active.month, date: 1})
      },
      activeStart(){// the first day on the visible calendar ( into last month )
        let m=moment( this.activeFirst );
        m.subtract( m.weekday(), 'days');
        return m;
      },
      activeEnd(){// last day on the visible calendar
        let m=moment( this.activeLast );
        m.add( 6 - m.weekday(), 'days' );
        return m;
      },
      activeLast(){
        let month=this.active.month+1;
        let year=this.active.year;
        if( month > 11 ){
          month=0;
          year=year+1;
        }
        return moment({ year, month, date: 1 });
      },
      activeRange(){// an array of moments representing the visible calenadr month
        let m=moment( this.activeStart );
        let end=moment( this.activeEnd );
        let arr=[];
        while( true ){
          arr.push( moment( m ));
          if( m.isBefore( end )){
            m.add( 1, "days" );
          }
          else break;
        }
        return arr;
      },
      activeCalendarRows(){
        let count=Math.ceil( this.activeRange.length / 7 );
        let { month, year, day }=this.active;
        return range( count ).map( num=>{
          return range( 7 ).map( i=>{
            let m=this.activeRange[ 7 * num + i ];
            let date=m.date();
            let current=m.month()===month;
            let active=current && ( m.year()===year && date===day );
            return {
              m,// moment instance
              date,
              current,
              active

            }
          });
        })
      },
      activeMonthName(){
        return moment.months()[ this.active.month ];
      },
      textValue(){
        return this.formatValue( this.value );
      }
    },
    methods:{
      formatValue( value ){
        if( moment.isMoment( value )) return value.format( this.format );
        return value;
      },
      hideDatepicker(){
        if( !this.hideInput ) this.datepickerVisible=false;
      },
      inputFocus( e ){
        e.target.select();
        this.datepickerVisible=true;
        console.log( 'focus')
      },
      inputBlur( e ){
        clearTimeout( this.timer );
        this.timer=setTimeout(()=>{
          clearTimeout( this.timer );
          this.hideDatepicker();
        }, 200 );
      },
      isActive( m ){
        return moment({
          year: this.active.year,
          month: this.active.month,
          date: this.active.day
        }).isSame( m, "day" );
      },
      isToday( m ){
        return moment().isSame( m, "day" );
      },
      selectMoment( m ){// user has selected `day` of active.month/active.year
        let dateString=this.formatValue( m );
        this.$emit('input', moment.isMoment( this.value ) ? m : dateString );
        this.textInputValue=dateString;
        this.hideDatepicker();
      },
      jumpMonth( month ){
        let year=this.active.year;
        if( month < 0 ){
          month=11;
          year--;
        }
        else if( month > 11 ){
          month=0;
          year++;
        }
        this.active.month=month;
        this.active.year=year;
      },
      writeActiveData(){
        let m=this.value ? ( moment.isMoment( this.value ) ? this.value : moment( this.value, this.format ) ) : moment();
        this.active.month=m.month();
        this.active.year=m.year();
        this.active.day=m.date();
        if( this.value ){
          this.textInputValue=this.textValue;
        }
      }
    },
    created(){
      this.writeActiveData();
    },
    watch:{
      value: 'writeActiveData'
    }
  }
</script>
<template>
  <div class="tags-control">
    <text-input
      :value="textInputValue"
      @focus="inputFocus"
      :icon="icon"
      :icons-left="iconsLeft"
      :icons-right="iconsRight"
      :is-primary="isPrimary"
      :is-info="isInfo"
      :is-danger="isDanger"
      :is-warning="isPrimary"
      :is-success="isInfo"
      :is-small="isSmall"
      :is-normal="isNormal"
      :is-medium="isMedium"
      :is-large="isLarge"
      :is-hovered="isHovered"
      :is-focused="isFocused"
      :is-loading="isLoading"
      :is-rounded="isRounded"
      :placeholder="placeholder">
    </text-input>
    <div class="dp-popup" :class="{ 'is-popup': !hideInput }" v-show="datepickerVisible" @mouseup.stop="">
      <div class="dp-calendar">
        <div class="dp-nav hero is-primary">
          <div class="hero-head">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <vb-button is-primary is-small @click="jumpMonth( active.month - 1 )" icon="chevron-left">
                  </vb-button>
                </div>
              </div>
              <div class="level-item">
                <span class="title is-6">{{activeMonthName}} {{active.year}}</span>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <vb-button is-primary is-small @click="jumpMonth( active.month + 1 )" icon="chevron-right">
                  </vb-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dp-rows">
          <div class="dp-row dp-daynames">
            <div class="dp-dayname" v-for="name in dayNames">
              {{name}}
            </div>
          </div>
          <div class="dp-row" v-for="row in activeCalendarRows">
            <div class="dp-day"
              v-for="obj in row"
              v-if="obj"
              :class="{ 'is-current': obj.current, 'is-today': isToday( obj.m ), 'is-active': isActive( obj.m ) }"
              @click="selectMoment( obj.m )">
              <div class="dp-date">{{obj.date}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
