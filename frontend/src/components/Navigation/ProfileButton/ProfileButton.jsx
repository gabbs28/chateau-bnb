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

    const toggleMenu = event => {
        event.preventDefault();
        event.stopPropagation();

        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) {
            return;
        }

        const closeMenu = event => {
            if (ulRef.current && !ulRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const login = (event, credential, password) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(sessionActions.login({credential, password}))
            .then(() => toggleMenu(event))
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
                        <span>{user.email}</span>
                        <div>---</div>
                        <Link to='/spots/current'>Manage Spots</Link>
                        <div>---</div>
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
                        <button
                            onClick={event => login(event, 'Demo-lition', 'password')}
                        >
                            Demo Login
                        </button>
                        <button
                            onClick={event => login(event, 'FakeUser1', 'password2')}
                        >
                            Fakeuser1
                        </button>
                        <button
                            onClick={event => login(event, 'FakeUser2', 'password3')}
                        >
                            Fakeuser2
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileButton;