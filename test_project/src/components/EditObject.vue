<template>
  <div class="edit-modal" id="editModal">
    <form class="edit-modal_form" @submit.prevent="onSubmit">
      <span class="close" @click="func" id="closeComponent">&times;</span>
      <input type="text" v-model="division.name" placeholder="Название" required>
      <input type="number" v-model="division.count" placeholder="Фактическое количество" required>
      <button type="submit">Редактировать</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: "EditObject",
  props: {
    id: Number,
    func: Function
  },
  data () {
    return {
      name: "",
      count: ""
    }
  },
  computed: {
    ...mapGetters(["divList"]),
    division(){
      return this.divList.find(div => div.id === this.id);
    }
  },
  methods: {
    ...mapActions(["updateDivision"]),
    async onSubmit(){
      await this.updateDivision(this.division);
    }
  }
}
</script>

<style scoped>

.edit-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.edit-modal_form {
  padding: 20px;
  border: 1px solid #888;
  margin: 15% auto;
  width: 50%;
  background-color: white;
}

</style>