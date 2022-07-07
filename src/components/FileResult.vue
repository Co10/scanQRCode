<template>
  <div>
    <template v-if="results !== null">
      <div class="row justify-between">
        <q-card
          v-for="(it, idx) in res.result"
          :key="it.id"
          class="m-img-w q-mb-sm"
        >
          <q-img :src="it.img">
            <div class="absolute-bottom" @click="openUrl(it.value)">
              <q-item-label lines="2" class="text-body2">{{
                it.value
              }}</q-item-label>
            </div>
          </q-img>
          <q-card-actions class="row justify-between">
            <q-btn flat @click="remove(it.id, idx)">Remove</q-btn>
            <q-btn flat @click="copyText(it.value)">Copy</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div v-if="res.noResult.length > 0">
        <div class="text-h6">Below Images has no result</div>
        <div class="row justify-between">
          <q-card
            v-for="it in res.noResult"
            :key="it.id"
            class="m-img-w q-mb-sm m-img-h"
          >
            <q-img :src="it.img"> </q-img>
          </q-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { defineComponent, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
export default defineComponent({
  props: ["results"],
  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    function readFile(file) {
      return new Promise((resolve) => {
        let fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.readAsDataURL(file);
      });
    }
    const noImg = "";
    let res = reactive({ result: [], noResult: [] });
    watchEffect(() => {
      if (props.results !== null && props.results.result) {
        res.result.length = 0;
        res.noResult.length = 0;
        props.results.result.forEach((i) => {
          let tmp = reactive({ img: noImg, ...i.result });
          readFile(i.file).then((a) => (tmp.img = a));
          res.result.push(tmp);
        });
        props.results.noResult.forEach((i, idx) => {
          let tmp = reactive({ id: idx, img: noImg });
          readFile(i).then((a) => (tmp.img = a));
          res.noResult.push(tmp);
        });
      }
    });

    function openUrl(a) {
      if (a.indexOf("http://") === 0 || a.indexOf("https://") === 0) {
        window.open(a);
      }
    }
    function copyText(a) {
      navigator.clipboard.writeText(a);
      $q.notify("Copied!");
    }
    function remove(id, idx) {
      res.result.splice(idx, 1);
      store.dispatch("scan/removeItem", { id });
    }
    return { res, openUrl, copyText, remove };
  },
});
</script>

<style>
.m-img-w {
  width: 155px;
}
.m-img-h {
  height: -webkit-fill-available;
}
</style>