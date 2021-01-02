<template>
  <table class="data-table">
    <tbody class="data-table_content_parent" v-for="division in node" :key="division.id">
      <td class="data-table_content_parent_name"><p>{{ division.name }}</p></td>
      <td class="data-table_content_parent_count"><p>{{ division.count }}</p></td>
      <td class="data-table_content_parent_count"><p>{{ division.count - 10 }}</p></td>
      <td class="data-table_icons">
        <i class="data-table_icon fas fa-pen"></i>
        <i class="data-table_icon fas fa-times-circle"></i>
      </td>
    <DataTable :node="division.children"></DataTable>
    </tbody>
  </table>
</template>

<script>
// import {mapActions, mapGetters} from 'vuex';

export default {
  name: "DataTable",
  props: {
    node: Array || Object
  },
  // methods: {
  //   ...mapActions(["fetchDivisions", "deleteDivision"]),
  // },
  // computed: mapGetters(["divList"]),
  // created() {
  //   this.fetchDivisions()
  // }
}
</script>

<style scoped>
th {
  background-color: var(--backgroundColor);
}

.data-table {
  width: 100%;
}

.data-table_content_parent {
  background-color: var(--parentColor);
  color: var(--tableTextColor);
}

.data-table_icon {
  color: var(--backgroundColor);
}

.data-table_icons {
  display: flex;
  justify-content: space-around;
  width: 30%;
}

.data-table_header {
  height: 3em;
}

.data-table_content_parent_name {
  width: 40%;
}

* {
  text-align: left;
}
</style>