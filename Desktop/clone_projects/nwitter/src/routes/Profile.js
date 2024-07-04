import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = ({userObj}) =>{
    const [myNweets, setMyNweets] = useState([]);

    const navigate = useNavigate()

    const onLogOutClick =() => {
        authService.signOut();
        navigate("/");
    };

    const getMyNweets = async () => {
        const nweets = await dbService.collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt", "asc")
        .get();

        console.log(nweets.docs.map((doc) => doc.data()));
        const newArray = nweets.docs.map((doc) => ({...doc.data()}));
        //console.log(myNweets[0].text);
        //console.log(myNweets[1].text);
        setMyNweets(newArray);
    };

    useEffect(() => {getMyNweets();}, []);

    return(
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        <div>
            {myNweets.map((myNweet) => (
                <div key={myNweet.id}>
            <h4>
                {myNweet.text}
            </h4>
            {myNweet.attachmentUrl &&(
                <img src={myNweet.attachmentUrl} width="100px" height="100px"/>
            )}
            </div>
        ))}
        </div>
        </>
    );
};

export default Profile;