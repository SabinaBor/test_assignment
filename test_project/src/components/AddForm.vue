<template>
  <form v-show="smthOpened">
    <br><br>
    <input type="text" v-model="name" placeholder="Название..." required/>
    <br><br>
    <input type="number" v-model="factCount" placeholder="Фактическое кол-во..." required>
    <br><br>
    <button @click="onDivSubmit">Добавить</button>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Form",
  props: {
    smthOpened: Boolean,
    depth: Number,
    cityId: String,
    controlId: String
  },
  data() {
    return {
      name: "",
      factCount: 0
    }
  },
  methods: {
    ...mapActions(["addDivisions", "updateDivision", "fetchDivisions"]),
    onDivSubmit() {
      let obj = {
        id: "",
        name: this.name,
        factCount: parseInt(this.factCount),
        children: []
      }
      if (this.depth === 0) {
        this.addDivisions(obj);
      } else if (this.depth === 1) {
        let divControl = this.divList.find(div => div.id === parseInt(this.cityId));
        obj.id = parseInt(this.cityId + `${(divControl.children.length + 1)}`);
        divControl.children.push(obj);
        this.updateDivision(divControl);
      } else {
        let divDepartment = this.divList.find(div => div.id === parseInt(this.cityId));
        let divControl = divDepartment.children.find(control => control.id === parseInt(this.controlId));
        obj.id = parseInt(this.controlId + `${(divControl.children.length + 1)}`);
        divDepartment.children.find(control => control.id === parseInt(this.controlId)).children.push(obj);
        this.updateDivision(divDepartment);
      }
        this.name = "";
        this.factCount = "";
        location.reload();
    },
  },
  computed: {
      ...mapGetters(["divList"])
  },
  created() {
    this.fetchDivisions();
  }
}
</script>
