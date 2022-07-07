<template>
  <ScanArea :scanHeight="scanHeight" />
  <ResultArea />
  <q-dialog v-model="fs.show">
    <q-card>
      <q-card-section>
        <div class="text-h6">Results</div>
      </q-card-section>
      <q-card-section>
        <FileResult :results="fs.results" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watchEffect, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import ScanArea from "components/ScanArea.vue";
import ResultArea from "components/ResultArea.vue";
import FileResult from "components/FileResult.vue";

export default defineComponent({
  name: "ScanPage",
  components: { ScanArea, ResultArea, FileResult },
  setup() {
    const store = useStore();
    let fs = reactive({
      show: false,
      results: null,
    });

    onMounted(() => {
      watchEffect(() => {
        watchHeight();
        fs.results = store.state.scan.newImgs;
        if (fs.results !== null) {
          fs.show = true;
        } else {
          fs.show = false;
        }
      });
    });
    let scanHeight = ref(window.innerHeight);

    function watchHeight() {
      let rh = store.state.scan.resultHeight;
      let wh = window.innerHeight;
      let d = rh / wh;
      if (d < 0.2) scanHeight.value = wh;
      else if (d >= 0.2 && d < 0.3) scanHeight.value = wh * 0.9;
      else if (d >= 0.3 && d < 0.35) scanHeight.value = wh * 0.8;
      else if (d >= 0.35 && d < 0.42) scanHeight.value = wh * 0.75;
      else if (d >= 0.42 && d < 0.5) scanHeight.value = wh * 0.68;
      else if (d >= 0.5 && d < 0.56) scanHeight.value = wh * 0.6;
      else scanHeight.value = wh;
    }

    return { scanHeight, fs };
  },
});
</script>

<style>
</style>