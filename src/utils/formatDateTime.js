const formatDateTime = (dateTime) => {
    //Date
   const yyyy = dateTime.slice(0,4);
   const mm = dateTime.slice(5,7);
   const dd = dateTime.slice(8,10);

   //Time
   const time = dateTime.slice(11,16);
   
  return (`${dd}-${mm}-${yyyy} ~ ${time}`)
}

export default formatDateTime