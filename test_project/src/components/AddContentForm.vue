<template>
  <div class="add-content-form">
    <button class="add-content-form_button" @click="openModal">
      <i class="add-content-form_icon fa fa-plus"/>
      Добавить
    </button>
    <div class="add-content-form_modal" id="myModal" v-if="opened">
      <div class="add-content-form_modal-content">
        <span class="close" @click="opened = false">&times;</span>
        <div class="add-content-form_modal-content_btn-group">
          <button @click="openAddCityForm">Добавить город</button>
          <button @click="openAddObjectForm">Добавить объект</button>
        </div>
        <form
            @submit.prevent="onDivSubmit"
            class="add-content-form_modal-content_add-city-form"
            v-show="addCityOpened"
        >
          <input type="text" v-model="name" placeholder="Название" required/>
          <br>
          <input type="number" v-model="count" placeholder="Фактическое количество" required>
          <br>
          <button type="submit">Добавить</button>
        </form>
        <div
            class="add-content-form_modal-content_add-object-form"
            v-show="addObjectOpened"
        >
            <button @click="openAddControlForm">Управление</button>
            <button @click="openAddDepartmentForm">Отдел</button>

          <select v-if="addControlOpened || addDepartmentOpened" name="divisions" id="selectDivisions" @change="myFunction()">
            <option
                v-for="division in divList"
                :key="division.id"
                :value="division.id"
            >
              <p>{{division.name}}</p>
            </option>
          </select>

          <form
              class="form_add-control"
                v-if="addControlOpened"
                @submit.prevent="onDivChildSubmit"
          >
            <input type="text" v-model="name" placeholder="Название" required/>
            <br>
            <input type="number" v-model="count" placeholder="Фактическое количество" required>
            <br>
            <button type="submit">Добавить</button>
          </form>
          <form class="form_add-department" v-if="addDepartmentOpened">
            <select
                v-if="addDepartmentOpened"
                name="divisions"
                id="selectControls"
                @change="myControlFunction()">
              <option
                  v-for="divChild in divChildren"
                  :key="divChild.id"
                  :value="divChild.id"
              >
                <p>{{divChild.name}}</p>
              </option>
            </select>
            <input type="text" v-model="name" placeholder="Название" required/>
            <br>
            <input type="number" v-model="count" placeholder="Фактическое количество" required>
            <br>
            <button type="submit">Добавить</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "AddContent",
  data() {
    return {
      object: "",
      name: "",
      count: "",
      id: "",
      controlId: "",
      addCityOpened: false,
      addObjectOpened: false,
      addControlOpened: false,
      addDepartmentOpened: false,
      opened: false
    }
  },
  computed: mapGetters(["divList", "divChildren"]),
  methods: {
    ...mapActions(["addDivisions", "addChildren", "fetchDivChildren", "fetchDivisions"]),
    onDivSubmit(){
      this.addDivisions({
        name: this.name,
        count: this.count,
        children: [],
        id: ""
      }),
          this.name = "",
          this.count = ""
    },
    openModal(){
      this.opened = !this.opened;
      return '{.add-content-form_modal{ display: "block"}}'
    },
    openAddCityForm(){
      this.addCityOpened = !this.addCityOpened;
      this.addObjectOpened = false;
      this.addControlOpened = false;
      this.addDepartmentOpened= false;
    },
    openAddObjectForm(){
      this.addObjectOpened = !this.addObjectOpened;
      this.addCityOpened = false;
      this.addControlOpened = false;
      this.addDepartmentOpened= false;
    },
    openAddControlForm(){
      this.addControlOpened = !this.addControlOpened;
      this.addCityOpened = false;
      this.addDepartmentOpened= false;
    },
    openAddDepartmentForm(){
      this.addDepartmentOpened = !this.addDepartmentOpened;
      this.addCityOpened = false;
      this.addControlOpened = false;
    },
    myFunction(){
      this.id = document.getElementById('selectDivisions').value;
      this.fetchDivChildren(this.id);
    },
    myControlFunction(){
      this.controlId = document.getElementById('selectControls').value;
    }
  },
  created() {
    this.fetchDivisions()
  }
}
</script>

<style scoped>
.add-content-form {
  height: 5em;
  display: flex;
  align-items: center;
  margin-left: 2%;
}

button {
  height: 3em;
  border: 0;
  border-radius: 5%;
  width: 8em;
  color: #8c8c8c;
}

.add-content-form_modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.add-content-form_modal-content_btn-group{
  display: flex;
  justify-content: space-between;
}

.add-content-form_modal-content{
  padding: 20px;
  border: 1px solid #888;
  margin: 15% auto;
  width: 50%;
  background-color: white;
}


</style>