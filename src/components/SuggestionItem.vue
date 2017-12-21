<template>
  <div>
      <h2 v-text="item.name"></h2>
      <p v-text="'Height :'+ item.height +'cm'"></p>
  </div>
</template>

<style scoped>
div{
  padding-left:20px;
  border-bottom: 1px solid black;
  border-top: 1px solid white; 
}
h2{
  margin-bottom: 10px;
}
div:hover{
  background-color: rgb(236, 236, 236);
}
</style>


<script>
export default {
  name: 'SuggestionItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>