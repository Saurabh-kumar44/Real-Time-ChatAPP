import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import logo from '../assets/logo.svg'

function Contact({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);

    }
  }, [currentUser,contacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }



  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h3>Snappy</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((contact, index) => {
                  return (
                    <div
                      className={`contact ${index === currentSelected ? 'selected' : ''}`}
                      key={index}onClick={() => changeCurrentChat(index, contact)}> 
                      <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt="avatar" />
                      </div>
                      <div className="username">{contact.username}</div>
                    </div>
                  )
                })};
            </div>
            <div className='current-user'>
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar" className='cUser' />
              </div>
              <h2 className="username">{currentUserName}</h2>
            </div>
          </Container>
        )
      }
    </>
  )
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 2rem;
  }
  h3 {
    color: white;
    text-transform: uppercase;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;
  &::-webkit-scrollbar{
    width: 0.2rem;
    &-thumb{
      background-color: #ffffff39;
      width: 0.2rem;
      border-radius:1rem;
    }
  }
  .contact.selected {
    background-color: #9186f3;
  }
  .contact{
    background-color:#ffffff36;
    min-height: 5rem;
    width: 90%;
    cursor: pointer;
    border-radius:0.2rem;
    padding: 0.4rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    transition: 0.5s ease-in-out;
    .selected {
      background-color: #9a86f3;
    }
    .username{
      color: white;
    }
    .avatar{
      img{
        height: 3rem;
      }
    }
  }
}
.current-user {
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    img {
      height: 3rem;
      max-inline-size: 100%;
    }
  }
  .username {
      color: white;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
}
  
;`


export default Contact