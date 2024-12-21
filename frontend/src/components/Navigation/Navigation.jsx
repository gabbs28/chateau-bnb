import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className={'navigation'}>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <NavLink to="/spots/new">New Spots Form</NavLink>
      <NavLink to="/spots/current">Manage User Spots</NavLink>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </div>
  );
}

export default Navigation;