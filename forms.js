import { gl_employee, gl_procedures } from "./data.js";

export const formEvent = async (salonId, objEvent) => {
   let employeeOptions = "";
   gl_employee.forEach(emp => { 
      if(emp.salonId === salonId) employeeOptions+= `<option value="${emp.id}">${emp.name}</option>`;
   });
   
   let proceduresOptions = "";
   gl_procedures.forEach(proc => proceduresOptions+= `<option value="${proc.id}">${proc.name}</option>`);

   return await Swal.fire({
      title: 'Event',
      html:
      '<input id="input-client" class="swal2-input" placeholder="Client name">' +
      '<div><select id="input-emp">'+employeeOptions+'</select></div>'+
      '<div><select id="input-procedures" size="5" multiple>'+proceduresOptions+'</select></div>',
      focusConfirm: false,
      
      confirmButtonText: objEvent ? "Save" : "Create new",
      showDenyButton: !!objEvent,
      denyButtonText: "Delete",

      didOpen: () => {
         if(objEvent) {
            $("#input-client").val(objEvent.title);
            $("#input-emp").val(objEvent.employeeId);
            $("#input-procedures").val(objEvent.procedures);
         }         
      },

      preConfirm: () => {
         const procedures = $("#input-procedures").val().map(item => parseInt(item))
         const newEventObj = {
            title: $("#input-client").val(),
            employeeId: parseInt($("#input-emp").val()),
            salonId: salonId,
            procedures: procedures              
         }

         if(objEvent) newEventObj.id = objEvent.id;
         return newEventObj;
      }
    }); 
}