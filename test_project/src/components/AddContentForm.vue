<template>
  <div class="add-content-form">
    <button class="add-content-form_button">
      <i class="add-content-form_icon fa fa-plus"/>
      Добавить
    </button>
    <button @click="getObject(divList)">find</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AddContent",
  data() {
    return {
      object: "",
    }
  },
  computed: mapGetters(["divList"]),
  methods: {
    getObject(theObject) {
      var result = null;
      if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
        result = this.getObject(theObject[i]);
          if (result) {
            break;
          }
        }
  } else {
    for(var prop in theObject) {
      if(prop === 'id') {
        console.log(Math.round(322/10));
        if(theObject[prop] === Math.round(322/10)) {
          console.log(theObject);
          this.object = theObject;
          return theObject;
        }
      }
      if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
        result = this.getObject(theObject[prop]);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}
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

.add-content-form_button {
  height: 2em;
  border: 0;
  border-radius: 5%;
  width: 8em;
  color: #8c8c8c;
}

</style>