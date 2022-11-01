// import React, { useEffect } from 'react'
import { Calendar } from "@progress/kendo-react-dateinputs"
import { useState } from 'react';
import moment from 'moment';

  const WeeklySnop = () => {
  const [min, setMin] = useState('2022,9,1');
  const [max, setMax] = useState('2030,9,1');

  const handleChange = event => {
   var startValue = event.target.value; 
   var startDate = Number(moment(startValue).format("D"))
   console.log(startDate)
   setMin(moment(startDate, "DD-MM-YYYY").add(startDate, startDate).format("YYYY,MM,DD"))
   setMax(moment(startDate + 6, "DD-MM-YYYY").add(startDate + 6, startDate + 6).format("YYYY,MM,DD"))
}
  return (
    <div>
      <Calendar  
      onChange={(e) => handleChange(e)}
      min={new Date(min)} max={new Date(max)}
      />
    </div>
  )
}
export default WeeklySnop;