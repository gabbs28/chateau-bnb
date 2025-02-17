import './Navigation.css';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';
import chateauLogo from './chateauLogo.png'
import { FaUserCircle } from 'react-icons/fa';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);


  return (
    <div className={'navigation'}>
      <Link to='/'>
        <img src={chateauLogo} height={60}></img>
      </Link>
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <NavLink to="/spots/new">New Spots Form</NavLink> <br />
          <NavLink to="/spots/current">Manage User Spots</NavLink>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
      </div>
      <div>
        <button className='nav-button'>

          <div className='imgs'>
            <img src="https://www.svgrepo.com/show/313139/hamburger-menu.svg" alt="menu" width={25}/>
            <img src="https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png" alt="profile" width={25}/>
          </div>
        </button>

      </div>
    </div>
  );
}

export default Navigation;