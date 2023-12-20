import React, { useEffect, useState } from 'react';

import '../bookingpage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OpeningHoursSelect from '../componts/OpeningHoursSelect';

const Book = () => {
  let sty = { color: 'yellow' };

  let sty2 = { textAlign: 'left' };
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');
  const [isbooked, setIsbooked] = useState(false);
  const [fieldData, setFieldData] = useState(null);
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const handleChildData = (data) => {
    // Handle the data received from the child component
    console.log('Data received in ParentComponent:', data);
    setSelectedTime(data)
  };
  const today = () => {
    const today1 = new Date();

    const year = today1.getFullYear();
    const month = String(today1.getMonth() + 1).padStart(2, '0');
    const day = String(today1.getDate()).padStart(2, '0');

    return (`${year}-${month}-${day}`);
  }

  const fetchData = async () => {
    const response = await axios.get(`https://bookfieldbackend.onrender.com/api/fields/${id}`);
    setFieldData(response.data);
    console.log(fieldData)
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const takeDay = () => {
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const selectedDateObj = new Date(selectedDate);
    const dayIndex = selectedDateObj.getDay();
    const dayName = daysOfWeek[dayIndex];

    return fieldData?.openingHours[dayName]?.start;
  }

  const handleBooking = async () => {
    // Add your booking logic here
    if (user) {
      if (selectedDate && selectedTime) {
        try {
          const response = await axios.post(
            'https://bookfieldbackend.onrender.com//book/book-field',
            {
              "fieldId":id,//field id
              "bookedDate":selectedDate,
              "bookedTime":selectedTime,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
    
          // Assuming the backend sends the bookedDate and bookedTime in the response
          // setResponse(response.data);
          console.log(response.data)
        } catch (error) {
          setError(error)
        }
        console.log(`Booking confirmed for ${selectedDate} at ${selectedDate}:00`);
        setIsbooked(true);
        setError("")
        window.scrollTo({top:0,behavior:'smooth'})
      }else{
        setError("please select time and date")
      }

    } else {
      setError("please login in first")
    }

  };

  return (
    <>
      {isbooked ? (
        <div className="confirmation-message" id="confirmation-message">
          <h2>Booking Confirmed!</h2>
          <p>Your field reservation has been successfully booked.</p>
          <p>Details:</p>
          <p>Date: {selectedDate}</p>
          <p>Time: {selectedTime}:00</p>
          <p>Thank you for choosing our sports facility. Enjoy your game!</p>
        </div>
      ) : (
        ''
      )}
      <div className="container">
        <div className="field-info">
          <div className="field-info-text">
            <h2>{fieldData?.name}</h2>
            <div className="add">
              <p>Address: {fieldData?.address?.street}, {fieldData?.address?.city}</p>
              <p style={sty}>
                Rating:<span>{fieldData?.rating}/5 &#9733;</span>
              </p>
            </div>
            <p>Description: {fieldData?.description}</p>
            <p>Pitch Type: {fieldData?.pitchType}</p>
            <p>Capacity: {fieldData?.capacity}</p>
          </div>
        </div>

        <div className="picDate">
          <img src={`../assets/${fieldData?.pitchType}-field.jpg`} alt="" />
          <div className="timeDate">
            <div className="calendar">
              <input type="date" value={selectedDate || today()} onChange={handleDateChange} min={today()} />
            </div>

            <div className="clock">
              <span className="material-symbols-outlined">schedule</span>
              <OpeningHoursSelect startHour={takeDay()} endHour={fieldData?.openingHours?.monday?.end} onChildData={handleChildData} />

            </div>
          </div>
        </div>
        <button className="button" onClick={handleBooking}>
          Book Now
        </button>
        {error && (
          <div className='error'>
            <p>{error}</p>
          </div>
        )}
        <div className="field-info" style={sty2}>
          <p>Features:</p>
          <ul>
            {fieldData?.features.map(e => { return <li key={e}>{e}</li> })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Book;
