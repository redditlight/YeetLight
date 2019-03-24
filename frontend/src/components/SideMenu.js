import React from 'react';
import './SideMenu.css';
function SideMenu() {
  return (
      <body style={menuStyle}>
      <ul>


        <p style={settingStyle}>
          SETTINGS
        </p>
      <p>
        Model connect:
      </p>
        <p style={brightStyle}>
          Brightness
        </p>
      </ul>
      </body>
  )
}

const menuStyle = {
  textAlign: 'left',
  padding: '0px',
  fontSize: '15px'
}

const settingStyle = {
  marginTop: "50px",
  marginLeft: '60px'
}

const brightStyle = {
  marginTop: '50px',
  marginLeft: '60px'
}

export default SideMenu;
