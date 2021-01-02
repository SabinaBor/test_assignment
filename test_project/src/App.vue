<template>
  <div id="app">
    <Header />
    <AddContentForm />
    <table class="data-table">
      <tr class="data-table_header">
        <th/>
        <th><p>Общее количество</p></th>
        <th><p>Фактическое количество</p></th>
        <th><p>Действия</p></th>
      </tr>
      <DataTable :node="divList"/>
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
    ...mapActions(["fetchDivisions", "deleteDivision"]),
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
</style>
