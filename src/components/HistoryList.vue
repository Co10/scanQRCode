<template>
  <q-list bordered>
    <q-slide-item
      @right="onRight($event, it.id)"
      right-color="red"
      v-for="it in list"
      :key="it.id"
    >
      <template v-slot:right>
        <div class="row items-center">Delete<q-icon right name="delete" /></div>
      </template>

      <q-item clickable v-ripple>
        <q-item-section @click="openUrl(it)">
          <q-item-label lines="2">{{ it.value }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon
            name="content_copy"
            color="green"
            @click="copyText(it.value)"
          />
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { onBeforeUnmount } from "vue";

export default {
  name: "HistoryList",
  props: ["list", "temp"],
  setup(props) {
    const $q = useQuasar();
    const store = useStore();

    function copyText(a) {
      navigator.clipboard.writeText(a);
      $q.notify("Copied!");
    }
    function openUrl(a) {
      if (a.type === "url") {
        window.open(a.value);
      }
    }

    let timer;

    function finalize(reset) {
      timer = setTimeout(() => {
        reset();
      }, 1000);
    }

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    function onRight({ reset }, id) {
      $q.notify("Removed");
      finalize(() => {
        reset();
        store.dispatch("scan/removeItem", { id, temp: props.temp });
      });
    }
    return { copyText, openUrl, onRight };
  },
};
</script>