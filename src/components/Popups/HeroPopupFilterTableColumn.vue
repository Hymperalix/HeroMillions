<template>
  <!-- *!* change ref name -->
  <q-popup-proxy
    ref="popupXYZ"
    transition-show="scale"
    transition-hide="scale"
    @before-show="load();"
    @before-hide="$emit('hide')"
  >
    <div class="hero-popup relative-position bg-white">
      <div class="hero-popup__toolbar bg-primary row justify-between items-center z-top non-selectable">
        <div class="q-ml-sm col text-weight-bold text-white">
          {{ title }}
        </div>
        <div class="col-auto row no-wrap">
          <div
            v-if="columns.length"
            class="row no-wrap"
          >
            <q-icon
              v-if="columns.length > 1"
              class="q-ma-xs"
              :class="CHECK_LEFT ? 'disabled' : 'cursor-pointer'"
              size="sm"
              name="fas fa-caret-left"
              color="white"
              @click="columns.length > 1 ? reorderColumns('left') : ''"
            />
            <q-icon
              v-if="columns.length > 1"
              class="q-ma-xs"
              :class="CHECK_RIGHT ? 'disabled' : 'cursor-pointer'"
              size="sm"
              name="fas fa-caret-right"
              color="white"
              @click="columns.length > 1 ? reorderColumns('right') : ''"
            />
          </div>
          <q-separator
            color="white"
            vertical inset
          />
          <q-icon
            class="q-ma-xs"
            :class="main_options.length > 1 ? 'cursor-pointer' : 'disabled'"
            size="sm"
            :name="sortBy === column ? (descending ? 'fas fa-caret-down' : 'fas fa-caret-up') : 'fas fa-sort'"
            color="white"
            @click="main_options.length > 1 ? $emit('sort') : ''"
          />
          <q-separator
            color="white"
            vertical inset
          />
          <q-icon
            v-close-popup
            class="q-ma-xs col-auto cursor-pointer"
            size="sm"
            name="cancel"
            color="white"
          />
        </div>
      </div>
      <div class="q-mt-md q-px-md q-pb-md q-gutter-y-md relative-position">
        <div class="q-gutter-y-md relative-position">
          <!-- Content -->
        </div>
        <div class="row relative-position justify-end">
          <q-btn
            color="primary"
            label="OK"
            size="md"
            flat
            @click="ok()"
          />
        </div>
      </div>
    </div>
  </q-popup-proxy>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    column: {
      type: String,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    field: {
      type: String,
      required: true
    },
    descending: {
      type: Boolean,
      required: true
    },
    sortBy: {
      type: String,
      required: true
    }
  },
  data: () => ({
    main_options: []
  }),
  computed: {
    CHECK_LEFT () {
      const app = this
      return app.columns[0].name === app.column
    },
    CHECK_RIGHT () {
      const app = this
      let columns = [...app.columns]
      let check = true
      let i = columns.findIndex(j => j.name === app.column) + 1
      for (i; i < columns.length; i++) {
        if (columns[i].required || columns[i].visible) {
          check = false
          break
        }
      }
      return check
    }
  },
  methods: {
    load () {
      const app = this
      app.main_options = app.getColumnOptions()
    },
    reorderColumns (move) {
      const app = this
      app.log(move)
    },
    getColumnOptions () {
      const app = this
      if (app.options.length > 0) {
        return app.options.sort()
      }
      let data = [...app.data]
      let a = []
      data.forEach((item) => {
        if (app.type === 'check') {
          if (item[app.field] === true) {
            a.push('Checked')
          } else if (item[app.field] === false) {
            a.push('Unchecked')
          } else {
            a.push('Not Set')
          }
        } else if (item[app.field]) {
          if (app.type === 'date') {
            a.push(date.formatDate(item[app.field], 'YYYY/MM/DD'))
          } else if (app.type === 'total') {
            a.push(item[app.field].length)
          } else if (app.type === 'text') {
            a.push(item[app.field])
          }
        }
      })
      a = [...new Set(a)]
      a.sort()
      return a
    },
    ok () {
      const app = this
      app.log('ok')
    },
    hide () {
      this.$refs.popupXYZ.hide() // *!* change ref name
    },
    log (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="stylus">
</style>
