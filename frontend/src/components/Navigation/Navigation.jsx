import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';

import chateauLogo from './chateauLogo.png'

import './Navigation.css';

function Navigation({isLoaded}) {
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    const onCreateSpot = () => {
        navigate('/spots/new')
    }

    return (
        <div className={'navigation-container'}>
            <Link to='/'>
                <img src={chateauLogo} alt={"logo"} className={'logo'}></img>
            </Link>
            <ul className={'nav'}>
                {isLoaded && (
                    <nav className='session'>
                        <li className='create-spot'>
                            {sessionUser && (<button onClick={onCreateSpot}>Create a New Spot</button>)}
                        </li>
                        <ProfileButton user={sessionUser} />
                    </nav>
                )}
            </ul>
        </div>
    );
}

export default Navigation;