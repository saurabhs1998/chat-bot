import React, { useLayoutEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import app from "./firebase";
function App() {
  const [openModal, setOpenModal] = useState(true);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [qna, setQna] = useState([]);
  const [checkAns, setCheckAns] = useState(false);
  const [position, setPosition] = useState(0);
  const ref = app.firestore().collection("Questions");
  useLayoutEffect(() => {
    ref.onSnapshot((query) => {
      query.forEach((doc) => {
        setQna(doc.data().data);
      });
      if (position === 0) {
        setCheckAns(true);
        return;
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <MainDiv>
      {openModal ? (
        <ChatBox className={closing ? "closing" : ""}>
          <Header>
            <IoClose
              size="2rem"
              onClick={() => {
                setClosing(true);
                setTimeout(() => {
                  setOpenModal(false);
                }, 800);
              }}
            />
          </Header>
          <OneMoreExtraDiv />
          {qna.length === 0 ? (
            <LoadingArea>
              <HashLoader
                color={"#ffc0cb"}
                loading={true}
                css={override}
                size={100}
              />
            </LoadingArea>
          ) : (
            <AnsArea>
              {qna.map((item, pos) => {
                return (
                  <SingleQNA
                    key={pos}
                    onClick={() => {
                      setTimeout(() => {
                        document
                          .getElementsByClassName("singleQNA")
                          [pos].scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                      }, 200);
                      if (pos === position) {
                        return;
                      }
                      if (checkAns && pos !== position) {
                        setPosition(pos);
                        return;
                      }
                      setCheckAns(!checkAns);
                      setPosition(pos);
                    }}
                    className={` ${position === pos ? "showans" : ""}`}
                  >
                    <p className="singleQNA">{`Q: ${item.Q}`}</p>
                    {checkAns && position === pos ? (
                      <p>{`A: ${item.A}`}</p>
                    ) : (
                      ""
                    )}
                  </SingleQNA>
                );
              })}
            </AnsArea>
          )}
          <ExtraDiv></ExtraDiv>
          <Input>
            <InputField
              placeholder="Ask Your Question"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <AiOutlineSend
              size="1.5rem"
              style={{
                position: "absolute",
                right: 10,
                top: 14,
                cursor: "pointer",
              }}
              onClick={() => {
                setInput("");
              }}
            />
          </Input>
        </ChatBox>
      ) : (
        ""
      )}
      <ChatBot
        onClick={() => {
          setClosing(false);
          setOpenModal(true);
        }}
      >
        <BsFillChatDotsFill size="2.8rem" />
      </ChatBot>
    </MainDiv>
  );
}
const override = css`
  display: block;
  margin: 0 auto;
  border-color: pink;
`;
const ExtraDiv = styled.div`
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 50px;
  background-color: #fff;
`;
const OneMoreExtraDiv = styled.div`
  height: 20px;
  width: 100%;
  position: absolute;
  top: 50px;
  background-color: #fff;
`;
const LoadingArea = styled.div`
  height: calc(70vh - 100px);
  padding: 1rem;
  padding-bottom: calc(1rem + 20px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AnsArea = styled.div`
  height: calc(70vh - 100px);
  max-height: calc(70vh - 100px);
  overflow-y: auto;
  padding: 1rem;
  padding-top: calc(1rem + 20px);
  padding-bottom: calc(1rem + 20px);
`;
const SingleQNA = styled.div`
  height: 4rem;
  overflow: hidden;
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: pink;
  cursor: pointer;
  transition: 0.6s ease;
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
  transform:scale(0,0)
}
to{
  opacity:1;
  transform:scale(1,1)
}
`;

const Input = styled.div`
  width: 100%;
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
  padding-right: 50px;
`;
const ChatBox = styled.div`
  transform-origin: right bottom;
  width: 30%;
  height: 70vh;
  position: fixed;
  background-color: #fff;
  right: 9%;
  bottom: 19%;
  animation: ${openingAnimation} 0.6s backwards;
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
