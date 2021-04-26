<template>
  <q-layout view="lHr LpR lFr">
    <q-header bordered class="bg-cyan-10 text-white" height-hint="98">
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

      <q-tabs
        v-model="tab"
        align="left"
        dense
      >
        <q-tab
          v-for="(t, index) in tabs"
          :key="index"
          :name="t.id"
          :label="t.label"
          :icon="t.icon"
          :disable="!loaded.api && !loaded.stats"
        />
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
          <q-tab-panel
            v-for="(t, index) in table_panels"
            :key="index"
            :name="t.id"
            class="fit q-pa-none"
          >
            <q-table
              :title="t.label"
              class="q-px-sm absolute hero-table fit even-odd sticky-first-child column no-wrap"
              :table-class="(!$q.screen.xs ? 'col' : '')"
              :data="TABLE_DATA"
              :columns="TABLE_COLUMNS"
              :pagination.sync="table[tab + '_pagination']"
              :rows-per-page-options="[0]"
              :filter="table.filter"
              row-key="id"
              color="amber"
              :loading="!loaded.api && !loaded.stats"
              dense virtual-scroll
            >
              <template v-slot:top-right>
                <q-input v-model="table.filter" borderless dense debounce="300" placeholder="Search">
                  <q-icon slot="append" name="search" />
                </q-input>
              </template>
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    class="cursor-pointer"
                    :class="{ 'selected-column' : table.selected_column === col.name }"
                    @click="table.selected_column === col.name ? table.selected_column = '' : table.selected_column = col.name"
                  >
                    <div class="row no-wrap justify-between items-center">
                      {{ getHeaderLabel(col) }}
                      <q-icon
                        v-if="col.heroSortable"
                        class="sortBy"
                        :class="table[tab + '_pagination'].sortBy === col.name ? 'sorted-column' : ''"
                        :name="table[tab + '_pagination'].sortBy === col.name ? (table[tab + '_pagination'].descending ? 'fas fa-sort-down' : 'fas fa-sort-up' ) : 'fas fa-sort'"
                        @click.stop="table[tab + '_pagination'].sortBy === col.name ? table[tab + '_pagination'].descending = !table[tab + '_pagination'].descending : (table[tab + '_pagination'].sortBy = col.name, table[tab + '_pagination'].descending = false)"
                      />
                    </div>
                    <!-- <hero-popup-filter-table-column
                      :data="table[tab + '_data']"
                      :column="col.name"
                      :columns.sync="table[tab + '_columns']"
                      :descending="table[ tab + '_pagination'].descending"
                      :sort-by="table[ tab + '_pagination'].sortBy"
                      @hide="table.selected_column = ''"
                    /> -->
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body-cell="props">
                <q-td
                  :props="props"
                >
                  <q-badge
                    color="transparent"
                    text-color="black"
                    :label="props.value"
                  />
                  <!-- {{ props.col.format }} -->
                  <!-- {{ props.value }} -->
                  <!-- {{ getCellValue(props) }} -->
                </q-td>
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

    <q-footer elevated class="bg-cyan-10 text-white">
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
// import HeroPopupFilterTableColumn from 'components/Popups/HeroPopupFilterTableColumn'

export default {
  components: {
    // HeroPopupFilterTableColumn
  },
  data: () => ({
    loaded: {
      api: false,
      stats: false
    },
    date_format: 'YYYY/MM/DD',
    left_drawer: false,
    right_drawer: false,
    tab: 'drafts',
    tabs: {
      drafts: { id: 'drafts', label: 'Drafts', icon: 'fas fa-tags' },
      numbers: { id: 'numbers', label: 'Numbers', icon: 'fas fa-hashtag' },
      stars: { id: 'stars', label: 'Stars', icon: 'far fa-star' },
      tab_2: { id: 'tab_2', label: 'Tab_2', icon: '' },
      tab_3: { id: 'tab_3', label: 'Tabs_3', icon: '' }
    },
    table_panels: {
      drafts: { id: 'drafts', label: 'Drafts' },
      numbers: { id: 'numbers', label: 'Numbers' },
      stars: { id: 'stars', label: 'Stars' }
    },
    table: {
      selected_column: '',
      filter: '',
      //  Drafts
      drafts_data: [],
      drafts_columns: [
        { name: 'id', required: true, label: '# Draft', field: 'id', heroSortable: true },
        { name: 'draw', required: true, label: 'Draw', field: 'draw', heroSortable: true },
        { name: 'date', required: true, label: 'Date', field: 'date', type: 'date', heroSortable: true },
        { name: 'week_day', required: true, label: 'Week Day', field: 'week_day', heroSortable: true },
        {
          name: 'result',
          required: true,
          label: 'Result',
          field: (row) => { let numbers = [...row.numbers]; let stars = [...row.stars]; return { numbers, stars } },
          format: val => { return (val.numbers.sort()).join(' ') + ' + ' + (val.stars.sort()).join(' ') },
          heroSortable: false
        },
        {
          name: 'result__exit_order',
          required: true,
          label: 'Result (Exit Order)',
          field: (row) => { let numbers = [...row.numbers]; let stars = [...row.stars]; return { numbers, stars } },
          format: val => { return val.numbers.join(' ') + ' + ' + val.stars.join(' ') },
          heroSortable: false
        }
      ],
      drafts_pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 0,
        page: 1
      },
      //  Numbers
      numbers_data: [
        { id: 'details', max_draw: 5, total_length: 50 },
        { id: 1, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 2, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 3, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 4, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 5, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 6, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 7, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 8, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 9, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 10, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 11, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 12, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 13, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 14, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 15, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 16, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 17, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 18, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 19, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 20, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 21, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 22, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 23, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 24, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 25, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 26, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 27, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 28, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 29, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 30, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 31, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 32, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 33, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 34, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 35, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 36, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 37, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 38, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 39, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 40, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 41, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 42, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 43, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 44, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 45, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 46, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 47, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 48, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 49, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] },
        { id: 50, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0, synergy_numbers: [], synergy_stars: [] }
      ],
      numbers_columns: [
        { name: 'id', required: true, label: '# Number', field: 'id', heroSortable: true },
        { name: 'creation_date', required: true, label: 'Added', type: 'date', field: 'creation_date', heroSortable: true },
        { name: 'exits', required: true, label: 'Exits', field: 'exits', heroSortable: true },
        { name: 'exits_percentage', required: true, label: 'Exits %', field: 'exits_percentage', heroSortable: true },
        { name: 'last_draw', required: true, label: 'Last Draw', field: 'last_draw', heroSortable: true },
        { name: 'draw_date', required: true, label: 'Last Draw Date', type: 'date', field: 'draw_date', heroSortable: true },
        { name: 'absences', required: true, label: 'Absences', field: 'absences', heroSortable: true }
      ],
      numbers_pagination: {
        sortBy: 'id',
        descending: false,
        rowsPerPage: 0,
        page: 1
      },
      //  Stars
      stars_data: [
        { id: 'details', max_draw: 2, total_length: 12 },
        { id: 1, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 2, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 3, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 4, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 5, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 6, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 7, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 8, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 9, creation_date: '2004/02/13', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 10, creation_date: '2011/05/10', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 11, creation_date: '2011/05/10', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 },
        { id: 12, creation_date: '2016/09/24', exits: 0, exits_percentage: 0, last_draw: 'N/A', draw_date: 'N/A', absences: 0, existence_counter: 0 }
      ],
      stars_columns: [
        { name: 'id', required: true, label: '# Star', field: 'id', heroSortable: true },
        { name: 'creation_date', required: true, label: 'Added', type: 'date', field: 'creation_date', heroSortable: true },
        { name: 'exits', required: true, label: 'Exits', field: 'exits', heroSortable: true },
        { name: 'exits_percentage', required: true, label: 'Exits %', field: 'exits_percentage', heroSortable: true },
        { name: 'last_draw', required: true, label: 'Last Draw', field: 'last_draw', heroSortable: true },
        { name: 'draw_date', required: true, label: 'Last Draw Date', type: 'date', field: 'draw_date', heroSortable: true },
        { name: 'absences', required: true, label: 'Absences', field: 'absences', heroSortable: true }
      ],
      stars_pagination: {
        sortBy: 'id',
        descending: false,
        rowsPerPage: 0,
        page: 1
      }
    },
    error: []
  }),
  computed: {
    // LOADED () {
    //   const app = this
    //   let loaded = (app.loaded.api && app.loaded.stats)
    //   app.log(app.loaded.api && app.loaded.stats)
    //   return loaded
    // },
    TABLE_DATA () {
      const app = this
      let selected = app.tab + '_data'
      let data = []
      if (app.table[selected]) {
        if (selected === 'numbers_data' || selected === 'stars_data') {
          data = app.table[selected].filter(v => v.id !== 'details')
        } else {
          data = [...app.table[selected]]
        }
      }
      return data
    },
    TABLE_COLUMNS () {
      const app = this
      let selected = app.tab + '_columns'
      let columns = []
      if (app.table[selected]) {
        columns = app.table[selected]
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
        // if (app.tab === 'drafts') {

        // }
      }
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
      await app.$axios.get('/results').then(res => {
        app.table.drafts_data = res.data
        app.loaded.api = true
        app.getStats()
      })
    },
    getStats () {
      const app = this
      let type_list = ['numbers', 'stars']
      let drafts = [...app.table.drafts_data]
      // let creation_dates = [
      //   '2004/02/13': 0
      // ]
      drafts = drafts.sort((a, b) => a.id - b.id)
      drafts.forEach((draft) => {
        type_list.forEach((type) => {
          // if (draft.date <= '2020/03/06') {
          app.table[type + '_data'].forEach((i, type_index) => {
            if (type_index > 0 && i.creation_date <= draft.date) {
              i.absences += 1
              i.existence_counter += 1
            }
          })
          draft[type].forEach((i) => {
            if (app.table[type + '_data'][i].creation_date <= draft.date) {
              app.table[type + '_data'][i].exits += 1
              app.table[type + '_data'][i].last_draw = draft.id
              app.table[type + '_data'][i].draw_date = draft.date
              app.table[type + '_data'][i].absences = 0
            }
          })
          app.table[type + '_data'].forEach((i, type_index) => {
            if (type_index > 0 && i.creation_date <= draft.date) {
              i.exits_percentage = Math.round(((i.exits * 100) / (i.existence_counter)) * 100) / 100
            }
          })
          // }
        })
      })
      // for (let d = 0; d < drafts.length; d++) {
      //   let draft_date = drafts[d].date
      //   for (let t = 0; t < type_list.length; t++) {
      //     let type = type_list[t]
      //     let draft_type_array = drafts[d][type]
      //     for (let )
      //     table[type + '_data'][]
      //     // app.log(data[i].id)
      //   }
      // }
      app.log(drafts)
      app.loaded.stats = true
    },
    getHeaderLabel (col) {
      const app = this
      if (col.type === 'date') {
        return col.label + ' (' + app.date_format + ')'
      } else {
        return col.label
      }
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
