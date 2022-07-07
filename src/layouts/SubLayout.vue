<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"
          @click="goBack"
        />

        <q-toolbar-title>{{ title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "SubLayout",
  setup() {
    const store = useStore();
    const router = useRouter();

    let title = ref("");
    watchEffect(() => {
      title.value = store.state.router.subtitle;
    });

    function goBack() {
      router.back();
    }

    return {
      title,
      goBack,
    };
  },
});
</script>
