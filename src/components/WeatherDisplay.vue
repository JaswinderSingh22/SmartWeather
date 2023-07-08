<template>
    <div class="flex flex-col items-center flex-1 ">
      <div class="flex">
        <h2 class="text-5xl mb-4 selectedhead">{{ selectedCity.name }}, {{ selectedCity.country }}, Today</h2>
      </div>
      <div v-if="weatherData" :style="{ backgroundImage: `url(${backgroundImage})` }" class="flex flex-1  justify-evenly p-4 w-1/2 h-40  items-center bg-blue-300 border border-blue-200 rounded-lg mr-4 mb-4 weatherBg">
        <div class="displayTemp">
          <p class="text-xl font-bold">Temperature: {{ weatherData.current.temp }}°C</p>
          <p class="text-lg font-bold">Feels Like: {{ weatherData.current.feels_like }}°C</p>
          <p class="text-lg font-bold">Sunrise: {{ formattedTime(weatherData.current.sunrise) }}</p>
          <p class="text-lg font-bold">Sunset: {{ formattedTime(weatherData.current.sunset) }}</p>
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
  import { computed, onMounted, watch } from 'vue';
  import { useStore } from 'vuex';
  
  
  export default {
    name: 'WeatherDisplay',
    setup() {
      const backgroundImage = require('@/imgs/QlQV.gif');

      const store = useStore();
      const formattedTime = (timestamp) => {
          const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const seconds = date.getSeconds();
        return`${hours}:${minutes}:${seconds}`;
      };

    const selectedCity = computed(() => store.state.selectedCity);
    const getWeatherIcon = computed(() => store.getters['getWeatherIcon']);
    const weatherData = computed(() => store.state.weatherData);

  // Watch for changes in selectedCity and fetch weather data

    watch(selectedCity, (newSelectedCity) => {
    if (newSelectedCity !== null) {
      // Fetch weather data and forecast data based on the selected city
      store.dispatch('fetchWeatherData');
      store.dispatch('fetchForecastData');
      
    }
    });

    // Fetch weather data on component mount
    
    onMounted(() => {
      store.dispatch('fetchWeatherData');
    });
  
      return { selectedCity, weatherData,getWeatherIcon, formattedTime, backgroundImage };
    },
  };
</script>
<style scoped>
.weatherBg{
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.selectedhead{
  color: blanchedalmond;
  font-weight: 900;
  font-family: cursive;
}
.displayTemp{
  font-family: cursive;
  color: black;
  font-weight: 900;
}
</style>