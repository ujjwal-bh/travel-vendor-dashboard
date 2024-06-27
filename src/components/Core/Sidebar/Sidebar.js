import React from "react";
import {
  FaAlignLeft,
  FaBus,
  FaCalendarMinus,
  FaChartPie,
  FaCity,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../context";
import "./sidebar.css";

const Sidebar = () => {
  const { verifyLogin, sidebarActive, setSidebarActive } = useGlobalContext();

  const handleClick = () => {
    setSidebarActive((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    verifyLogin();
  };
  return (
    <div
      className={`sidebar-container ${
        sidebarActive && "active"
      } light-bg-900 p-y-l`}
    >
      <div className="sidebar-title h2 font-bold primary-500 p-x-l p-y-l">
        Bims
      </div>
      <NavLink
        to="/details"
        className={({ isActive = true }) =>
          isActive ? "sidebar-menu-active" : "sidebar-menu-inactive"
        }
        onClick={handleClick}
      >
        <div className="singlemenu-container p-y-m h5 ">
          <div className="singlemenu-icon">
            <FaAlignLeft />
          </div>
          <div className="">Details</div>
        </div>
      </NavLink>
      <NavLink
        to="/operatingCity"
        className={({ isActive = true }) =>
          isActive ? "sidebar-menu-active" : "sidebar-menu-inactive"
        }
        onClick={handleClick}
      >
        <div className="singlemenu-container p-y-m h5">
          <div className="singlemenu-icon">
            <FaCity />
          </div>
          <div className="">Operating City</div>
        </div>
      </NavLink>
      <NavLink
        to="/busConfig"
        className={({ isActive = true }) =>
          isActive ? "sidebar-menu-active" : "sidebar-menu-inactive"
        }
        onClick={handleClick}
      >
        <div className="singlemenu-container p-y-m h5">
          <div className="singlemenu-icon">
            <FaBus />
          </div>
          <div className="">Bus Configuration</div>
        </div>
      </NavLink>
      <NavLink
        to="/trip/all"
        className={({isActive })=> 
        isActive? "sidebar-menu-active": "sidebar-menu-inactive"
      }
      onClick={handleClick}
        >

      <div className="singlemenu-container p-y-m h5">
        <div className="singlemenu-icon">
          <FaCalendarMinus />
        </div>
        <div className="">Trip Schedule</div>
      </div>
        </NavLink>
      <div className="singlemenu-container p-y-m h5">
        <div className="singlemenu-icon">
          <FaChartPie />
        </div>
        <div className="">Booking Report</div>
      </div>
      <div className="singlemenu-container p-y-m h5" onClick={handleLogout}>
        <div className="singlemenu-icon">
          <FaSignOutAlt />
        </div>
        <div className="">Logout</div>
      </div>
    </div>
  );
};

export default Sidebar;
