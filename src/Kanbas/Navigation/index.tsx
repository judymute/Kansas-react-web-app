import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import './breadcrumb';
import BreadcrumbComponent from './breadcrumb';
import logo from './northeastern-logo.png';
import account from "./account-user-icon.png";
import dashboard from "./dashboard-icon.png";
import courses from "./courses-icon.png";
import calendar from "./calendar-icon.png";
import inbox from "./inbox-icon.png";
import histoy from "./history-icon.png";
import studio from "./studio-icon.png";
import commons from "./commons-icon.png";
import help from "./help-icon.png";

const KanbasNavigation = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState('');
  const [showBreadcrumb, setShowBreadcrumb] = useState(false);
  const [doubleClicked, setDoubleClicked] = useState(false);

  const links = [
    { label: 'Account', image: account, className: 'account-icon' },
    { label: 'Dashboard', image: dashboard, className: 'dashboard-icon' },
    { label: 'Courses', image: courses, className: 'courses-icon' },
    { label: 'Calendar', image: calendar, className: 'calendar-icon' },
    { label: 'Inbox', image: inbox, className: 'inbox-icon' },
    { label: 'History', image: histoy, className: 'history-icon' },
    { label: 'Studio', image: studio, className: 'studio-icon' },
    { label: 'Commons', image: commons, className: 'commons-icon' },
    { label: 'Help', image: help, className: 'help-icon' },
  ];

  const toggleBreadcrumb = () => {
    setShowBreadcrumb(!showBreadcrumb);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element) {
        if (!event.target.closest('.breadcrumb-container') && !event.target.closest('.courses-tab')) {
          setShowBreadcrumb(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const currentTab = links.find((link) => pathname.includes(link.label));
    if (currentTab) {
      setActiveTab(currentTab.label);
    }
  }, [pathname]);

  const handleTabClick = (label: string) => {
    setActiveTab(label);
    if (label === 'Courses') {
      toggleBreadcrumb();
    } else {
      setShowBreadcrumb(false);
    }
  };

  const handleDoubleClick = () => {
    setDoubleClicked(true);
    setTimeout(() => {
      setDoubleClicked(false);
    }, 500);
  };

  return (
    <div className='navigation-container'>
          <div className='wd-kanbas-navigation d-none d-md-block'>
      <div className='logo-container'>
        <a href='http://northeastern.edu'>
          <img src={logo} alt='Northeastern University Logo' className='northeastern-logo' />
        </a>
      </div>
      <ul>
        {links.map((link, index) => (
          <li
            key={index}
            className={`${activeTab === link.label ? 'wd-active' : ''} ${
              activeTab === link.label && doubleClicked ? 'wd-double-clicked' : ''
            }`}
            onClick={() => handleTabClick(link.label)}
            onDoubleClick={handleDoubleClick}
          >
            {link.label === 'Courses' ? (
              <div className="courses-tab">
                <img src={link.image} alt={link.label} className={link.className} />
                <br />
                <span className="tab-label">{link.label}</span>
              </div>
            ) : (
              <Link to={`/Kanbas/${link.label}`}>
                <div>
                  <img src={link.image} alt={link.label} className={link.className} />
                  <br />
                  <span className="tab-label">{link.label}</span>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
      {showBreadcrumb && <BreadcrumbComponent showBreadcrumb={showBreadcrumb} />}
    </div>

    </div>

  );
};

export default KanbasNavigation;