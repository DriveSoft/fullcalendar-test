export const getMinutesFromProcedures = (proceduresIdsArray) => {
   return gl_procedures.reduce(
      (accumulator, currentValue) => {
         if(proceduresIdsArray.includes(currentValue.id)) return accumulator + currentValue.time;
         return accumulator;
      },
      0
    );
}

export const getNewId = (data) => {
   let newId = 0;
   data.forEach(item => {
      if(item.id > newId) newId = item.id;
   });
   return newId+1;
}


export const gl_salons = [
   {
      id: 1,
      name: "Salon1"
   },
   {
      id: 2,
      name: "Salon2"
   },   
   {
      id: 3,
      name: "Salon3"
   }  
]

export const gl_employee = [
   {
      id: 1,
      name: "Marina",
      salonId: 1
   },
   {
      id: 2,
      name: "Julia",
      salonId: 1
   },  
   {
      id: 3,
      name: "Anna",
      salonId: 2
   },
   {
      id: 4,
      name: "Jana",
      salonId: 2
   },           

];

export const gl_procedures = [
   {
      id: 1,
      name: "Haircut",
      time: 45
   },
   {
      id: 2,
      name: "Hair dyeing",
      time: 60
   },
   {
      id: 3,
      name: "Manicure",
      time: 50
   },
   {
      id: 4,
      name: "Pedicure",
      time: 120
   },                                                   
];

export const dataEvents = [
   {
      id: 1,
      title: "Elena",
      start: "2023-06-22T09:00:00",
      end: "2023-06-22T10:00:00", 
      procedures: [1, 2],
      salonId: 1,
      employeeId: 1

   },
   {
      id: 2,
      title: "Marina",
      start: "2023-06-22T10:00:00",
      end: "2023-06-22T10:30:00",
      procedures: [2, 3],
      salonId: 1,
      employeeId: 2            
   },    
   {
      id: 3,
      title: "Julia",
      start: "2023-06-22T10:30:00",
      end: "2023-06-22T11:30:00",
      procedures: [4],
      salonId: 1,
      employeeId: 1                         
   },  
   
   {
      id: 4,
      title: "Test1",
      start: "2023-06-23T10:00:00",
      end: "2023-06-23T10:30:00",
      procedures: [2, 3],
      salonId: 2,
      employeeId: 3            
   },    
   {
      id: 5,
      title: "Test2",
      start: "2023-06-23T10:30:00",
      end: "2023-06-23T11:30:00",
      procedures: [4],
      salonId: 2,
      employeeId: 4                         
   },   
]