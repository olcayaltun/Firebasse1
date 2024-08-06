import { auth } from "./firebase/config";

const Message = ({ data }) => {
  console.log("Rendering Message: ", data);
  console.log(auth.currentUser.uid, data.author.id);
  if (auth.currentUser.uid === data.author.id)
    return <p className="msg-user">{data.text}</p>;

  return (
    <div className="msg-other">
      <div className="user-info">
        {data.author.photo && <img src={data.author.photo} alt="User" />}
        <span>{data.author.name}</span>
      </div>
      <p className="msg-text">{data.text}</p>
    </div>
  );
};

export default Message;
