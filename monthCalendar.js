import { dataEvents, gl_employee, gl_procedures, gl_salons, getMinutesFromProcedures, getNewId } from "./data.js";
import { formEvent } from "./forms.js";

var calendar;

const dayOnClick = async (info, salonId) => {
   const { value: formValues } = await formEvent(salonId);

    if (formValues) {
      Swal.fire(JSON.stringify(formValues))

      const objEvent = {
         id: getNewId(dataEvents),
         title: formValues.title,
         start: info.dateStr,
         end: new Date(new Date(info.dateStr).getTime() + getMinutesFromProcedures(formValues.procedures) * 60000 ),
         procedures: formValues.procedures,
         salonId: formValues.salonId,
         employeeId: formValues.employeeId,         
      }

      calendar.addEvent(objEvent); 
      dataEvents.push(objEvent);      
    }     
}


const eventOnClick = async (info) => {
   const salonId = info.event.extendedProps.salonId;
   const eventObj = {
      id: parseInt(info.event.id),
      title: info.event.title,
      employeeId: info.event.extendedProps.employeeId,
      procedures: info.event.extendedProps.procedures
   }
   
   const { value: formValues, isDenied } = await formEvent(salonId, eventObj);
   
   if(isDenied) { // deleting
      info.event.remove();
      const idx = dataEvents.findIndex(item => item.id === parseInt(info.event.id));
      dataEvents.splice(idx, 1);
   }

   if(formValues) {
      formValues.end = new Date(info.event.start.getTime() + getMinutesFromProcedures(formValues.procedures) * 60000 );
      const idx = dataEvents.findIndex(item => item.id === formValues.id);
      dataEvents[idx] = {...dataEvents[idx], ...formValues};
      info.event.setProp("title", formValues.title);
      info.event.setEnd(formValues.end);
      info.event.setExtendedProp("employeeId", formValues.employeeId);
      info.event.setExtendedProp("procedures", formValues.procedures); 
   }  
 }


const renderCalendar = (data, salonId, employeeId) => {
   const filteredData = data.filter(event => {
      let isSalon = true;
      let isEmployee = true;

      if(salonId) isSalon = event.salonId === salonId;
      if(employeeId) isEmployee = event.employeeId === employeeId;
      return isSalon && isEmployee;
   })
   
   var calendarEl = $("#month-calendar")[0];
   calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "timeGridWeek",   
      editable: true,  
      selectable: true,
      headerToolbar: {
         left: 'prev,next today',
         //center: 'title',
         // center: 'addEventButton',
         right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: (info) => dayOnClick(info, salonId),
      eventClick: eventOnClick, 
      eventAdd: (addInfo) => console.log(addInfo),
      eventChange: (changeInfo) => console.log(changeInfo),
      events: filteredData,    
   });

  
   calendar.render(); 
}



$( document ).ready(function() {
   gl_salons.forEach(salon => $("#input-salon").append(`<option value="${salon.id}">${salon.name}</option>`));
   gl_employee.forEach(emp => $("#input-employee").append(`<option value="${emp.id}">${emp.name}</option>`));

   const salonId = parseInt($("#input-salon").val());
   renderCalendar(dataEvents, salonId);


   $("#input-salon").on("change", function() {
      const salonId = parseInt($("#input-salon").val());
      let employeeId = parseInt($("#input-employee").val());
      if (employeeId === -1) employeeId = undefined;
      renderCalendar(dataEvents, salonId, employeeId);      
   });

   $("#input-employee").on("change", function() {
      const salonId = parseInt($("#input-salon").val());
      let employeeId = parseInt($("#input-employee").val());
      if (employeeId === -1) employeeId = undefined;
      renderCalendar(dataEvents, salonId, employeeId);      
   });   

});