<template>
  <q-item clickable tag="a" @click="goTo(direct, link)">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },
    direct: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();

    function goTo(r, l) {
      if (r === "" && l === "#") return;
      if (r !== "") {
        router.push(r);
        return;
      }
      if (l !== "#") {
        window.open(l);
      }
    }
    return { goTo };
  },
});
</script>
