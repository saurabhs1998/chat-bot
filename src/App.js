import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
function App() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <MainDiv>
      {openModal ? (
        <ChatBox>
          <Header>
            <IoClose size="2rem" onClick={() => setOpenModal(false)} />
          </Header>
          <AnsArea>
            <p>Hi, my name is Suresh. Ask your question</p>
          </AnsArea>

          <Input>
            <InputField placeholder="Ask Your Question" />
            <AiOutlineSend
              size="1.5rem"
              style={{
                position: "absolute",
                right: 10,
                top: 14,
                cursor: "pointer",
              }}
            />
          </Input>
        </ChatBox>
      ) : (
        ""
      )}
      <ChatBot
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <BsFillChatDotsFill size="2.8rem" />
      </ChatBot>
    </MainDiv>
  );
}
const AnsArea = styled.div`
  width: 70%;
  height: 70px;
  background-color: pink;
  border-radius: 10px;
  margin-top: 30px;
  margin-left: 20px;
  opacity: 0.7;
  text-align: center;
  padding-top: 10px;
`;
const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: pink;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
`;
const openingAnimation = keyframes`
from{
  opacity:0;
  transform:scale(1,0)
}
to{
  opacity:1;
  transform:scale(1,1)
}
`;

const Input = styled.div`
  width: 300px;
  height: 50px;
  position: absolute;
  bottom: 0%;
  border-radius: 0px 0px 10px 10px;
`;
const InputField = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 0px 0px 10px 10px;
  outline: 0;
  border: 1px solid lightpink;
  padding-left: 15px;
  font-size: 15px;
`;
const ChatBox = styled.div`
  transform-origin: bottom;
  width: 300px;
  height: 450px;
  position: fixed;
  background-color: #fff;
  right: 9%;
  bottom: 19%;
  animation: ${openingAnimation} 1s forwards;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;
const ChatBot = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.4);
  position: fixed;
  bottom: 8%;
  right: 5%;
  cursor: pointer;
`;
const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #caf7e3;
`;
export default App;
