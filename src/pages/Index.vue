<template>
  <q-layout view="lHr LpR lFr">
    <q-header bordered class="bg-green-5 text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left_drawer = !left_drawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar> -->
          Heromillions
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right_drawer = !right_drawer" />
      </q-toolbar>

      <q-tabs align="left" dense>
        <q-tab icon="fas fa-tags" :disable="!loaded || table.loading" @click="tab = 'table'; table.selected = 'drafts'" />
        <q-tab icon="fas fa-hashtag" :disable="!loaded || table.loading" @click="tab = 'table'; table.selected = 'numbers'" />
        <q-tab icon="far fa-star" :disable="!loaded || table.loading" @click="tab = 'table'; table.selected = 'stars'" />
        <q-tab label="Tab_2" :disable="!loaded || table.loading" @click="tab = 'tab_2'" />
        <q-tab label="Tab_3" :disable="!loaded || table.loading" @click="tab = 'tab_3'" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="left_drawer" behavior="mobile" side="left" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer v-model="right_drawer" behavior="mobile" side="right" overlay elevated>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page class="fit">
        <!-- <q-page :class="{'fit' : $q.platform.is.desktop}"> -->
        <!-- <div class="absolute fit" /> -->
        <q-tab-panels v-model="tab" class="absolute fit bg-blue-1" animated>
          <q-tab-panel name="table" class="fit q-pa-none">
            <q-table
              :title="table.selected.charAt(0).toUpperCase() + table.selected.slice(1)"
              class="bg-green-1 q-px-sm absolute hero-table fit even-odd sticky-first-child column no-wrap"
              :table-class="(!$q.screen.xs ? 'col' : '')"
              :data="TABLE_DATA"
              :columns="TABLE_COLUMNS"
              :pagination.sync="table.pagination"
              :rows-per-page-options="[0]"
              row-key="id"
              color="amber"
              :loading="(!loaded || table.loading)"
              dense virtual-scroll
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="cursor-pointer"
                  >
                    {{ col.label + (col.type === 'date' ? ' (' + date_format + ')' : '') }}
                    <hero-popup-filter-table-column />
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:loading>
                <q-inner-loading
                  showing
                  color="primary"
                />
              </template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="tab_2" class="">
            <div class="text-h6">
              Alarms
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="tab_3">
            <div class="text-h6">
              Movies
            </div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Footer
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
// import { date } from 'quasar'
import HeroPopupFilterTableColumn from 'components/Popups/HeroPopupFilterTableColumn'

export default {
  components: {
    HeroPopupFilterTableColumn
  },
  data: () => ({
    loaded: false,
    date_format: 'YYYY/MM/DD',
    left_drawer: false,
    right_drawer: false,
    tab: 'table',
    table: {
      loading: true,
      selected: 'drafts',
      pagination: {
        sortBy: '',
        descending: true,
        rowsPerPage: 0
      },
      drafts_data: [],
      drafts_columns: [
        { name: 'id', required: true, label: '# Draft', field: 'id' },
        { name: 'draw', required: true, label: 'Draw', field: 'draw' },
        { name: 'date', required: true, label: 'Date', field: 'date', type: 'date' },
        { name: 'week_day', required: true, label: 'Week Day', field: 'week_day' },
        { name: 'number_#1', visible: true, label: 'Number #1', field: 'numbers', format: val => val[0] },
        { name: 'number_#2', visible: true, label: 'Number #2', field: 'numbers', format: val => val[1] },
        { name: 'number_#3', visible: true, label: 'Number #3', field: 'numbers', format: val => val[2] },
        { name: 'number_#4', visible: true, label: 'Number #4', field: 'numbers', format: val => val[3] },
        { name: 'number_#5', visible: true, label: 'Number #5', field: 'numbers', format: val => val[4] },
        { name: 'star_#1', visible: true, label: 'Star #1', field: 'stars', format: val => val[0] },
        { name: 'star_#2', visible: true, label: 'Star #2', field: 'stars', format: val => val[1] }
      ],
      numbers_data: [],
      numbers_columns: [
        { name: 'id', required: true, label: '# Number', field: 'id' }
      ],
      stars_data: [],
      stars_columns: [
        { name: 'id', required: true, label: '# Star', field: 'id' }
      ]
    },
    error: []
  }),
  computed: {
    TABLE_DATA () {
      const app = this
      return app.table[app.table.selected + '_data']
    },
    TABLE_COLUMNS () {
      const app = this
      let selected = app.table.selected + '_columns'
      let columns = app.table[selected]
      columns = columns.filter(v => v.required || v.visible)
      columns.forEach((column) => {
        if (column.type === 'date') {
          // if (column.label.indexOf(app.date_format) < 0) {
          //   column.label = column.label + ' (' + app.date_format + ')'
          // // column.format = val => date.formatDate(val, app.DATE_FORMAT)
          // }
        }

        column.align = 'left'
      })
      // if (app.table.selected === 'drafts') {

      // }
      return columns
    }
  },
  mounted () {
    const app = this
    app.load()
  },
  methods: {
    async load () {
      const app = this
      app.table.loading = true
      await app.$axios.get('/results').then(res => {
        app.table.drafts_data = res.data
      })
      app.loaded = true
      app.table.loading = false
    },
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
