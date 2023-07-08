<template>
    <div class="flex flex-col items-center">
    <div class="flex">
      <h2 class="text-2xl font-bold mb-4">{{ selectedCity.name }}, {{ selectedCity.country }}</h2>
      </div>
    <div v-if="weatherData" class="flex p-4 flex-col items-center bg-blue-300 border border-gray-200 rounded-lg mr-4 mb-4">
      <p class="text-xl">Temperature: {{ weatherData.current.temp }}°C</p>
      <p class="text-lg">Feels Like: {{ weatherData.current.feels_like }}°C</p>
      <p class="text-lg">Condition: {{ weatherData.current.weather[0].description }}</p>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'WeatherDisplay',
    setup() {
      const store = useStore();
  
      const selectedCity = computed(() => store.state.selectedCity);
      const weatherData = computed(() => store.state.weatherData);

      onMounted(() => {
      store.dispatch('fetchWeatherData');
    });
  
      return { selectedCity, weatherData };
    },
  };
  </script>
  