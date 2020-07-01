<template>
  <!-- *!* change ref name -->
  <q-popup-proxy
    ref="popupXYZ"
    transition-show="scale"
    transition-hide="scale"
    @before-show="load();"
  >
    <div class="hero-popup relative-position bg-white">
      <div class="hero-popup__toolbar row bg-primary justify-between items-center z-top non-selectable">
        <div class="q-ml-sm col text-weight-bold text-white ellipsis">
          {{ title }}
        </div>
        <q-icon
          v-close-popup
          class="q-ma-xs col-auto cursor-pointer"
          size="sm"
          name="cancel"
          color="white"
        />
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
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    load () {
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
