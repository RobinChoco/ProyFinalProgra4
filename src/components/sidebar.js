import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import './sidebar.css';
import Photobook from './home/images/Photobook.png';

function Sidebar(props) {
  // Obtener el estado inicial del sidebar del localStorage, si está disponible
  const initialState = localStorage.getItem('sidebarExpanded') === 'true';

  // Estado para controlar si la barra lateral está expandida o no
  const [isExpanded, setIsExpanded] = useState(initialState);

  // Función para alternar la expansión de la barra lateral y guardar el estado en localStorage
  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    localStorage.setItem('sidebarExpanded', newState.toString());
  };

  const sidebarItems = [
    { title: 'Publicaciones destacadas', link: '/', icon: 'fas fa-home' },
    { title: 'Conexiones', onClick: props.onFriendsClick, icon: 'fas fa-user-friends' },
  ];

  return (
    <>
      <div className={`sidebar ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
        <div className="sidebar-header my-2">
          <img src={Photobook} alt="Logo" className="sidebar-logo" width={'65px'} height={'65px'} style={{ borderRadius: '65px' }} />
        </div>
        <Nav defaultActiveKey="/home" className={`flex-column ${isExpanded ? 'show' : ''}`}>
          {sidebarItems.map((item, index) => (
            <Nav.Link key={index} href={item.link} onClick={item.onClick}>
              <i className={item.icon}></i>
              {item.title}
            </Nav.Link>
          ))}
        </Nav>
      </div>
    </>
  );
}

export default Sidebar;
