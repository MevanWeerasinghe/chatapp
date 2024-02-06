import searchIcon from "../icon/icons8-search-50.png"
import closeIcon from "../icon/icons8-close-48.png"
import "../styles/SearchFriend.css"
import { useState } from "react";

const SearchFriend = ({friends, setFriends, isClicked}) => {

    const [allFriends, setAllFriends] = useState(null)
    const [searchPhrase, setSearchPhrase] = useState("")
    const [isSeachClicked, setIsSeachClicked] = useState(false)

    const handleChange = (event) => {
        setSearchPhrase(event.target.value);
    }

    const handleSearch = () => {
        console.log(searchPhrase);
        const matchingFriends = friends.filter(friend => friend.name.toLowerCase().includes(searchPhrase.toLowerCase()));
        setAllFriends(friends);
        setFriends(matchingFriends);
        setIsSeachClicked(true);
    }

    const handleSearchClose = () => {
        setFriends(allFriends);
        setIsSeachClicked(false);
        setSearchPhrase("");
    }

    return (
        <div className={`search-friend ${isClicked ? "clicked" : ""}`}>
            <div className="type-area">
                <input 
                    type="text" 
                    className="search-friend-input" 
                    placeholder="search friend here" 
                    onChange={handleChange} 
                    value={searchPhrase}
                />
                {isSeachClicked ? (
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