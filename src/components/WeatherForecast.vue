<template>
    <div class="flex flex-wrap justify-center">
    <h2 class="text-2xl font-bold mb-4">7-Day Forecast</h2>
    <div v-if="forecastData.length > 0">
      <ul>
        <li v-for="forecast in forecastData" :key="forecast.dt" class="w-1/7 p-4 bg-gray-100 border border-gray-200 rounded-lg mr-4 mb-4">
          <p >Date: {{ formatDate(forecast.dt) }}</p>
          <p>Temperature: {{ forecast.temp.day }}°C</p>
          <p>Feels Like: {{ forecast.feels_like.day }}°C</p>
          <p>Condition: {{ forecast.weather[0].description }}</p>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Loading forecast data...</p>
    </div>
  </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'WeatherForecast',
    setup() {
      const store = useStore();
  
      const forecastData = computed(() => store.state.forecastData);
      onMounted(() => {
      store.dispatch('fetchForecastData');
    });

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    };
  
      return { forecastData, formatDate };
    },
  };
  </script>
  