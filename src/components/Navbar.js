import '../styles/Navbar.css'
import friend from '../icon/icons8-person-30.png'
import group from '../icon/icons8-group-30.png'
import profile from '../icon/icons8-male-user-48.png'
import menu from '../icon/icons8-menu-vertical-30.png'
import PopUpMenu from './PopUpMenu'
import { useState } from 'react'

const Navbar = ({setChatType, handleLogout}) => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        console.log(isClicked);
    }

    return (
        <nav className="navbar">
            <div className='logo'>Webling</div>
            <ul className='icon-list'>
                <li><img className='icons' src={friend} alt='icon1' onClick={() => setChatType("friend-chat")} /></li>
                <li><img className='icons' src={group} alt='icon2' onClick={() => setChatType("group-chat")} /></li>
                <li><img className='icons' src={profile} alt='icon3' /></li>
                <li><img className='icons' src={menu} alt='icon4' onClick={handleClick} /></li>
            </ul>
            {isClicked ? <PopUpMenu handleLogout={handleLogout} setIsClicked={setIsClicked} /> : null}
        </nav>
    );
}

export default Navbar;