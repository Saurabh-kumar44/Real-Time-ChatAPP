import React from 'react'
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Contact from '../components/Contact';
import { allUsersRoute } from '../utils/APIRoutes';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => { 
    const checkLocalStorage = async () => {
      //if their is no current user redirect to login page
    if (!localStorage.getItem("chat-app-user")) {
      navigate('/login');
    }else{
       //setting up the current user
       setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
      }
    };
    checkLocalStorage();
  }, [navigate]);

  
  //afterwards if we have the current user then we gonna call the api
  //(in this we gonna check if the current user set their image if not the redirect to the setAvatar after setting up get all the contact from this api and setted to "setContacts")
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            // console.log(currentUser._id);
            const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data.data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser, navigate]);
  


  return (
    <Container>
      <div className="container">
        <Contact contacts={contacts} currentUser={currentUser} name={"saurav"}/>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat