import { useEffect } from "react";

const setBackgroundImage = (weather, setBackground) => {
  if (typeof weather.weather !== 'undefined') {
    switch (weather.weather[0].main) {
      case 'Clouds':
        setBackground('clouds');
        break;
        case 'Haze':
        setBackground('haze');
        break;
        case 'Mist':
          setBackground('haze');
          break;
        case 'Clear':
        setBackground('clear');
        break;
        case 'Rain':
        setBackground('rain');
        break;
        case 'Snow':
        setBackground('snow');
        break;
        case 'Thunderstorm':
        setBackground('storm');
        break;
      default:
        setBackground('');
        break;
    }
  } 
};

const useBackgroundChange = (weather, setBackground) => {
  useEffect(() => {
    setBackgroundImage(weather, setBackground);
  }, [weather, setBackground]);
};

export default useBackgroundChange;