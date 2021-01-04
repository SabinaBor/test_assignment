<template>
  <div id="app">
    <Header/>
    <AddContentForm/>
    <table class="data-table">
      <tr class="data-table_header">
        <th class="data-table_content_name"/>
        <th class="data-table_content_count">Общее количество</th>
        <th class="data-table_content_factCount">Фактическое количество</th>
        <th style="width: 10%">Действия</th>
      </tr>
      <!--colspan = 4 позволяет соединить 4 ячейки в одной строке-->
      <td colspan="4">
        <DataTable
            :node="divList"
        />
      </td>
    </table>
  </div>
</template>

<script>
import Header from "@/components/Header";
import AddContentForm from "@/components/AddContentForm";
import DataTable from "@/components/DataTable";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    AddContentForm,
    DataTable
  },
  computed: mapGetters(["divList"]),
  methods: {
    ...mapActions(["fetchDivisions"]),
  },
  created() {
    this.fetchDivisions()
  },
  mounted() {
    let iconScript = document.createElement('script')
    iconScript.setAttribute('src', 'https://kit.fontawesome.com/a076d05399.js')
    document.head.appendChild(iconScript)
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--textColor);
}

* {
  margin: 0;
}
</style>
