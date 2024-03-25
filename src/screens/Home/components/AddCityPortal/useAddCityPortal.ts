import {addCity} from '@/redux/slices/citySlice';
import type {ILocation} from '@/utils/commonTypes';
import {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
interface IProps {
  cities: string[];
}

const useDebounce = (value, timeout) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  }, [value, timeout]);

  return state;
};

const useAddCityPortal = ({cities = []}: IProps) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchResults, setSearchResults] = useState<ILocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleChangeText = (text: string) => {
    setError(undefined);
    setSearchQuery(text);
  };

  const searchFetch = async (search: any) => {
    setLoading(true);
    console.log(`searchQuery`, search);

    const API_KEY = 'd270e786016642129ab190318242103'; //TODO: move to env variables
    const url = `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${search}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(`result`, result);
      if (!response.ok) {
        console.error('Error in fetchSearchResults: ', result.error.message);
        return;
      }

      setSearchResults(result);
    } catch (err: any) {
      console.error('Error in Catch in fetchSearchResults: ', err.message);
    } finally {
      setLoading(false);
    }

    // if (!searchQuery) {
    //   setError('Please enter a city name');
    //   return;
    // }
    // if (cities.includes(searchQuery)) {
    //   setError('City already exists');
    //   return;
    // }
  };

  const handleAddCity = (city: string) => {
    console.log(`handleAddCity: `, city);
    // check if city already exists in cities => error already exists
    if (cities.includes(searchQuery)) {
      setError('City already exists');
      return;
    }
    // check if more than 6 cities => error too many cities remove one
    if (cities.length >= 10) {
      setError('Too many cities, remove one first');
      return;
    }
    // add city
    dispatch(addCity(city));

    console.log(`cities`, cities);
  };

  useEffect(() => {
    debouncedSearchQuery && debouncedSearchQuery.length > 3
      ? searchFetch(debouncedSearchQuery)
      : setSearchResults([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(`debouncedSearchQuery`, debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    error,
    cities,
    handleChangeText,
    handleAddCity,
    handleSearch: searchFetch,
    searchResults,
    setSearchResults,

    loading,
  };
};

export default useAddCityPortal;
