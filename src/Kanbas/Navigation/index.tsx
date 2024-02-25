import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaBook, FaCalendarAlt, FaInbox, FaHistory, FaFilm, FaUsers, FaQuestionCircle, FaRegUserCircle, FaRegCalendarAlt } from 'react-icons/fa';
import './index.css';
import logo from './northeastern-logo.png';

const KanbasNavigation = () => {
  const { pathname } = useLocation();

  const renderIcon = (label: string, IconComponent: React.ElementType) => {
    const isActive = pathname.includes(label);
    const iconStyle = {
      color: isActive && label === 'Account' ? 'gray' : '#D41B2C', // Applying color conditionally
      fontSize: label === 'Help' ? '30px' : '26px', // Adjust fontSize here
    };

    // Log font size if label is "Help"
    if (label === 'Help') {
      console.log('Font size of Help icon:', iconStyle.fontSize);
    }

    return <IconComponent style={iconStyle} />;
  };

  const links = [
    { label: 'Account', icon: FaRegUserCircle },
    { label: 'Dashboard', icon: FaTachometerAlt },
    { label: 'Courses', icon: FaBook },
    { label: 'Calendar', icon: FaRegCalendarAlt },
    { label: 'Inbox', icon: FaInbox },
    { label: 'History', icon: FaHistory },
    { label: 'Studio', icon: FaFilm },
    { label: 'Commons', icon: FaUsers },
    { label: 'Help', icon: FaQuestionCircle },
  ];

  return (
    <div className='wd-kanbas-navigation d-none d-md-block'>
      <div className='logo-container'>
        <a href='http://northeastern.edu'>
          <img src={logo} alt='Northeastern University Logo' className='northeastern-logo' />
        </a>
      </div>
      <ul>
        {links.map((link, index) => (
          <li key={index} className={pathname.includes(link.label) ? 'wd-active' : ''}>
            <Link to={`/Kanbas/${link.label}`}>
              {renderIcon(link.label, link.icon)}
              <br/>
              <span style={{ fontSize: "12px",  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto"}}>{link.label}</span> {/* Separate styling for text */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KanbasNavigation;
