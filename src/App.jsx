import React, { useState } from "react";
import LoginPages from "./pages/LoginPages.jsx";
import RoomPages from "./pages/RoomPages.jsx";
import ChatPages from "./pages/ChatPages.jsx";
const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));
  const [room, setRoom] = useState(null);
  if (!isAuth) return <LoginPages setIsAuth={setIsAuth} />;

  return (
    <div className="container">
      {!room ? (
        <RoomPages setIsAuth={setIsAuth} setRoom={setRoom} />
      ) : (
        <ChatPages room={room} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
