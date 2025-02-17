import {useState, useEffect, useRef} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {FaBars, FaUserCircle} from 'react-icons/fa';

import OpenModalButton from "../../OpenModalButton/index.js";
import LoginFormModal from "../../LoginFormModal/index.js";
import SignupFormModal from "../../SignupFormModal/index.js";

import * as sessionActions from '../../../store/session';

import './ProfileButton.css';

function ProfileButton({user}) {
    const ulRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) {
            return;
        }

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const demoLogin = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
            .then(toggleMenu)
    };

    const closeMenu = () => {
        setShowMenu(false);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
            .then(() => {
                closeMenu();
                navigate('/');
            });
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <div className={'profile-button-container'}>
            <button onClick={toggleMenu} className='profile-button'>
              <FaBars />
              <FaUserCircle />
            </button>
            <div className={ulClassName} ref={ulRef}>
                {user ? (
                    <div className='user-details'>
                        <span>Hello, {user.firstName}!</span>
                        <span>Email: {user.email}</span>
                        <button className='manage-spots'>
                            <Link to='/spots/current'>Manage Spots</Link>
                        </button>
                        <button onClick={logout} className='logout'>
                            Log Out
                        </button>
                    </div>
                ) : (
                    <div className='auth-buttons'>
                        <OpenModalButton
                            buttonText="Log In"
                            onButtonClick={closeMenu}
                            modalComponent={<LoginFormModal/>}
                        />
                        <OpenModalButton
                            buttonText="Sign Up"
                            onButtonClick={closeMenu}
                            modalComponent={<SignupFormModal/>}
                        />
                        <button onClick={demoLogin}>Demo Login</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;