import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import axios from 'axios';
import { sendMessageRoute, getAllMessageRoute } from '../utils/APIRoutes';

function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);

  //whenever the currentChat change we want to fetch the chat of CurrentUser
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        // console.log("response: ",response);
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentChat._id]);

  const handleSendMsg = async (msg) => {
    // alert(msg);
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {
          messages.map((message) => {
            return (
              <div>
                <div className={`message ${message.fromSelf ? "sended" : "recived"}`}>
                  <div className="content">
                    <p>
                      {message.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="chat-message"><ChatInput handleSendMsg={handleSendMsg} /></div>
      <div className="chat-input"></div>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }
  .user-details {
    display: flex;
    align-items: center;
  }
  .avatar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .avatar img {
    height: 3rem;
    width: 3rem;
  }
  .username {
    h3 {
      color: white;
    }
  }
  .chat-message{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message{
      display: flex;
      align-item; center;
      .content{
        max-width: 100%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
  }
`;

export default ChatContainer;
