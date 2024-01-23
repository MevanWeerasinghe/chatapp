import { NavLink } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className='logo'>Webling</div>
            <ul>
                <li><NavLink to="/friend-chat">Friends</NavLink></li>
                <li><NavLink to="/group-chat">Group chat</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;