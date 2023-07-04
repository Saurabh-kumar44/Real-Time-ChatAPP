import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLocalStorage = () => {
      try {
        const user = localStorage.getItem('chat-app-user');
        if (!user) {
          navigate('/login');
        } else {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error('Error accessing local storage:', error);
      }
    };

    checkLocalStorage();
  }, [navigate]);

  return (
    <Container>
      <img src={Robot} alt="Welcome" />
      <h1>
        Welcome, <span>{currentUser ? currentUser.username : ''}</span>
      </h1>
      <h3>Let's select the chat to whom you want to chat!</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;

export default Welcome;
