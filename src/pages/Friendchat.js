import Friends from '../components/Friends';
import AddFriend from '../components/AddFriend';
import { useState } from 'react';

const FriendChat = ({setCurrentFriend}) => {

    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className='sub-menu'>
            <AddFriend isClicked={isClicked} setIsClicked={setIsClicked} />
            <Friends setCurrentFriend={setCurrentFriend} isClicked={isClicked} />
        </div>
    );
};

export default FriendChat;
