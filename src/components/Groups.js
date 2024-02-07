import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";

const Groups = ({room}) => {

    const [groups, setGroups] = useState([]);
    const groupsUsers = collection(db, "groupsUsers");

    useEffect(() => {
        const queryGroupsUsers = query(groupsUsers, where("user", "==", auth.currentUser.email));
        const unsuscribe = onSnapshot(queryGroupsUsers, (snapshot) => {
            console.log(snapshot.docs);
            const newGroups = [];
            snapshot.forEach((doc) => {
                newGroups.push({...doc.data(), id: doc.id});
            });
            setGroups(newGroups);
        })

        return () => unsuscribe();
    }, [room])

    const oldGroups = groups.map((group) => {
        return (
            <div 
                className={`group`}
                key={group.id}
            >
                <p className="group-name">{group.room}</p>
            </div>
        )
    })

    return (
        <div>
        <h1>Groups</h1>
        {oldGroups}
        </div>
    );
}

export default Groups;