import "../styles/Groups.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const Groups = ({room, setRoom}) => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groups, setGroups] = useState([]);
    const groupsUsers = collection(db, "groupsUsers");

    useEffect(() => {
        const queryGroupsUsers = query(groupsUsers, where("user", "==", auth.currentUser.email));
        const unsuscribe = onSnapshot(queryGroupsUsers, (snapshot) => {
            const newGroups = [];
            snapshot.forEach((doc) => {
                newGroups.push({...doc.data(), id: doc.id});
            });
            setGroups(newGroups);
        })

        return () => unsuscribe();
    }, [room])

    const oldGroups = groups.map((group) => {

        const handleGroupClick = () => {
            setRoom(group.room)
            setSelectedGroup(group.room)
        }

        return (
            <div 
                className={`group ${selectedGroup === group.room ? "clicked" : ""}`}
                key={group.id}
                onClick={handleGroupClick}
            >
                <div className="group-dp">Add DP</div>
                <p className="group-name">{group.room}</p>
            </div>
        )
    })

    return (
        <div className="groups">
            <h1 className="joined-group-label">Joined Groups</h1>
            {oldGroups}
        </div>
    );
}

export default Groups;