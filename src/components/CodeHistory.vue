<template>
  <q-card class="history-card">
    <q-card-section horizontal class="justify-between">
      <q-card-section>
        <div class="text-h6">History</div>
        <div class="text-caption text-grey" v-if="list.length > 0">
          Swipe left to remove an entry.
        </div>
      </q-card-section>
      <q-card-section v-show="list.length > 0">
        <q-btn
          round
          color="negative"
          icon="clear_all"
          @click="confirm = true"
        />
      </q-card-section>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section v-if="list.length <= 0">Empty</q-card-section>
    <HistoryList v-else :list="list" />
    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_sweep" color="red" text-color="white" />
          <span class="q-ml-md text-body1">Clear All?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="blue-grey-6" v-close-popup />
          <q-btn
            flat
            label="Confirm"
            color="deep-orange-8"
            v-close-popup
            @click="clearHistory"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import ch from "./codeHistory";
import HistoryList from "components/HistoryList.vue";

import { watchEffect, reactive, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "CodeHistory",
  components: { HistoryList },
  setup() {
    const store = useStore();

    let confirm = ref(false);

    let list = reactive(ch.get());

    let lastRemove = 0;
    watchEffect(() => {
      if (store.state.scan.removeID !== lastRemove) {
        lastRemove = store.state.scan.removeID;
        list.length = 0;
        Object.assign(list, ch.get());
      }
    });

    function clearHistory() {
      store.dispatch("scan/clearHistory", 1);
    }

    return { list, confirm, clearHistory };
  },
};
</script>

<style>
.history-card {
  max-width: 98vw;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 60vh;
}
</style>