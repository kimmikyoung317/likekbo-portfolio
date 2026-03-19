import React from 'react';
import './SubVisual.css'; 

import subBgImage from '../assets/sub_bg.jpg'; 

const SubVisual = ({ title, activeTab }) => {
  return (
    <div 
      className="sub-visual-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${subBgImage})`
      }}
    >
      <div className="sub-visual-content">
        <nav className="breadcrumb">
         
          PRODUCT &gt; {activeTab ? activeTab.toUpperCase() : 'DETAIL'}
        </nav>
        <h1 className="team-big-title">
          {title || "PRODUCT DETAIL"}
        </h1>
      </div>
    </div>
  );
};

export default SubVisual;