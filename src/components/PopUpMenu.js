import '../styles/PopUpMenu.css'
import { useEffect, useRef } from 'react';

const PopUpMenu = ({handleLogout, setIsClicked}) => {
    
    const popupMenuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close the pop-up menu when the user clicks outside of it
            if (popupMenuRef.current && !popupMenuRef.current.contains(event.target)) {
                setIsClicked(false) 
            }
        }
        // Add the mousedown event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    return (
        <div className="pop-up-menu" ref={popupMenuRef}>
            <p className='menu-item'>Mode</p>
            <p className='menu-item'>About us</p>
            <p className='menu-item' onClick={handleLogout}>Logout</p>
        </div>
    );
};

export default PopUpMenu;
