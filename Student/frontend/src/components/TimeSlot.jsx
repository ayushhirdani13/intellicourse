import React from "react";
import QueryCourses from "../slotData.js";
const courses =  QueryCourses();
let slotCourse=[];




const TimeSlot = (props) => {

    courses.forEach((course)=>{
        if (course.slot === props.timeStart){
            slots.push({course.
            })
        }
    });
    
    return (
      
    // <h1>"ello there</h1>

      
  );
}

export default TimeSlot;
