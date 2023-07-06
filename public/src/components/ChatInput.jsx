import React, { useState } from 'react';
import styled from 'styled-components';
import { BsSendFill } from 'react-icons/bs';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { Picker } from 'emoji-mart'

function ChatInput() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (event, emoji) => {
    console.log(emoji.emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>
      <form className="input-container">
        <input type="text" className="input" placeholder="Type your message here!" value={msg} onChange={(e) => { setMsg(e.target.value) }} />
        <button className="submit">
          <BsSendFill />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0.2rem;
  margin-top: 20rem;
  padding-bottom: 0.3rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      bottom: 472px;
      left: 200px;
      svg {
        cursor: pointer;
        font-size: 1.5rem;
        color: yellow;
      }
      .emoji-picker-react{
        position: absolute;
        top: -350px;
      }
    }
  }

  .input-container {
    width: 100%;
    height: 90%;
    border-radius: 0.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #ffffff34;
    border: transparent;
    input {
      width: 90%;
      height: 50%;
      color: white;
      background-color: transparent;
      border: none;
      padding: 0.4rem;
      padding-left: 0.1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
    }
    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #9a86f3;
      color: white;
      border: none;
      border-radius: 30%;
      width: 4rem;
      height: 2.5rem;
      cursor: pointer;
  
      svg {
        font-size: 1.7rem;
        color: white;
      }
    }
  }

  
`;

export default ChatInput;
