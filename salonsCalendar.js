import { dataEvents, gl_employee, gl_procedures, gl_salons, getMinutesFromProcedures } from "./data.js";


const renderCalendar = (data) => {
   const newData = data.map(item => {
      item.resourceId = item.salonId;
      return item;
   });

   const salons = gl_salons.map(item => {
      item.title = item.name;
      return item;
   });
   
   var calendarEl = $("#salons-calendar")[0];

   var calendar2 = new FullCalendar.Calendar(calendarEl, {
      timeZone: 'UTC',
      initialView: 'resourceTimeGridDay',
      resources: salons,
      events: newData
  });
  
   calendar2.render(); 
}



$( document ).ready(function() {
   renderCalendar(dataEvents);
   $("#salons-calendar-container").hide();
});