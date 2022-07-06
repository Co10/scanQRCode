<template>
  <ScanArea :scanHeight="scanHeight" />
  <ResultArea />
</template>

<script>
import { defineComponent, ref, watchEffect, onMounted } from "vue";
import { useStore } from "vuex";
import ScanArea from "../components/ScanArea.vue";
import ResultArea from "../components/ResultArea.vue";

export default defineComponent({
  name: "ScanPage",
  components: { ScanArea, ResultArea },
  setup() {
    const store = useStore();

    onMounted(() => {
      watchEffect(() => {
        watchHeight();
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

    return { scanHeight };
  },
});
</script>

<style>
</style>