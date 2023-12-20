import React from 'react';
import { Link } from 'react-router-dom';


const PitchCard = ({ field }) => {
  return (
    <div className="horizontal-card" key={field._id}>
      <img src={`./assets/${field.pitchType}-field.jpg`} alt="Pitch" />
      <div className="horizontal-card-content">
        <h2>{field.name}</h2>
        <p>{field.description}</p>
        <p className="rating">Rating:{field.rating}/5</p>
        <p className="address">{field.address?.street}, {field.address?.city}</p>
        <p className="pitch-type">Type: {field.pitchType} Pitch</p>
        <p className="capacity">Capacity:{field.capacity}</p>
        <Link className="book-now-button" to={`booking/${field._id}`}>Book Now</Link>
      </div>
    </div>
  );
};

export default PitchCard;
