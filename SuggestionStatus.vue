<template>
  <div v-show="suggestionStatusEnum != suggestionStatus.nuetralStatus || suggestionStatusEnum != suggestionStatus.closeStatus">
    <div class="loader" v-show="suggestionStatusEnum == suggestionStatus.loading">
    </div>
    <div v-show="suggestionStatusEnum == suggestionStatus.noDataFound">
      <h2>No result found</h2>
    </div>
  </div>
</template>

<style>
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 100%;
  border-top: 2px solid black;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.5s linear infinite;
  animation: spin 0.5s linear infinite;
  margin: 0 auto;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

<script>
export default {
  name: 'suggestionStatus',
  props: {
    suggestionStatusEnum: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      suggestionStatus: {
        nuetralStatus: 0,
        noDataFound: 1,
        loading: 2,
        closeStatus: 3
      }
    }
  }
}
</script>