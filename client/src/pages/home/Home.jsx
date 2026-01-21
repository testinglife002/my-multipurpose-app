// frontend/src/pages/home/Home.jsx

import CrissCrossSwiperDemo from "../../components/home/CrissCrossSwiperDemo";
import GordiusHeader from "../../components/home/GordiusHeader";
import GordiusHeaderAlt from "../../components/home/GordiusHeaderAlt";
import NavbarUI from "../../components/NavbarUI";
import './Home.css';  


export default function Home({ user, setUser }) {
  return (
    <div >
      
      <br/><br/> Home - public <br/><br/>

      {/*<div style={{ margin: '5%', overflow:'auto' }}>
        <CrissCrossSwiperDemo />
      </div>*/}
      <div className="home-slider-container">
        <CrissCrossSwiperDemo />
      </div>

      <br/><br/>
    </div>
    );
}