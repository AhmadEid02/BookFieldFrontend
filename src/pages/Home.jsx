import React, { useEffect, useState } from 'react'
import PitchCard from '../componts/PitchCard'
import '../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const Home = () => {
  const [fields,setFields]=useState([])
  const [sport,setSport]=useState("All")
  const fetchData = async () => {
    const response = await axios.get("https://bookfieldbackend.onrender.com/api/fields");
    setFields(response.data);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(sport);
  }, [sport]);
  return (
    <div>
      <div className="contener">

        <div className="headnews">
          {/* <h1>news</h1>
          <div className='news'>
            <div className="new">
              <h1>Title 1</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, harum maiores quos doloribus consequuntur, quibusdam odit voluptatibus nihil tempora porro illo vel at! Animi, necessitatibus? Dolore dolores ipsa necessitatibus sunt?</p>
            </div>
            <div className="new">
              <h1>Title 2</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, harum maiores quos doloribus consequuntur, quibusdam odit voluptatibus nihil tempora porro illo vel at! Animi, necessitatibus? Dolore dolores ipsa necessitatibus sunt?</p>
            </div>
            <div className="new">
              <h1>Title 3</h1>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, harum maiores quos doloribus consequuntur, quibusdam odit voluptatibus nihil tempora porro illo vel at! Animi, necessitatibus? Dolore dolores ipsa necessitatibus sunt?</p>
            </div>
          </div> */}
          <h1>Book a field by sport</h1>
          <div className="sports">
            <div className="sport" onClick={()=>{setSport("All")}}>
              <span className="material-symbols-outlined">
                sports_soccer
              </span>
              <p>All</p>
            </div>
            <div className="sport" onClick={()=>{setSport("Tennis")}}>
              <span className="material-symbols-outlined">
                sports_tennis
              </span>
              <p>Tennis</p>
            </div>
            <div className="sport" onClick={()=>setSport("Volleyball")} >
              <span className="material-symbols-outlined">
                sports_volleyball
              </span>
              <p>Volleyball</p>
            </div>
            <div className="sport" onClick={()=>setSport("Basketball")}>
              <span className="material-symbols-outlined">
                sports_basketball
              </span>
              <p>Basketball</p>
            </div>
            <div className="sport" onClick={()=>setSport("Football")}>
              <span className="material-symbols-outlined">
                sports_soccer
              </span>
              <p>Football</p>
            </div>
          {/* </div> */}
        </div>
        <h1>Fleids</h1>
        <div className=" fleids">
          {
            fields.filter(field => (field.pitchType === sport)||(sport=="All")).map(e => {return (<PitchCard key={e._id} field={e} />)})
          }
        </div>
        </div>
      </div>
    </div>
  )
}
