<template>
  <!-- BEGIN Q-PAGE -->
  <q-page>
    <!-- Content -->
    <div style="background: red; width: 50px; height: 50px;" />
  </q-page>
  <!-- END Q-PAGE -->
</template>

<script>
import { date } from 'quasar'
// import WisibiDialogNew from 'components/WisibiDialogNew'

export default {
  components: {
    // WisibiDialogNew
  },
  data: () => ({
    prized_keys_json: undefined,
    error: []
  }),
  computed: {
  },
  mounted () {
    const app = this
    app.load(prized_keys_json)
  },
  methods: {
    load () {
      const app = this
      app.getPrizedKeysJson()
      app.log()
    },
    async getPrizedKeysJson () {
      const app = this
      if (app.prized_keys_json === undefined) {
        await app.$axios.get('/results').then(res => {
          let keys_array = res.data
          let prized_keys_json = { list_array: [] }
          let year_filler = '2000'
          //  Loop 'keys_array'
          for (let a = 0; a < (keys_array.length); a++) {
            let key = keys_array[a]
            let draw = key.draw
            let day = key.day
            let date = key.date
            if (date.indexOf('/') === -1) {
              // date = (date.substr(6, 2)) + '/' + (date.substr(4, 2)) + '/' + (date.substr(0, 4))
              date = (date.substr(0, 4) + '/' + (date.substr(4, 2)) + '/' + date.substr(6, 2))
              console.log(date)
            } else {
              date = (date.split('/')[2] + '/' + date.split('/')[1] + '/' + date.split('/')[0])
            }
            let year = date.split('/')[0]
            if (year.length < 4) {
              year = year_filler.substr(0, (4 - (year.length))) + year
              date = date.substr(0, (date.lastIndexOf('/'))) + '/' + year
            }
            let numbers = []
            let stars = []
            //  Transform arrays from string to integer ('numbers' & 'stars')
            for (let b = 0; b < (4 + 1); b++) {
              numbers[b] = parseInt(key['ball_' + (b + 1)])
            }
            for (let b = 0; b < (1 + 1); b++) {
              stars[b] = parseInt(key['star_' + (b + 1)])
            }
            //  Creates Year
            if (prized_keys_json[year] === undefined) {
              prized_keys_json[year] = {
                'list_array': []
              }
              let year_list_array = prized_keys_json.list_array
              // app.log('year_list_array')
              // app.log(year_list_array)
              year_list_array[year_list_array.length] = year
              //  Sort 'year_list_array'
              prized_keys_json.list_array = app.GF_Sort_Array(year_list_array, '<')
            }
            //  Creates Draw
            if (prized_keys_json[year][draw] === undefined) {
              prized_keys_json[year][draw] = {
                'details': {
                  'week_day': day,
                  'date': date
                },
                'numbers': numbers,
                'stars': stars
              }
              let draw_list_array = prized_keys_json[year].list_array
              draw_list_array[draw_list_array.length] = draw
              //  Sort 'draw_list_array'
              prized_keys_json[year].list_array = app.GF_Sort_Array(draw_list_array, '<')
            }
          }
          app.prized_keys_json = prized_keys_json
        })
      }
    },
    //  *-------------------*
    //  | General Functions |
    //  *-------------------*
    GF_Check_If_Array (gf_variable) { //  Checks if 'gf_variable' is an array
      //  gf_variable === Variable that will be checked
      return Array.isArray(gf_variable)
    },
    GF_Check_If_Date (gf_variable) { // Checks if 'gf_variable' is a date
      //  gf_variable === Variable that will be checked
      return date.isValid(gf_variable)
    },
    GF_Check_Var_Type (gf_variable) { //  Returns what type of variable is 'gf_variable'
      //  gf_variable === Variable that will be checked
      const app = this
      let gf_variable_type = typeof gf_variable
      if (gf_variable_type === 'object') {
        if (app.GF_Check_If_Array(gf_variable)) { gf_variable_type = 'array' } else { gf_variable_type = 'json' }
      }
      return gf_variable_type
    },
    //  Sorts an array
    GF_Sort_Array (gf_array, gf_type) {
      //  gf_array === Array that will be sorted
      //  gf_type === '<' (ascending) || '>' (descending)
      const app = this
      //  If 'gf_array' is an actual array
      if (app.GF_Check_If_Array(gf_array)) {
        //  If the 'gf_array' length is bigger than 1
        if (gf_array.length > 1) {
          if (app.GF_Check_Var_Type(gf_array[0]) === 'string') { // Checks if the contents of the 'gf_array' are strings
            //  Checks 'gf_type'
            if (gf_type === '<' || gf_type === undefined) {
              gf_array.sort() //  (<) (string)
            } else if (gf_type === '>') {
              gf_array.sort()
              gf_array.reverse() //  (>) (string)
            } else {
              //  ERROR
              app.error[app.error.length] = 'GF_Sort_Array (gf_type === ' + gf_type + ');'
            }
          } else if (app.GF_Check_Var_Type(gf_array[0]) === 'number') { //  Checks if the contents of the 'gf_array' are numbers
            //  Checks 'gf_type'
            if (gf_type === '<' || gf_type === undefined) {
              gf_array.sort(function (a, b) { return a - b }) //  (<) (number)
            } else if (gf_type === '>') {
              gf_array.sort(function (a, b) { return b - a }) //  (>) (number)
            } else {
              //  ERROR
              app.error[app.error.length] = 'GF_Sort_Array (gf_type === ' + gf_type + ');'
            }
          }
        }
      } else {
        //  ERROR
        app.error[app.error.length] = 'GF_Sort_Array (Not an array);'
      }
      return gf_array
    },
    //  *---------*
    //  | General |
    //  *---------*
    log (value) {
      if (value === 'this') {
        console.log('this')
        console.log(this)
      } else {
        console.log(value)
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
