<template>
    <div class="forecast-card">
    <h2 class="text-xl font-bold mb-4">Forecast upcoming 7 days....</h2>
    <div v-if="forecastData.length > 0" class="overflow-auto">
      <ul class="flex">
        <li v-for="forecast in forecastData" :key="forecast.dt" class="flex card flex-col justify-between	 items-center">
          <p class="text-sm">{{ formatDate(forecast.dt) }}</p>
          <p>Temperature: {{ forecast.temp.day }}°C</p>
          <p class="font-bold">Feels Like: {{ forecast.feels_like.day }}°C</p>
          <p class="text-sm">Condition: {{ forecast.weather[0].description }}</p>
          <i :class="[getWeatherIcon(forecast.weather[0].icon), 'text-3xl']"></i>
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
      const backgroundImage = require('@/imgs/SVTk.gif');

      const getWeatherIcon = computed(() => store.getters['getWeatherIcon']);
      const forecastData = computed(() => store.state.forecastData);

      // Fetch forecast data on component mount

      onMounted(() => {
      store.dispatch('fetchForecastData');
    });

    // Format timestamp to a readable date format

    const formatDate = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString();
    };

    
    
    return { forecastData, formatDate, getWeatherIcon, backgroundImage };
    },
  };
  </script>
  <style scoped>
.forecast-card {
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 8%;
  padding: 1rem;
  border: 1px solid #3178d3;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #2677de;
}

.card{
  max-width: 90%;
  width: 50%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding: 1rem;
  border: 1px solid #0f6de7;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: cornflowerblue;

}

/* Adjustments for smaller screens */

@media (max-width: 640px) {
  .forecast-card {
    max-width: 100%;
  }
}

/* Adjustments for larger screens */

@media (min-width: 768px) {
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}
</style>