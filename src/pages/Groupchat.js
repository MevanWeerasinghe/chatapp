import '../styles/Groupchat.css'
import Creategroupchat from '../components/Creategroupchat';
import { useState, useRef, useEffect} from 'react';

const Groupchat = ({setRoom}) => {

    const [createGroupClicked, setCreateGroupClicked] = useState(false)
    const [joinGroupClicked, setJoinGroupClicked] = useState(false)
    const createGroupChatRef = useRef();
    const joinGroupChatRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (createGroupChatRef.current && !createGroupChatRef.current.contains(event.target)) {
                setCreateGroupClicked(false) 
            }
            if (joinGroupChatRef.current && !joinGroupChatRef.current.contains(event.target)) {
                setJoinGroupClicked(false) 
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='group-chat-menu'>
            <div className='group-chhat-submenu'>
                <div 
                    className='create-group-chat-sec' 
                    onClick={() => setCreateGroupClicked(true)}
                    ref={createGroupChatRef}
                >
                    <div>Create a Group Chat</div>
                    {createGroupClicked && <Creategroupchat setRoom={setRoom} />}
                </div>
                <div 
                    className='join-group-chat-sec'
                    onClick={() => setJoinGroupClicked(true)}
                    ref={joinGroupChatRef}
                >
                    <div>Join a Group Chat</div>
                    {joinGroupClicked && <Creategroupchat setRoom={setRoom} />}
                </div>
            </div>
        </div>
    )
}

export default Groupchat


// {/* <Chat room={room} setRoom={setRoom} /> */}