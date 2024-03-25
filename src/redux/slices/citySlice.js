import {createSlice} from '@reduxjs/toolkit';
import {ICity} from '../../utils/commonTypes';

export interface ICityStore {
  selectedCity: ICity;
  cities: string[];
}

const initialState: ICityStore = {
  selectedCity: null,
  cities: ['Alexandria', 'Cairo', 'Al-Mansourah, Egypt'],
  erroredLocations: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setSelectedCity: (state: ICityStore, action: {payload: ICity}) => {
      state.selectedCity = action.payload;
    },
    setCities: (state: ICityStore, action: {payload: string[]}) => {
      state.cities = action.payload;
    },
    addCity: (state: ICityStore, action: {payload: string}) => {
      state.cities = [...state.cities, action.payload];
    },
    removeCity: (state: ICityStore, action: {payload: string}) => {
      state.cities = state.cities.filter(city => city !== action.payload);
    },
    resetCities: (state: ICityStore) => {
      state.cities = [];
    },
  },
});

export const {setSelectedCity, resetCities, setCities, addCity, removeCity} =
  citySlice.actions;

// Selectors
export const selectSelectedCity = state => state.city.selectedCity;
export const selectCities = state => state.city.cities;
export const selectErroredLocations = state => state.city.erroredLocations;

const cityReducer = citySlice.reducer;
export default cityReducer;
