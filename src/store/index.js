import { createStore } from 'vuex';

const store = createStore({
  state: {
    searchResults: [],
    selectedCity: null,
    weatherData: null,
    forecastData: [],
    latitude: null,
    longitude: null,
  },
  mutations: {
    updateSearchResults(state, results) {
      state.searchResults = results;
    },
    selectCity(state, city) {
      state.selectedCity = city;
      state.weatherData = null; // Reset weather data when a new city is selected
      state.forecastData = []; // Reset forecast data when a new city is selected
      state.latitude = null;
      state.longitude = null;
    },
    updateWeatherData(state, data) {
      state.weatherData = data;
    },
    updateForecastData(state, data) {
      state.forecastData = data;
    },
    updateLatitude(state, latitude) {
      state.latitude = latitude;
    },
    updateLongitude(state, longitude) {
      state.longitude = longitude;
    }
  },
  actions: {
    
    async fetchWeatherData({ commit, state }) {
      if (state.selectedCity === null || !state.selectedCity.latitude || !state.selectedCity.longitude) {
        return;
      }

      const Weather_apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.selectedCity.latitude}&lon=${state.selectedCity.longitude}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`;

      try {
        const response = await fetch(Weather_apiUrl);
        const data = await response.json();
        console.log("latlog1:", data);
        if (data.error) {
          console.error('Error fetching weather data:', data.error.message);
          commit('updateWeatherData', null);
        } else {
          commit('updateWeatherData', data);
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        commit('updateWeatherData', null);
      }
    },
    async fetchForecastData({ commit, state }) {
      if (state.selectedCity === null || !state.selectedCity.latitude || !state.selectedCity.longitude) {
        return;
      }

      // const Weather_apiKey = '8b4d68187405f7ea371f47ffd0bce287';
      const Weather_apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.selectedCity.latitude}&lon=${state.selectedCity.longitude}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`;


      try {
        const response = await fetch(Weather_apiUrl);
        const data = await response.json();
        console.log("latlog2:", data);

        if (data.error) {
          console.error('Error fetching forecast data:', data.error.message);
          commit('updateForecastData', []);
        } else {
          commit('updateForecastData', data.daily);
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
        commit('updateForecastData', []);
      }
    },
  },
  getters:{
    getWeatherIcon: () => (icon) => {
      console.log("icons:", icon);
      // Function logic to return the weather icon based on the icon code
      // You can use the same logic as before

      // Example implementation using Weather Icons from Google Fonts
      if (icon === '01d') {
      return 'wi wi-day-sunny';
    } else if (icon === '01n') {
      return 'wi wi-night-clear';
    } else if (icon === '02d') {
      return 'wi wi-day-cloudy';
    } else if (icon === '02n') {
      return 'wi wi-night-cloudy';
    } else if (icon === '03d' || icon === '03n') {
      return 'wi wi-cloud';
    } else if (icon === '04d' || icon === '04n') {
      return 'wi wi-cloudy';
    } else if (icon === '09d' || icon === '09n') {
      return 'wi wi-showers';
    } else if (icon === '10d' || icon === '10n') {
      return 'wi wi-rain';
    } else if (icon === '11d' || icon === '11n') {
      return 'wi wi-thunderstorm';
    } else if (icon === '13d' || icon === '13n') {
      return 'wi wi-snow';
    } else if (icon === '50d' || icon === '50n') {
      return 'wi wi-fog';
    }

    return 'wi wi-na';
    },
  },
});

export default store;
