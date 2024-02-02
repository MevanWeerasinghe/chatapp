import searchIcon from "../icon/icons8-search-50.png"
import closeIcon from "../icon/icons8-close-48.png"
import "../styles/SearchFriend.css"
import { useState } from "react";

const SearchFriend = ({friends, setFriends}) => {

    const [allFriends, setAllFriends] = useState(friends)
    const [searchPhrase, setSearchPhrase] = useState("")
    const [isClicked, setIsClicked] = useState(false)

    const handleChange = (event) => {
        setSearchPhrase(event.target.value);
    }

    const handleSearch = () => {
        console.log(searchPhrase);
        const matchingFriends = friends.filter(friend => friend.name.includes(searchPhrase));
        setFriends(matchingFriends);
        setIsClicked(true);
    }

    const handleSearchClose = () => {
        setFriends(allFriends);
        setIsClicked(false);
        setSearchPhrase("");
    }

    return (
        <div className="search-friend">
            <div className="type-area">
                <input 
                    type="text" 
                    className="search-friend-input" 
                    placeholder="search friend here" 
                    onChange={handleChange} 
                    value={searchPhrase}
                />
                {isClicked ? (
                    <button className="search-friend-button" onClick={handleSearchClose} >
                        <img className="search-icon" src={closeIcon} alt="close"/>
                    </button>
                ) : (
                    <button className="search-friend-button" onClick={handleSearch} >
                        <img className="search-icon" src={searchIcon} alt="search"/>
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchFriend;