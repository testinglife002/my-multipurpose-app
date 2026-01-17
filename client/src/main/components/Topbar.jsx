// // src/main/components/4️⃣ Topbar.jsx (Custom CSS + Icons)
import { FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";
import "./topbar.css";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="top-left">
        <FaFacebook />
        <FaTwitter />
        <FaPinterest />
      </div>

      <ul className="top-menu">
        <li>HOME</li>
        <li>ABOUT</li>
        <li>CONTACT</li>
        <li>WRITE</li>
      </ul>

      <div className="top-right">
        <img src="https://picsum.photos/40" alt="" />
        <span>Username</span>
      </div>
    </div>
  );
}
