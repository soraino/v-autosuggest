<template>
    <div class="v-autocomplete">
        <input class="v-autocomplete-input" type="text" v-model.trim="searchData" 
          @input="searchInputChange" @keydown.up="moveUp" @keydown.down="moveDown" @keyup.enter="enterPress"/>
        <ul class="v-suggestion-box" v-show = "currentStatus !== status.closeStatus">
            <li>
              <div :is="statusComponent" :suggestionStatusEnum="this.currentStatus"></div>
            </li>
            <li class="v-suggestion-item" :key="index" v-for="(item ,index) in suggestionArray.slice(0, this.maxSuggestion)" @click="selectSuggestion(item)">
                <div :is="suggItemComponent" :item="item"></div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
li{
    max-width:100%;
    list-style: none;
}
.v-autocomplete {
    width: 100%;
}
.v-autocomplete-input{
    width: 100%;
    font-weight: 100%;
}
.v-suggestion-box{
    width: 100%;
    padding-left: 0px;
    border-style: solid;
    border-width: 0.666667px;
    padding: 1.33333px;
    border-color: white black black black;
    margin: 0 0 0 0;
}
.v-suggestion-item.active{
    border: 4px solid black;
}
</style>

<script>
import suggestionItem from './SuggestionItem.vue'
import suggestionStatus from './SuggestionStatus.vue'

function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
};

export default {
  name: 'autoSuggest',
  props: {
    getItemFromAjax: {
      type: Function,
      required: false
    },
    suggStatusComp: {
      type: Object,
      required: false
    },
    suggItemComp: {
      type: Object,
      required: false
    },
    returnSugg: {
      type: String,
      required: false,
      default: 'value'
    },
    items: {
      type: Array,
      required: false
    },
    maxSuggestion: {
      type: Number,
      required: false,
      default: 5
    }
  },
  data () {
    return {
      statusComponent: this.suggStatusComp || suggestionStatus,
      suggItemComponent: this.suggItemComp || suggestionItem,
      searchData: '',
      suggestionArray: [], // this is the array of data that will be shown to the user as suggestions
      currentStatus: 3,
      status: {
        nuetralStatus: 0,
        noDataFound: 1,
        loading: 2,
        closeStatus: 3
      }
    }
  },
  watch: {
    searchData (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    searchInputChange: debounce(function (e) {
      if (e.target.value !== '') {
        this.currentStatus = this.status.loading
        this.suggestionArray = []
        this.getData()
      }
      // this is here because if the person is deleting the data and there's a delay in the deleting
      // the top if will be trigger instead of the else if he is clearing,
      // this is place here as a contingency place of sorts
      if (e.target.value === '') {
        this.suggestionArray = []
        this.currentStatus = this.status.closeStatus
      }
    }, 500, false),
    getData: async function () {
      if (this.items) {
        this.suggestionArray = this.items.reduce((accumulative, current) => {
          if (current[this.returnSugg].trim().toLowerCase().includes(this.searchData.toLowerCase())) { accumulative.push(current) }
          return accumulative
        }, [])
      } else {
        this.suggestionArray = await this.getItemFromAjax(this.searchData)
      }
      if (this.suggestionArray.length < 1) {
        this.currentStatus = this.status.noDataFound
      } else {
        this.currentStatus = this.status.nuetralStatus
      }
    },
    selectSuggestion (item) {
      this.searchData = item[this.returnSugg]
      this.suggestionArray = []
      this.currentStatus = this.status.closeStatus
    },
    moveDown (e) {
      const selectedSuggElement = this.$el.querySelector('.v-suggestion-item.active')
      if (selectedSuggElement) {
        if (selectedSuggElement.nextSibling) {
          selectedSuggElement.nextSibling.classList.add('active')
          selectedSuggElement.classList.remove('active')
        } else {
          selectedSuggElement.classList.remove('active')
        }
      } else {
        const suggElement = this.$el.querySelectorAll('.v-suggestion-item')
        if (suggElement.length > 0) { // this is to prevent the error messages from popping up in console to make it look ugly
          suggElement[0].classList.add('active')
        }
      }
    },
    moveUp (e) {
      const selectedSuggElement = this.$el.querySelector('.v-suggestion-item.active')
      if (selectedSuggElement) {
        if (selectedSuggElement.previousSibling.classList) { // well i dont have a good way of detecting it yet
          selectedSuggElement.previousSibling.classList.add('active')
          selectedSuggElement.classList.remove('active')
        } else {
          selectedSuggElement.classList.remove('active')
        }
      } else {
        const suggElement = this.$el.querySelectorAll('.v-suggestion-item')
        if (suggElement.length > 0) { // this is to prevent the error messages from popping up in console to make it look ugly
          suggElement[suggElement.length - 1].classList.add('active')
        }
      }
    },
    enterPress () {
      const selectedSuggElement = this.$el.querySelector('.v-suggestion-item.active')
      selectedSuggElement.click()
    }
  }
}
</script>
