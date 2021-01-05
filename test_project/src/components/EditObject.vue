<template>
  <div
      class="edit-modal"
      id="editModal"
  >
    <form
        class="edit-modal_form"
        @submit.prevent="onSubmit"
    >
      <span
          class="close"
          @click="func"
          id="closeComponent">
        &times;
      </span>
      <h3>
        Редактировать объект
      </h3>
      <br>
      <input
          type="text"
          v-model="name"
          placeholder="Название"
          required
      >
      <input
          type="number"
          min="0"
          v-model="factCount"
          placeholder="Фактическое количество"
          required
      >
      <br><br>
      <button type="submit">
        Редактировать
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: "EditObject",
  props: {
    id: Number,
    func: Function,
    depth: Number
  },
  data() {
    return {
      name: "",
      factCount: ""
    }
  },
  computed: {
    ...mapGetters(["divList"]),
    // Получение нужного объекта
    division() {
      if (this.depth === 0) {
        return this.divList.find(div => div.id === this.id);
      } else if (this.depth === 1) {
        let cityId = Math.round(this.id / 10); // Получить id города
        return this.divList.find(div => div.id === cityId);
      } else {
        let cityId = Math.round(this.id / 100); // Получить id города
        return this.divList.find(div => div.id === cityId);
      }
    }
  },
  methods: {
    ...mapActions(["updateDivision"]),
    async onSubmit() {
      if (this.depth === 0) {
        this.division.name = this.name;
        this.division.factCount = this.factCount;
      } else if (this.depth === 1) {
        this.division.children[this.id % 10 - 1].name = this.name;
        this.division.children[this.id % 10 - 1].factCount = this.factCount;
      } else {
        let controlIndex = Math.round(this.id % 100 / 10) - 1;
        this.division.children[controlIndex].children[this.id % 10 - 1].name = this.name;
        this.division.children[controlIndex].children[this.id % 10 - 1].factCount = this.factCount;
      }
      this.name = "";
      this.factCount = "";
      this.func();
      await this.updateDivision(this.division);
    }
  }
}
</script>