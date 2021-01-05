<template>
  <div class="add-object-form">
    <button
        class="add-object-form_button"
        @click="openModal"
    >
      <i class="add-object-form_icon fa fa-plus"/>
      Добавить
    </button>
    <div
        class="add-object-form_modal"
        v-if="modalOpened"
    >
      <div class="add-object-form_modal-content">
        <span
            class="close"
            @click="closeModal()"
        >
          &times;
        </span>
        <h3>
          Добавить объект
        </h3>
        <br>
        <div class="add-object-form_modal-content_btn-group">
          <button @click="openAddCityForm">
            Город
          </button>
          <button @click="openAddObjectForm">
            Объект
          </button>
        </div>
        <add-form
            :smth-opened="addCityOpened"
            :depth="0"
            :func="closeModal"/>
        <div
            class="add-object-form_modal-content_add-department-control-form"
            v-show="addObjectOpened"
        >
          <br><br>
          <div class="add-object-form_modal-content_add-department-control-form_btn-group">
            <button @click="openAddControlForm">
              Управление
            </button>
            <button @click="openAddDepartmentForm">
              Отдел
            </button>
          </div>
          <select
              v-if="addControlOpened || addDepartmentOpened"
              name="divisions"
              id="selectDivisions"
              @change="getSelectedCity()"
          >
            <option>Выберите город</option>
            <option
                v-for="division in divList"
                :key="division.id"
                :value="division.id"
            >
              <p>{{ division.name }}</p>
            </option>
          </select>
          <add-form
              :smth-opened="addControlOpened"
              :depth="1"
              :city-id="id"
              :func="closeModal"
          />
          <form
              class="form_add-department"
              v-if="addDepartmentOpened">
            <select
                v-if="addDepartmentOpened"
                name="divisions"
                id="selectControls"
                @change="getSelectedControl()"
            >
              <option>Выберите управление</option>
              <option
                  v-for="divChild in divChildren"
                  :key="divChild.id"
                  :value="divChild.id"
              >
                <p>{{ divChild.name }}</p>
              </option>
            </select>
            <add-form
                :smth-opened="addDepartmentOpened"
                :depth="2"
                :city-id="id"
                :control-id="controlId"
                :func="closeModal"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AddForm from "@/components/AddForm";

export default {
  name: "AddContent",
  data() {
    return {
      id: "",
      controlId: "",
      addCityOpened: false,
      addObjectOpened: false,
      addControlOpened: false,
      addDepartmentOpened: false,
      modalOpened: false
    }
  },
  components: {
    AddForm
  },
  computed: mapGetters(["divList", "divChildren"]),
  methods: {
    ...mapActions(["fetchDivChildren", "fetchDivisions", "updateDivision"]),
    openModal() {
      this.modalOpened = !this.modalOpened;
      return '{.add-content-form_modal{ display: "block"}}'
    },
    openAddCityForm() {
      this.addCityOpened = !this.addCityOpened;
      this.addObjectOpened = false;
      this.addControlOpened = false;
      this.addDepartmentOpened = false;
    },
    openAddObjectForm() {
      this.addObjectOpened = !this.addObjectOpened;
      this.addCityOpened = false;
      this.addControlOpened = false;
      this.addDepartmentOpened = false;
    },
    openAddControlForm() {
      this.addControlOpened = !this.addControlOpened;
      this.addCityOpened = false;
      this.addDepartmentOpened = false;
    },
    openAddDepartmentForm() {
      this.addDepartmentOpened = !this.addDepartmentOpened;
      this.addCityOpened = false;
      this.addControlOpened = false;
    },
    closeModal() {
      this.modalOpened = false;
      this.addObjectOpened = false;
      this.addCityOpened = false;
      this.addControlOpened = false;
      this.addDepartmentOpened = false;
    },
    // Получить значения выбранных аттрибутов
    getSelectedCity() {
      this.id = document.getElementById('selectDivisions').value;
      this.fetchDivChildren(this.id);
    },
    getSelectedControl() {
      this.controlId = document.getElementById('selectControls').value;
    }
  },
  created() {
    this.fetchDivisions()
  }
}
</script>
