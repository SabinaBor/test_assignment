<template>
  <table class="data-table">
    <tbody
        v-for="division in node"
        :key="division.id"
    >
    <tr :style="getStyle(division)" class="data-table_content">
      <td
          :style="getNamesMargined()"
          class="data-table_content_name"
      >
        <span
            v-if="division.children.length > 0"
            class="type"
            @click="nodeClicked"
        >
          {{ expanded ? '&#9660;' : '&#9658;' }}
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
        <i class="data-table_icon fas fa-pen"></i>
        <i
            class="data-table_icon fas fa-times-circle"
            @click="deleteDivision(division.id)"></i>
      </td>
    </tr>
    <DataTable
        v-if="expanded"
        :node="division.children"
        :depth="depth + 1"
    />
    </tbody>
  </table>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "DataTable",
  props: {
    node: Array,
    depth: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    ...mapActions(["deleteDivision"]),
    nodeClicked() {
      this.expanded = !this.expanded;
    },
    getStyle(division) {
      if (division.name.startsWith('Управление')) {
        return {
          'background-color': 'var(--firstChildColor)',
        }
      } else if (division.name.startsWith('Отдел')) {
        return {
          'background-color': 'var(--secondChildColor)',
        }
      } else {
        return {
          'background-color': 'var(--white)'
        }
      }
    },
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
    }
  },
  computed(){
    mapGetters(["currentArray"])
  },
}
</script>

<style scoped>
th {
  background-color: var(--backgroundColor);
}

.data-table {
  width: 100%;
}

.data-table_content {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3em;
  border-bottom: 0 solid white;
}

.data-table_icon {
  color: var(--backgroundColor);
}

.data-table_icons {
  display: flex;
  justify-content: space-around;
  width: 10%;
}

.data-table_content_name {
  width: 45%;
}

.data-table_content_count {
  width: 20%;
}

.data-table_content_factCount {
  width: 25%;
}

* {
  text-align: left;
  color: var(--tableTextColor);
}
</style>