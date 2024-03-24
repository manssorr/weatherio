import {addCity, removeCity} from '@/redux/slices/citySlice';
import {useState} from 'react';
import {useDispatch} from 'react-redux';

interface IProps {
  cities: string[];
}
interface IReturn {
  text: string;
  error: string | undefined;
  handleChangeText: (text: string) => void;
  handleAddCity: () => void;
  handleDeleteCity: (city: string) => void;
}

const useAddCityPortal = ({cities = []}: IProps): IReturn => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChangeText = (text: string) => {
    setError(undefined);
    setText(text);
  };

  const handleAddCity = () => {
    // check if any text => error no text
    if (!text) {
      setError('Please enter a city name');
      return;
    }
    // check if city already exists in cities => error already exists
    if (cities.includes(text)) {
      setError('City already exists');
      return;
    }
    // check if more than 6 cities => error too many cities remove one
    if (cities.length >= 6) {
      setError('Too many cities, remove one first');
      return;
    }
    // add city
    dispatch(addCity(text));
    // clear text input
    setText('');
    // update cities list
    console.log(`cities`, cities);
  };
  const handleDeleteCity = (city: string) => {
    console.log(`city`, city);
    // delete city
    dispatch(removeCity(city));
    // update cities list
  };
  return {
    text,
    error,
    handleChangeText,
    handleAddCity,
    handleDeleteCity,
  };
};

export default useAddCityPortal;
