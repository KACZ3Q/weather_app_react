import { useState,useEffect} from "react";
import {dateBuilder} from "./components/Date";
import Clock from "./components/Clock";
import useBackgroundChange from "./components/Background";
import search from "./components/Search";
import api from "./components/Api";
import Modal from './components/Error';

function App() {
  const[query,setQuery]=useState('');
  const[weather,setWeather]=useState({});
  const [background, setBackground] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [recentCities, setRecentCities] = useState([]);
 
  useBackgroundChange(weather, setBackground); 

  useEffect(() => {
    const recentCitiesData = localStorage.getItem('recentCities');
    if (recentCitiesData) {
      setRecentCities(JSON.parse(recentCitiesData));
    }
  }, []);

  const handleSearch = async (evt) => {
    if (evt.key === "Enter") {
      const result = await search(query, setQuery, setWeather, api, openModal);
      if (result.success) {
        updateRecentCities(query);
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const updateRecentCities = (city) => {
    const updatedCities = [...recentCities];
  
    const isCityAlreadyAdded = updatedCities.includes(city);
  
    if (!isCityAlreadyAdded) {
      if (updatedCities.length >= 5) {
        updatedCities.pop();
      }
      updatedCities.unshift(city);
  
      setRecentCities(updatedCities);
      localStorage.setItem("recentCities", JSON.stringify(updatedCities));
    }
  };
  

  const handleRecentCityClick = (city) => {
    setQuery(city);
    handleSearch({ key: "Enter" });
  };
  
  return (
    
    <div className={`App ${background}`}  >
      <main>
        <div className="Search-box">
          <input type="text" className="Search-bar" placeholder="Search city" onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyDown={handleSearch}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
        <div className="Location-box">
          <div className="Location">{weather.name}</div>
          <div className="Date">{dateBuilder(new Date())}<Clock/></div>
        </div>
          <div className="Weather-box">
              <div className="Min-maxTemp">
              {Math.round(weather.main.temp_min)}°C
                  <div className="min-max">min</div>
              </div>
              <div className="Temp">
                {Math.round(weather.main.temp)}°C
                <div className="Condition">
                  {weather.weather[0].main}
                </div>
              </div>
              <div className="Min-maxTemp">
              {Math.round(weather.main.temp_max)}°C
                <div className="min-max">max</div>
              </div>
          </div>
          <div className="Conditions-detail">
              <div className="detail">Humidity<br/>
              {(weather.main.humidity)} %</div>
              <div className="detail">Feels like<br/>
              {(weather.main.feels_like)}°C</div>
              <div className="detail">Pressure<br/>
              {(weather.main.pressure)} hPa</div>
          </div>
              <div className="Recent-cities">
                <h2>Recent Searches</h2>
                  <div className="City-list">
                    {recentCities.map((city, index) => (
                        <span
                        key={index}
                        onClick={() => handleRecentCityClick(city)}
                        className="Recent-city"
                      >
                        {city}
                      </span>
                  ))}
                  </div>
              </div>

        </div>
        ) : ('')} 
      </main>
    
      <Modal isOpen={showModal} closeModal={closeModal} />
    </div>
  );
}

export default App;