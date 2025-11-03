// frontend/src/pages/home/Home.jsx

import CrissCrossSwiperDemo from "../../components/home/CrissCrossSwiperDemo";
import GordiusHeader from "../../components/home/GordiusHeader";
import GordiusHeaderAlt from "../../components/home/GordiusHeaderAlt";
import NavbarUI from "../../components/NavbarUI";


export default function Home({ user, setUser }) {
  return (
    <div >
      
      <br/><br/> Home - public <br/><br/>

      <div style={{ margin: '5%' }}>
        <CrissCrossSwiperDemo />
      </div>
      <br/><br/>
    </div>
    );
}