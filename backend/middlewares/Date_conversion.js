
export default function DateConversion(dateString){

   const[day,month,year] = dateString.split('-').map(Number);

   const givenDate = new Date(year ,month-1 ,day);


  return givenDate;
       

}