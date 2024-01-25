import '../styles/Friendchat.css';
import Friends from '../components/Friends';
import { useState } from 'react';

const FriendChat = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async (event) => {
        event.preventDefault();
        setIsClicked(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsClicked(false)
    }

    return (
        <div>
            <div onClick={handleClick} className={`add-friend ${isClicked ? "clicked" : ""}`}>+ Add a Friend</div>
            {isClicked && 
            <div className='add-friend-overlay'>
                <form className='add-friend-form' onSubmit={handleSubmit} >
                    <input type='text' className='add-friend-email' placeholder='Enter email of your friend' />
                    <button className='add-friend-email-button' type="submit" >Add</button>
                </form>
            </div>
            }
            <Friends />
        </div>
    );
};

export default FriendChat;
