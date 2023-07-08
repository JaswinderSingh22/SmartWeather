<template>
  <div class="w-full h-full">
    <WeatherHeader/>
    
    <SearchBar class="mt-5"/>
    <WeatherDisplay v-if="$store.state.selectedCity" class="mt-4" />
    <WeatherForecast v-if="$store.state.selectedCity" class="mt-4 ml-4"/>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import WeatherDisplay from '../components/WeatherDisplay.vue';
import WeatherForecast from '../components/WeatherForecast.vue';
import WeatherHeader from '../components/WeatherHeader.vue';

export default {
  components: {
    SearchBar,
    WeatherDisplay,
    WeatherForecast,
    WeatherHeader
  },
};
</script>
