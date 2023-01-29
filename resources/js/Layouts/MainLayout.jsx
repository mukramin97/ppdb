import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function MainLayout({ auth, header, children }) {
  const [toggleClass, setToggleClass] = useState(false);
  const [showClass, setShowClass] = useState(false);
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  // Setting Menu Toggle
  const toggle = () => {
    setToggleClass(prevState => !prevState);
  }

  // Setting Show Profile Menu Dropdown
  const show = () => {
    setShowClass(prevState => !prevState);
  }

  // Setting Current Active Menu
  useEffect(() => {
    const handleClick = e => {
      setActiveTab(e.target.getAttribute('href'));
    };

    const links = document.querySelectorAll('.nav-item');
    links.forEach(link => link.addEventListener('click', handleClick));
    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick));
    };
  }, []);

  return (
    <div>
      {/* Wrap a whole Application */}
      <div id='wrapper'>
        {/* Start Sidebar */}
        <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggleClass ? 'toggled' : ''}`} id='accordionSidebar'>
          <a className='sidebar-brand d-flex align-items-center justify-content-center' href="#">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink">
              </i>
            </div>
          </a>

          {/* Start Sidebar Menu */}
          {/* Divider */}
          <hr className='sidebar-divider my-0' />

          <li className={`nav-item ${activeTab === '/' ? 'active' : ''}`}>
            <Link className='nav-link' href="/">
              <i className='fas fa-fw fa-tachometer-alt'>
              </i>
              <span>Dashboard</span>
            </Link>
          </li>
          
          <hr className="sidebar-divider"/>

          <div className="sidebar-heading">SETTING</div>

          <li className={`nav-item ${activeTab === '/school' ? 'active' : ''}`}>
            <Link className='nav-link' href='/school'>
              <i className='fas fa-fw fa-tachometer-alt'>
              </i>
              <span>School</span>
            </Link>
          </li>

          <li className='nav-item'>
            <Link className='nav-link' href="#">
              <i className='fas fa-fw fa-cog'>
              </i>
              <span>Componensts</span>
            </Link>
          </li>

          <hr className='sidebar-divider d-none d-md-block'></hr>
          <div className='text-center d-none d-md-inline'>
            <button className='rounded-circle border-0' id='sidebarToggle' onClick={toggle}></button>
          </div>

        </ul>
        {/* End Sidebar Menu */}

        <div id='content-wrapper' className="d-flex flex-column">
          <div id='content'>

            {/* Start Navbar Menu */}
            <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
              <button id='sidebarToggleTop' className='btn btn-link d-md-none rounded-circle mr-3' onClick={toggle}>
                <i className='fa fa-bars'></i>
              </button>

              <ul className='navbar-nav ml-auto'>
                <li className="nav-item dropdown no-arrow mx-1">
                  <a className='nav-link dropdown-toggle' href="#">
                    <i className='fas fa-bell fa-fw'></i>
                  </a>
                </li>

                {/* Divider */}
                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Menu Profile */}
                <li className='nav-item dropdown no-arrow'>
                  <a href="#" className="nav-link dropdown-toggle" id="userDropdown" onClick={show}>
                    <span className='mr-2 d-none d-lg-inline text-gray-600 small'>{auth.user.name}</span>
                    <img className='img-profile rounded-circle' src="SBAdmin/img/undraw_profile.svg" alt="" />
                  </a>
                  <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${showClass ? 'show' : ''}`} aria-labelledby="userDropdown">

                    {/* Edit Profile */}
                    <Link className="dropdown-item" href={route('profile.edit')}>
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </Link>

                    {/* Divider */}
                    <div className="dropdown-divider"></div>

                    {/* Logout */}
                    <Link className="dropdown-item" href={route('logout')} method="post" as="button" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End Navbar Menu */}

            {/* Start Content */}
            <div className="container-fluid">
              {children}
            </div>
            {/* End Content */}
          </div>

          {/* Start Footer */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © Your Website 2020</span>
              </div>
            </div>
          </footer>
          {/* End Footer */}
        </div>


      </div>
    </div>
  )
}

