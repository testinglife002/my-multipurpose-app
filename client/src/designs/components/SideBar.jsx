// // src/app/design/_components/SideBar.jsx
// "use client";

import { useState } from "react";
// import { sideBarMenu } from "./sideBarMenu";
import SideBarSettings from "./SideBarSettings";
import "./sidebar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sideBarMenu } from "./sideBarMenu";

export default function SideBar({
  collapsed,
  setCollapsed,
}) {
  const [selectedOption, setSelectedOption] = useState(sideBarMenu[0]);
  // const [collapsed, setCollapsed] = useState(false);
   const handleMenuClick = (menu) => {
    if (menu.name === selectedOption.name) {
      // ✅ Same menu → toggle collapse
       setCollapsed((prev) => !prev);
    } else {
      // ✅ New menu → expand + switch
       setCollapsed(false);
       setSelectedOption(menu);
    }
   };

  return (
    
    <div className={`editor-sidebar ${collapsed ? "collapsed" : ""}`} style={{}} >
    {/*<div className="editor-sidebar" style={{}} >*/}
    {/*<div className={`editor-sidebar ${collapsed ? "collapsed" : ""}`} style={{}} >*/}
    {/*<div className="editor-sidebar" style={{}} >*/}
      <br/>
      {/*<button
        // className="sidebar-toggle"
        style={{marginTop:'-20px', color:'black', background:'#fff'}}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight color="black" /> : <ChevronLeft color="black" />}
      </button>*/}
      {/* LEFT ICON BAR */}
      <div className="editor-sidebar-menu">
        {sideBarMenu.map((menu) => {
          const Icon = menu.icon;
          const isActive = selectedOption.name === menu.name;

          return (
            <div
              key={menu.name}
              className={`editor-sidebar-item ${
                isActive ? "active" : ""
              }`}
              // onClick={() => setSelectedOption(menu)}
               onClick={() => handleMenuClick(menu)}
            >
              <Icon size={20} />
              <span>{menu.name}</span>
            </div>
          );
        })}
      </div>

      {/* SETTINGS PANEL 
     {!collapsed && (
        <SideBarSettings selectedOption={selectedOption} />
      )}*/}

      <SideBarSettings selectedOption={selectedOption} />
      
    </div>
  );
}
