import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
import Message from "../Message";

const ChatPages = ({ room, setRoom }) => {
  const [message, setMessage] = useState([]);

  const mesajK = async (e) => {
    e.preventDefault();

    if (!room) {
      console.error("Room is not set");
      return;
    }

    const messageCol = collection(db, "message");

    try {
      await addDoc(messageCol, {
        text: e.target[0].value,
        room: room,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
        },
        photo: auth.currentUser.photoURL,
        date: serverTimestamp(),
      });
      console.log("Document successfully written:", {
        text: e.target[0].value,
        room: room,
        author: {
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
        },
        photo: auth.currentUser.photoURL,
        date: serverTimestamp(),
      });
      e.target[0].value = ""; // Mesaj gönderildikten sonra input alanını temizle
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    if (!room) {
      console.error("Room is not set");
      return;
    }

    const messageCol = collection(db, "message");

    const q = query(
      messageCol,
      where("room", "==", room),
      orderBy("date", "desc")
    );

    console.log("Query executed for room:", room); // Sorgunun çalıştığını logluyoruz

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tempM = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          console.log("Fetched doc: ", data); // Her bir belgeyi logluyoruz
          tempM.push(data);
        });
        console.log("Fetched messages: ", tempM);
        setMessage(tempM); // Gelen mesajları state'e güncelleyin
      },
      (error) => {
        console.error("Error fetching documents: ", error);
      }
    );

    return () => {
      console.log("Unsubscribing from snapshot");
      unsubscribe(); // Bileşen unmount edildiğinde dinleyiciyi temizleyin
    };
  }, [room]); // room bağımlılık olarak eklendi

  return (
    <div className="home">
      <header>
        <p>{auth.currentUser.displayName}</p>
        <p>{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>
      <main>
        {message.length > 0 ? (
          message.map((data, i) => <Message data={data} key={i} />)
        ) : (
          <p>No messages yet</p>
        )}
      </main>
      <form onSubmit={mesajK}>
        <input type="text" placeholder="Mesajınızı yazınız" />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPages;
