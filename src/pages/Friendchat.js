import Friends from '../components/Friends';
import AddFriend from '../components/AddFriend';

const FriendChat = ({setCurrentFriend}) => {

    return (
        <div className='sub-menu'>
            <AddFriend />
            <Friends setCurrentFriend={setCurrentFriend} />
        </div>
    );
};

export default FriendChat;
