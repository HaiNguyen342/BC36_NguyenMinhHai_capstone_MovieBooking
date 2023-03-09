import React from "react";
import Banner from "./Banner";
import CinemaList from "./CinemaList/CinemaList";
import Showing from "./Showing";


const Home = () => {
 
  return (
    <>
      <Banner />
    
      <Showing />

      <CinemaList />

    </>
  );
};

export default Home;
