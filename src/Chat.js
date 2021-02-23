import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { actionTypes } from "./reducer";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from 'firebase';

import {useStateValue} from "./StateProvider";

//import Picker from 'emoji-picker-react';

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user},{ togglerState } , dispatch] = useStateValue();
  const [toggler, setToggler] = useState(true);
  // const [{ togglerState }, dispatch] = useStateValue();

  const [emoji, setEmoji] = useState(false);

  const addEmoji = (e) => {
    let emoji = e.native;
    setInput(input + emoji);
  };
  const checkEmojiClose = () => {
    if (emoji) {
      setEmoji(false);
    }
  };
   
    useEffect(() => {
      setToggler(!toggler);
    }, [togglerState]);


    const handleDrawerToggle = () => {
      setToggler(!toggler);
      dispatch({
        type: actionTypes.SET_TOGGLER,
        togglerState: togglerState + 1,
      });
    };


  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMsg = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
    console.log("You typed >>>", input);

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {messages.length!==0?
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        .toUTCString() :" Loading"}
                    </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div
            className="chat__body scrollbar-juicy-peach"
            onClick={checkEmojiClose}
          ></div>

      <div className="chat_body">
        {messages.map((message)=>(
        <p className={`Chat_msg ${ message.name == user.displayName && 'chat_receiver'}`}>
        <span className="chat_name">{message.name}</span>
        {message.message}
          <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
        </p>
        ))}
      </div>

      <div className="chat_footer">
        {/* <InsertEmoticonIcon /> */}
        <IconButton>
              {/* <InsertEmoticonIcon /> */}
              <InsertEmoticonIcon
                className="yellow"
                onClick={() => setEmoji(!emoji)}
              />
              {emoji ? <Picker onSelect={addEmoji} /> : null}
            </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message "
            type="text"
            onClick={checkEmojiClose}
          />
          <button onClick={sendMsg} type="submit">
            Send a message
          </button>
        </form>

        <MicIcon />
  
      </div>
    </div>
  );
}

export default Chat;
