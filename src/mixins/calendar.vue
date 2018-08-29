<script>
  import moment from "moment";
  import { range } from "lodash";

  let M=moment();
  export default{
    name: 'vb-calendar',
    // modifiers:['colors','sizes','states','styles' ],
    // baseClass: 'datepicker',
    props: {
      month: { type: Number, default: M.month()},
      day: { type: Number, default: M.day() },
      year: { type: Number, default: M.year() },
      // format:{ type: String, default: 'MMMM DD, YYYY'},
      // hideInput:{ type: Boolean, default: false }, // true and the calendar is always visible
      // placeholder: String,
      // icon: String,
      // iconsLeft: [ String, Array ],
      // iconsRight: [ String, Array ]
    },
    data(){
      let monthNames=moment.months();
      return {
        active:{
          month: this.month,
          year: this.year,
          day: this.day
        },
        dayNames: moment.weekdaysShort() ,
        monthNames,
        monthOptions: monthNames.map(( text, value )=>({ text, value })),
        timer: 0
      };
    },
    components:{
      // TextInput
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
        console.log( 'active last', month, year)
        return moment({ year, month, date: 1 });
      },
      activeRange(){// an array of moments representing the visible calendar month
        let m=moment( this.activeStart );
        let end=moment( this.activeEnd );
        console.log( 'active range', m.format( 'MMMM DD, YYYY'), '-', end.format('MMMM DD, YYYY'))
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
            if( !m ){
              console.error( "FUKCIN PROBLEM", num, i, this.activeRange )
              return true;
            }
            let date=m.date();
            let current=m.month()===month;
            let active=this.isToday( m );
            return {
              m,// moment instance
              date,
              current,
              active

            }
          });
        })
      },
      activeYear:{
        get(){
          return this.active.year;
        },
        set( year ){
          year=parseInt( year, 10 );
          this.activeYear=year;
        }
      },
      activeMonth:{
        get(){
          return this.active.month;
        },
        set( num ){
          let month=parseInt( num, 10 );
          if( month > 11 ){
            month=0;
            this.active.year++;
          }
          else if( month < 0 ){
            month=11;
            this.active.year--;
          }
          this.active.month=month;
        }
      },
      activeMonthName(){
        return moment.months()[ this.active.month ];
      },
    },
    methods:{
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
      }
    },
    created(){
    },
    watch:{
    }
  }
</script>
