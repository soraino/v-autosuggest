<template>
  <div>
      <h2 v-text="valueData"></h2>
      <p v-text=" item.description"></p>
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
  name: 'suggestionItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    valueProp:{
      type: String,
      required: false,
      default: 'value',
    }
  },
  computed:{
    valueData(){
      let currVal = this.item;
      const objKeys = this.valueProp.split('.')
      for(let i = 0 ; i<objKeys.length; i++){
          currVal = currVal[objKeys[i]]
      }
      return currVal
    }
  }
}
</script>