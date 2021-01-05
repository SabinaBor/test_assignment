<template>
  <table class="data-table">
    <tbody
        v-for="division in node"
        :key="division.id"
    >
    <tr
        class="data-table_content"
        :style="getStyle()"
    >
      <td
          class="data-table_content_name"
          :style="getNamesMargined()"
      >
        <span
            class="data-table_content_arrow"
            v-if="division.children.length > 0"
            @click="nodeClicked(division.id)"
        >
          {{ expanded === division.id ? '&#9660;' : '&#9658;' }}
        </span>
        {{ division.name }}
      </td>
      <td class="data-table_content_count">
        {{ countAmount(division) }}
      </td>
      <td class="data-table_content_factCount">
        {{ division.factCount }}
      </td>
      <td class="data-table_icons">
        <i
            class="data-table_icon fas fa-pen"
            @click="openEditModal(division.id)"
        />
        <i
            class="data-table_icon fas fa-times-circle"
            @click="deleteObject(division.id)"
        />
      </td>
    </tr>
    <EditObject
        v-if="openedModal === division.id"
        :id="division.id"
        :func="closeModal"
        :depth="depth"
    />
    <!--Рекурсивно вызывает Vue компонент DataTable уже с children nodes.
        Инкрементируем depth, для сдвига (margin) children, grandchildren влево-->
    <DataTable
        v-if="expanded === division.id"
        :node="division.children"
        :depth="depth + 1"
    />
    </tbody>
  </table>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import EditObject from "@/components/EditObject";

export default {
  name: "DataTable",
  // Значения, принимающиеся при вызове компонента DataTable
  props: {
    node: Array,
    depth: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      expanded: "",
      openedModal: "",
      count: 0
    }
  },
  components: {
    EditObject
  },
  computed: {
    ...mapGetters(["divList"])
  },
  created() {
    this.fetchDivisions()
  },
  methods: {
    ...mapActions(["deleteDivision", "updateDivision", "fetchDivisions"]),
    // Удаление объекта в зависимости от его положения
    // @param {Number} id - id удаляемого объекта
    deleteObject(id) {
      var res = confirm("Вы уверены, что хотите удалить этот объект?");
      if (res) {
        if (this.depth === 0) {
          this.deleteDivision(id);
        } else if (this.depth === 1) {
          let cityId = Math.round(id / 10); // Получить id города
          let division = this.divList.find(div => div.id === cityId); // Найти объект с нужным городом
          division.children = division.children.filter(div => div.id !== id); // Присвоить новый отфильтрованный массив
          this.updateDivision(division); // Обновить объект
        } else {
          let cityId = Math.round(id / 100); // Получить id города
          let controlId = Math.round(id / 10); // Получить id управления
          let division = this.divList.find(div => div.id === cityId);
          division.children[controlId % 10 - 1].children = division.children[controlId % 10 - 1].children.filter(div => div.id !== id);
          this.updateDivision(division);
        }
      }
    },
    // Функция, которая считает общее количество сотрудников.
    // Для родительских подразделений суммируется общее количество
    // вложенных подразделений + фактическое кол-во родительского
    // подразделения. Для отделов, так как они являются листьями
    // дерева данных, их общее количество сотрудников = фактическому количеству
    // @param {Object} division - обрабатываемы объект
    countAmount(division) {
      let sum = 0;
      for (let child of division.children) {
        if (child.children !== []) {
          sum += this.countAmount(child);
        } else {
          sum += parseInt(child.factCount);
        }
      }
      sum += parseInt(division.factCount);
      return sum;
    },
    // При расширении элемента списка, присваиваем к expanded значение id элемента,
    // который был раскрыт. Это нужно для того, чтобы все элементы одного цикла
    // не раскрылись одновременно. Проверка с count нужна для того, чтобы
    // была возможность непрерывно закрывать и раскрывать элементы списка.
    // Без этого есть возможность раскрыть элемент, но не закрыть его.
    // @param {number} id - id элемента, который раскрывается
    nodeClicked(id) {
      this.count += 1;
      if (this.count === 1) {
        this.expanded = id;
      } else if (this.count === 2) {
        this.count = 0;
        this.expanded = "";
      }
    },
    // Распределение цветов, чем глубже элемент, тем темнее цвет
    getStyle() {
      if (this.depth === 1) {
        return {
          'background-color': 'var(--firstChildColor)',
        }
      } else if (this.depth === 2) {
        return {
          'background-color': 'var(--secondChildColor)',
        }
      } else {
        return {
          'background-color': 'var(--white)'
        }
      }
    },
    // Чем глубже объект, тем более он смещается направо
    getNamesMargined() {
      if (this.depth > 0) {
        return {
          'margin-left': `${this.depth * 4}%`
        }
      } else {
        return {
          'margin-left': '2%'
        }
      }
    },
    // Открывает модальное окно редактирования объекта
    openEditModal(id) {
      this.openedModal = id;
    },
    // Закрывает модальное окно редактирования объекта
    closeModal() {
      this.openedModal = ""
    }
  }
}
</script>

<style scoped>
* {
  text-align: left;
  color: var(--tableTextColor);
}
</style>