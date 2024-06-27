import React from "react";
import "./horizontalMenu.css";
import { NavLink } from "react-router-dom";

const HorizontalMenu = () => {
  return (
    <div className="horizontal-menu-container">
      <NavLink
        to="/trip/add/basicTripConfig"
        className={({ isActive = true }) =>
          isActive ? "horizontal-menu-active" : "sidebar-menu-inactive"
        }
      >
        <div className="horizontal-menu-item">Basic config</div>
      </NavLink>
      <NavLink
        to="/trip/add/route"
        className={({ isActive = true }) =>
          isActive ? "horizontal-menu-active" : "sidebar-menu-inactive"
        }
      >
        <div className="horizontal-menu-item">Path / Route</div>
      </NavLink>
      <NavLink
        to="/trip/add/fare"
        className={({ isActive = true }) =>
          isActive ? "horizontal-menu-active" : "sidebar-menu-inactive"
        }
      >
        <div className="horizontal-menu-item">Fare / Price</div>
      </NavLink>
      <NavLink
        to="/trip/add/operatingDays"
        className={({ isActive = true }) =>
          isActive ? "horizontal-menu-active" : "sidebar-menu-inactive"
        }
      >
        <div className="horizontal-menu-item">Operating Days</div>
      </NavLink>
      <NavLink
        to="/trip/add/reservation"
        className={({ isActive = true }) =>
          isActive ? "horizontal-menu-active" : "sidebar-menu-inactive"
        }
      >
        <div className="horizontal-menu-item">Reservation</div>
      </NavLink>
    </div>
  );
};

export default HorizontalMenu;
