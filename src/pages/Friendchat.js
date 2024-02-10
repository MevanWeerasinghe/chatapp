import Friends from '../components/Friends';
import AddFriend from '../components/AddFriend';
import { useState } from 'react';

const FriendChat = ({setCurrentFriend, setShowChat}) => {

    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className='sub-menu'>
            <AddFriend isClicked={isClicked} setIsClicked={setIsClicked} />
            <Friends setCurrentFriend={setCurrentFriend} isClicked={isClicked} setShowChat={setShowChat} />
        </div>
    );
};

export default FriendChat;

<div className="App">
    <div className='menu'>
        <nav className="navbar">
            <div className="pop-up-menu"></div>
        </nav>
        <div className='sub-menu'>
            <div className='add-friend-sec'></div>

            <div className="friend-list-sec">
                <div className='search-friend'></div>
            </div>
        </div>
    </div>
</div>