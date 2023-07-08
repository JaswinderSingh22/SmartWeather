import { createStore } from 'vuex';

const store = createStore({
  state: {
    // Store state variables
    searchResults: [],  // Holds the search results
    selectedCity: null,  // Holds the selected city
    weatherData: null,   // Holds the weather data for the selected city
    forecastData: [],  // Holds the forecast data for the selected city
    latitude: null,   // Holds the latitude of the selected city
    longitude: null,   // Holds the longitude of the selected city
  },
  mutations: {
    // Store mutations to update state variables

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

    // Updates the weather data for the selected city

    updateWeatherData(state, data) {
      state.weatherData = data;
    },

    // Updates the forecast data for the selected city
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
    // Store actions to perform asynchronous operations and update state

    async fetchWeatherData({ commit, state }) {
      // Fetches weather data for the selected city

      if (state.selectedCity === null || !state.selectedCity.latitude || !state.selectedCity.longitude) {
        return;
      }

      const Weather_apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.selectedCity.latitude}&lon=${state.selectedCity.longitude}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`;

      try {
        const response = await fetch(Weather_apiUrl);
        const data = await response.json();
        if (data.error) {
          commit('updateWeatherData', null);
        } else {
          commit('updateWeatherData', data);
        }
      } catch (error) {
        commit('updateWeatherData', null);
      }
    },
    async fetchForecastData({ commit, state }) {
      if (state.selectedCity === null || !state.selectedCity.latitude || !state.selectedCity.longitude) {
        return;
      }

      const Weather_apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.selectedCity.latitude}&lon=${state.selectedCity.longitude}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`;


      try {
        const response = await fetch(Weather_apiUrl);
        const data = await response.json();

        if (data.error) {
          commit('updateForecastData', []);
        } else {
          commit('updateForecastData', data.daily);
        }
      } catch (error) {
        commit('updateForecastData', []);
      }
    },
  },
  getters: {
    
    // Store getters to retrieve computed values from state
    
    // Function logic to return the weather icon based on the icon code

    getWeatherIcon: () => (icon) => {
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
