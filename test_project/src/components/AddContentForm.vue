<template>
  <div class="add-content-form">
    <button class="add-content-form_button">
      <i class="add-content-form_icon fa fa-plus"/>
      Добавить
    </button>
  </div>
</template>

<script>
export default {
  name: "AddContent"
}
</script>

<style scoped>
.add-content-form {
  height: 5em;
  display: flex;
  align-items: center;
  margin-left: 2%;
}

.add-content-form_button {
  height: 2em;
  border: 0;
  border-radius: 5%;
  width: 8em;
  color: #8c8c8c;
}

</style>