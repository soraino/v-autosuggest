# v-autosuggest

[![npm](https://img.shields.io/npm/v/v-autosuggest.svg) ![npm](https://img.shields.io/npm/dm/v-autosuggest.svg)](https://www.npmjs.com/package/v-autosuggest)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js(2.x) component that auto completes/suggests input for dynamic and static data querying.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Properties](#properties)
- [Example](#example)


----------


# Installation

```
npm install --save v-autosuggest
```


----------


# Usage


    import VAutoSuggest from 'v-autosuggest'
    
    Vue.component('v-autosuggest', VAutosuggest )

In your template you can use this syntax:

    <VAutosuggest 
	    v-model="searchData" 
	    :getItemFromAjax="ajaxCall" 
	    :suggValue="'name'" 
	    :suggStatusComp="statusComponent"
	    :suggItemComp="suggItemComponent"
	    :items="staticSuggArray"
	    :maxSuggestion="maxSugg"
    />
    


----------
# Properties
<table >
  <tr>
    <th>Property Name<br></th>
    <th>type</th>
    <th>Required<br></th>
    <th>Default Value<br></th>
    <th>Description</th>
  </tr>
  <tr>
    <td>getItemFromAjax</td>
    <td>Function</td>
    <td>false<br></td>
    <td>null</td>
    <td>contains function that queries and returns the data ( if property "items" is present, this property function will not be fired )<br></td>
  </tr>
  <tr>
    <td>suggValue</td>
    <td>String</td>
    <td>false</td>
    <td>"value"<br></td>
    <td>the property name that is the main thing that is being queried<br></td>
  </tr>
  <tr>
    <td>suggStatusComp</td>
    <td>Object (vue component)<br></td>
    <td>false</td>
    <td>base status component<br></td>
    <td>Vue component that show the status of the querying<br></td>
  </tr>
  <tr>
    <td>suggItemComp</td>
    <td>Object (vue component)<br></td>
    <td>false</td>
    <td>base item component<br></td>
    <td>Vue component that show the suggestion items<br></td>
  </tr>
  <tr>
    <td>items</td>
    <td>Array</td>
    <td>false</td>
    <td>null</td>
    <td>Contains a static array of items that is gonna be queried (if this property is present, the getItemFromAjax function will not be fired)<br></td>
  </tr>
  <tr>
    <td>maxSuggestion</td>
    <td>Number</td>
    <td>false</td>
    <td>5</td>
    <td>Max number of suggestion item is being shown on screen<br></td>
  </tr>
</table>

----------


# Example
There's 2 ways of inserting the data for v-autosuggest

## Basic Usage
 1. Through online querying (ie: ajax, firebase , etc...)
 2. Static JSON file or equivalent

#### Basic usage with Online querying (not limited to ajax)

    <template>
        <VAutosuggest v-model="searchData" :getItemFromAjax="ajaxCall"/>
    </template>
    <script>
    import axios from 'axios'
    import VAutosuggest from 'v-autosuggest'
    
    export default {
      name: 'app',
      components: {
        VAutosuggest
      },
      data () {
        return {
          searchData: ''
        }
      },
      methods: {
        ajaxCall: async function (query) {
          const response = await axios.get(`https://swapi.co/api/people/?search=${query}`)
          return response.data.results.reduce((Accumulative, current) => {
        Accumulative.push({value: current.name, description: 'Height: '+ current.height + 'cm'})
        return Accumulative
      })
        }
      }
    }
    </script>

    
>**Important Note**:
>  -  **ajaxCall**: Return either a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) the function and return the value
> - I use `reduce` in the **ajaxCall**  to only get the the name and height of each of the data, but for the height i put `description`, this is because the default suggestion component shows description in the `description` property.

---


#### Basic usage with static data (eg: JSON file, array, xml)

    <template>
    	    <VAutosuggest v-model="searchData" :suggValue="'name'"/>
        </template>
    <script>
    import axios from 'axios'
    import VAutosuggest from 'v-autosuggest'
    
    export default {
      name: 'app',
      components: {
        VAutosuggest
      },
      data () {
        return {
          searchData: '',
          arrayData: [{name:'Ben', description:'180cm'},{name:'Jon', description:'179cm'},{name:'Smith', description:'190cm'}]
        }
      }
    }
    </script>


## Advanced Usage

You are able to change the component for the status and suggestion to suit your own website.



This is the status component
![Status component](https://preview.ibb.co/dOgrS6/status_Component.gif)

These are the suggestion items component
![Suggestion Item component](https://preview.ibb.co/cpnbum/suggestion_Item_Component.png)


You will be able to change the status and suggestion item component by passing your own into the suggStatusComp and suggItemComp respectively.

**But there are some caveats.**

#### Suggestion Status Component
When trying to make this component, be sure to **include this prop and data**

	

      ...props: {
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
      }...

> As you can see the **suggestionStatus** act as a enum to check the current status of the suggestion querying

<table>
	<thead>
		<tr>
			<td>
			Property Name
			</td>
			<td>
			Description
			</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
			suggestionStatusEnum
			</td>
			<td>
			represents the current status of the suggestion querying
			</td>
		</tr>
		<tr>
			<td>
			valueProp
			</td>
			<td>
			Represents the key value data that you are trying to find/suggest
			</td>
		</tr>
	</tbody>
</table>


----------


### Status enum table

<table>
	<thead>
		<tr>
			<td>
			Status Name
			</td>
			<td>
			Status Number
			</td>
			<td>
			Status Description
			</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
			nuetralStatus
			</td>
			<td>
			0
			</td>
			<td>
				Shown as a neutral stands as no suggestion is being shown but will still be able to shown as empty  <code>li</code> tag to the user
			</td>
		</tr>
		<tr>
			<td>
			noDataFound
			</td>
			<td>
			1
			</td>
			<td>
				This is to show an error message to the user that data can be found on their query
			</td>
		</tr>
		<tr>
			<td>
			loading
			</td>
			<td>
			2
			</td>
			<td>
				Shows a loading spinner to tell user it is querying the data
			</td>
		</tr>
		<tr>
			<td>
			closeStatus
			</td>
			<td>
			3
			</td>
			<td>
				Hides the <code>li</code> tag completely even if query finds the data
			</td>
		</tr>
	</tbody>
</table>
#### Example Suggestion Item component

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


#### Suggestion Status Component
When trying to make this component, be sure to **include these 2 props**

    ...props: {
	     item: {
	       type: Object,
	       required: true
	     },
	     valueProp:{
	       type: String,
	       required: false,
	       default: 'value',
	     }
	   }...
<table>
	<thead>
		<tr>
			<td>
			property Name
			</td>
			<td>
			Description
			</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
			item
			</td>
			<td>
			Object that represents a suggestion item
			</td>
		</tr>
		<tr>
			<td>
			valueProp
			</td>
			<td>
			Represents the key value data that you are trying to find/suggest
			</td>
		</tr>
	</tbody>
</table>

#### Example Suggestion Item component

    <template>
      <div>
          <h2 v-text="item[this.valueProp]"></h2>
          <p v-text=" item.subDescription"></p>
          <p v-text=" item.createAt"></p>
      </div>
    </template>
    <script>
    export default {
      name: 'suggItemComponent',
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
      }
    }
    </script>

---

## License

[MIT](http://opensource.org/licenses/MIT)


