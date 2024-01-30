import React from 'react';

const PopUpMenu = ({handleLogout}) => {
    // Component logic goes here

    return (
        // JSX markup goes here
        <div>
            <div className='logout'>
                <button onClick={handleLogout}>L</button>
            </div>
        </div>
    );
};

export default PopUpMenu;
