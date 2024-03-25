import {removeCity, resetCities} from '@/redux/slices/citySlice';
import {useDispatch} from 'react-redux';
import useHomeScreen from '../../useHomeScreen';

const useAddCityPortal = () => {
  const dispatch = useDispatch();
  const {openAddCityPortal, dismissManageCityPortal} = useHomeScreen();

  const goAddCity = () => {
    dispatch(resetCities());
  };
  const handleDeleteCity = (city: string) => {
    // delete city
    dispatch(removeCity(city));
  };
  return {
    goAddCity,
    handleDeleteCity,
  };
};

export default useAddCityPortal;
