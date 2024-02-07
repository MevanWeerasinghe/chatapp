import '../styles/Groupchat.css'
import CreateGroupChat from '../components/CreateGroupChat';
import JoinGroupChat from '../components/JoinGroupChat';
import { useState, useRef, useEffect} from 'react';
import Groups from '../components/Groups';

const Groupchat = ({room, setRoom}) => {

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
                    {createGroupClicked && <CreateGroupChat setRoom={setRoom} />}
                </div>
                <div 
                    className='join-group-chat-sec'
                    onClick={() => setJoinGroupClicked(true)}
                    ref={joinGroupChatRef}
                >
                    <div>Join a Group Chat</div>
                    {joinGroupClicked && <JoinGroupChat setRoom={setRoom} />}
                </div>
            </div>
            <Groups room={room} />
        </div>
    )
}

export default Groupchat


// {/* <Chat room={room} setRoom={setRoom} /> */}