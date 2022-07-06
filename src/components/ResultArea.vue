<template>
  <q-card class="result-card" ref="cheight">
    <HistoryList class="result-list" :list="list" :temp="true" />
  </q-card>
</template>

<script>
import { reactive, watchEffect, ref, nextTick } from "vue";
import { useStore } from "vuex";

import HistoryList from "components/HistoryList.vue";

export default {
  name: "ResultArea",
  components: { HistoryList },
  setup() {
    const store = useStore();
    const list = reactive([]);

    let cheight = ref(null);

    watchEffect(() => {
      list.length = 0;
      Object.assign(list, store.state.scan.currentResult);
      nextTick(() => {
        let th = 0;
        if (cheight.value !== null) {
          th = cheight.value.$el.clientHeight;
        }
        store.dispatch("scan/listHeight", th);
      });
    });

    return { list, cheight };
  },
};
</script>

<style>
.result-card {
  position: fixed;
  bottom: 0;
  z-index: 6;
  max-height: 40vh;
  width: min(100vw, 600px);
  overflow-y: auto;
}
.result-list {
  width: 100%;
}
</style>