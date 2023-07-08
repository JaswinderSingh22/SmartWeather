<template>
    <div class="flex justify-center">
      <div class="relative w-6/12">
      <input v-model="searchQuery" @input="fetchResults" placeholder="Enter city or country"
             class="py-2 px-4 border border-gray-200 rounded-lg  w-full min-w-fit">
             </div>
      <ul v-if="results.length"
          class="absolute z-10 mt-10 w-6/12 bg-grey rounded-md shadow-lg overflow-hidden">
        <li v-for="result in results" :key="result.id" @click="selectResult(result)"
            class="py-2 cursor-pointer hover:bg-blue-100">{{ result.name }}, {{ result.country }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref , watchEffect} from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'SearchBar',
    setup() {
      const searchQuery = ref('');
      const results = ref([]);
      const store = useStore();
  
      const fetchResults = async () => {
      if (searchQuery.value.trim() === '') {
        results.value = [];
        return;
      }
      const apiKey = 'AIzaSyCOauRVg5VwBP52O13dnJS6lWn1_xineK8';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery.value}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("response:", data);
        if (data.status === 'OK') {
          results.value = data.results.map((result) => {
            return {
              id: result.place_id,
              name: result.address_components[0].long_name,
              country: result.address_components.find(
                (component) => component.types.includes('country')
                  ).long_name,
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            };
          });
        } else {
          results.value = [];
        }
      }
      catch (error) {
        console.error('Error fetching search results:', error);
        results.value = [];
      }
    };
  
    const selectResult = (result) => {
      store.commit('selectCity', result);
      results.value = [];
    };

  // Close dropdown when clicking outside
    watchEffect(() => {
      const closeDropdown = (event) => {
        if (!event.target.closest('.relative')) {
          results.value = [];
        }
      };

      document.addEventListener('click', closeDropdown);

      return () => {
        document.removeEventListener('click', closeDropdown);
      };
    });
    return { searchQuery, results, fetchResults, selectResult };
  },
  };
  </script>
  