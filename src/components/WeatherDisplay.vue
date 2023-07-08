<template>
    <div class="flex flex-col items-center flex-1 ">
      <div class="flex">
        <h2 class="text-2xl font-bold mb-4">{{ selectedCity.name }}, {{ selectedCity.country }}, Today</h2>
      </div>
      <div v-if="weatherData" class="flex flex-1 justify-evenly p-4 w-1/2 h-40  items-center bg-blue-300 border border-blue-200 rounded-lg mr-4 mb-4">
        <div class="">
          <p class="text-xl font-bold">Temperature: {{ weatherData.current.temp }}°C</p>
          <p class="text-lg font-bold">Feels Like: {{ weatherData.current.feels_like }}°C</p>
          <p class="text-lg font-bold">Sunrise: {{ weatherData.current.sunrise }}°C</p>
          <p class="text-lg font-bold">Sunset: {{ weatherData.current.sunset }}°C</p>
          <p class="text-lg font-bold">Condition: {{ weatherData.current.weather[0].description }}</p>
          <p class="text-lg font-bold">Pressure: {{ weatherData.current.pressure }}</p>
          <p class="text-lg font-bold">Clouds: {{ weatherData.current.clouds }}</p>
          <p class="text-lg font-bold">Visibility: {{ weatherData.current.visibility }}</p>
          <p class="text-lg font-bold">Condition: {{ weatherData.current.weather[0].description }}</p>
        </div>
        <div class="weather-icon">
          <i :class="[getWeatherIcon(weatherData.current.weather[0].icon), 'text-9xl']"></i>
      </div>
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
      const getWeatherIcon = computed(() => store.getters['getWeatherIcon']);
      const weatherData = computed(() => store.state.weatherData);

      onMounted(() => {
      store.dispatch('fetchWeatherData');
    });
  
      return { selectedCity, weatherData,getWeatherIcon };
    },
  };
  </script>
<style scoped>

</style>