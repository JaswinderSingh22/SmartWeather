<template>
  <div class="w-full h-full flex flex-col MainBg" :style="{ backgroundImage: `url(${backgroundImage}
  )` }">
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
  setup() {
    const backgroundImage = require('@/imgs/8YDk.gif');
    return {
      backgroundImage
    }
  }
};
</script>
<style scoped>
.MainBg{
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

</style>