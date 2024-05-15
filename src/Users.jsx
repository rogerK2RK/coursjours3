import { useState } from 'react';
import axios from 'axios';
import './index.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const API_ID = 'ec5f933788ec2e550fc16821c27da3f6';
const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?lat=40.7143&lon=-74.006&appid=ec5f933788ec2e550fc16821c27da3f6';

const Users = () => {
  const [users, setUsers] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const fetchUsers = async (id) => {
    setLoading(true);
    try {
      const usersResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${usersResponse.data.address.geo.lat}&lon=${usersResponse.data.address.geo.lng}&appid=${API_ID}`
      );

      console.log(usersResponse.data);
      console.log(usersResponse.data.address.geo.lat);
      console.log(usersResponse.data.address.geo.lng);
      console.log(weatherResponse);
      console.log(users);
      setUsers(usersResponse.data);
      setWeather(weatherResponse.data);
      setPosition([usersResponse.data.address.geo.lat, usersResponse.data.address.geo.lng])
      setShowMap(true);
      
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUsers(inputValue);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  if(loading){ 
    <h2>loading...</h2>
  }
  console.log(position);

  return (
    <>
      {error && <p>{error.message}</p>}
      <div>
        <form onSubmit={handleSubmit}>
          <input type="number" value={inputValue} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        { showMap ? <MapContainer center={position} zoom={1} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position.length > 0 && <Marker position={position}><Popup>A pretty CSS3 popup.<br/>Easly customizable.</Popup></Marker>}
        </MapContainer> : null}
      </div>
    </>
  );
};

export default Users;
