<template>
  <table class="data-table">
    <tbody
        v-for="division in node"
        :key="division.id"
    >
    <tr
        class="data-table_content"
        :style="getStyle(division)"
    >
      <td
          class="data-table_content_name"
          :style="getNamesMargined()"
      >
        <span
            v-if="division.children.length > 0"
            @click="nodeClicked(division.id)"
        >
          {{ expanded === division.id ? '&#9660;' : '&#9658;' }}
        </span>
        {{ division.name }}
      </td>
      <td class="data-table_content_count">
        {{ division.count }}
      </td>
      <td class="data-table_content_factCount">
        {{ division.count - 10 }}
      </td>
      <td class="data-table_icons">
        <i
            class="data-table_icon fas fa-pen"
            @click="openEditModal(division.id)"
        />
        <i
            class="data-table_icon fas fa-times-circle"
            @click="deleteDivision(division.id)"
        />
      </td>
    </tr>
    <EditObject
        v-if="openedModal === division.id"
        :id = "division.id"
        :func="closeModal"
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
import {mapActions} from "vuex";
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
  methods: {
    ...mapActions(["deleteDivision"]),
    // При расширении элемента списка, присваиваем к expanded значение id элемента,
    // который был раскрыт. Это нужно для того, чтобы все элементы одного цикла
    // не раскрылись одновременно. Проверка с count нужна для того, чтобы
    // была возможность непрерывно закрывать и раскрывать элементы списка.
    // Без этого есть возможность раскрыть элемент, но не закрыть его.
    // @param {number} id - id элемента, который раскрывается
    nodeClicked(id) {
      this.count += 1;
      if(this.count === 1){
        this.expanded = id;
      } else if(this.count === 2){
        this.count = 0;
        this.expanded = "";
      }
    },
    // Распределение цветов, чем глубже элемент, тем темнее цвет
    // @param {Object} obj - объект, который может быть либо родителем,
    // либо дочерним элементом, и т д
    getStyle(obj) {
      if (obj.name.startsWith('Управление')) {
        return {
          'background-color': 'var(--firstChildColor)',
        }
      } else if (obj.name.startsWith('Отдел')) {
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
    openEditModal(id){
      this.openedModal = id;
    },
    // Закрывает модальное окно редактирования объекта
    closeModal(){
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