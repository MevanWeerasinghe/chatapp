import '../styles/Groupchat.css'
import Creategroupchat from '../components/Creategroupchat';

const Groupchat = ({setRoom}) => {

    return (
        <div className='group-chat-menu'>
            <Creategroupchat setRoom={setRoom} />
        </div>
    )
}

export default Groupchat


// {/* <Chat room={room} setRoom={setRoom} /> */}