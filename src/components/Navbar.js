import '../styles/Navbar.css'

const Navbar = ({setChatType, handleLogout}) => {

    return (
        <nav className="navbar">
            <div className='logo'>Webling</div>
            <ul>
                <li onClick={() => setChatType("friend-chat")}>Friends</li>
                <li onClick={() => setChatType("group-chat")}>Group chat</li>
                <li>Profile</li>
                <li>      
                    <div className='logout'>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;