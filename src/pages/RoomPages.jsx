import React, { useState } from "react";
import ChatPages from "./ChatPages";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const RoomPages = ({ setIsAuth }) => {
  const [room, setRoom] = useState(null);

  const joinRoom = (e) => {
    e.preventDefault();
    const roomValue = e.target[0].value;
    if (roomValue) {
      setRoom(roomValue);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        localStorage.removeItem("TOKEN");
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  if (room) {
    return <ChatPages room={room} setRoom={setRoom} />;
  }

  return (
    <div>
      <form className="form1" onSubmit={joinRoom}>
        <h1>Chat Odası</h1>
        <p>Hangi Odaya Girecekseniz</p>
        <input type="text" required />
        <button type="submit">Giriş Yap</button>
      </form>
      <button className="ad" type="button" onClick={handleLogout}>
        Çıkış Yap
      </button>
    </div>
  );
};

export default RoomPages;
