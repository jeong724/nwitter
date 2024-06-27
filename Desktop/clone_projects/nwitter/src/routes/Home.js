import { useEffect,useState } from "react";
import { dbService } from "fbase";

const Home = ({userObj}) =>{
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = {...document.data(), id : document.id};
            setNweets((prev) => [nweetObject, ...prev])
            }
            );

    }

    useEffect(() => {
        getNweets();
    }, []);

    const onSubmit = async (event)=>{
        //새로고침 방지
        event.preventDefault();
        await dbService.collection("nweets").add({
            text : nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
        });
        //초기화
        setNweet("");
    };

    const onChange = (event) =>{
        event.preventDefault();
        const{
            target:{value},
        } = event;
        setNweet(value);
    };

    return(
        <>
        <form onSubmit={onSubmit}>
            <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="what's on your mind?"
            maxLength={120}
           />
           <input type="submit" value="Nweet"/>
        </form>
        <div>
            {nweets.map((nweet)=>(
                <div key={nweet.id}>
                    <h4>{nweet.text}</h4>
                    </div>
            ))}
            </div>
        </>
    );
};

export default Home;