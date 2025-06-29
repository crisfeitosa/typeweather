import './styles.css';

import { useEffect, useState } from 'react';
import { GetWeatherByCityResponseProps, getWeatherByCity } from '../../services/getWeatherByCity';

import { Today } from '../../components/Today';
import { Details } from '../../components/Details';
import { Loading } from '../../components/Loading';
import { NextDays } from '../../components/NextDays';
import { CityProps } from '../../services/getCityByNameService';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GetWeatherByCityResponseProps>({} as GetWeatherByCityResponseProps);
  const [city, setCity] = useState<CityProps>(JSON.parse(localStorage.getItem('@typeweather:city') ?? ''));

  useEffect(() => {
    setIsLoading(true);

    const { latitude, longitude } = city;

    getWeatherByCity({ latitude, longitude })
      .then((response) => setData(response))
      .finally(() => setIsLoading(false));
  }, [city]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='dashboard'>
      <Today city={city.name} onSearchValue={setCity} weather={data.today.weather} />
      <Details data={data.today.details} />
      <NextDays data={data.nextDays} />
    </div>
  )
}