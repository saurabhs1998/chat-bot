import React, { useLayoutEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import app from "./firebase";
import Fuse from "fuse.js";
// import { addData } from "./addData";

function App() {
  const [openModal, setOpenModal] = useState(true);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [commonQues, setCommonQues] = useState([]);
  const [searchedQna, setSearchedQna] = useState([]);
  const [checkAns, setCheckAns] = useState(false);
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [submitUnknownQuestions, setSubmitUnknownQuestions] = useState(false);
  const [email, setEmail] = useState("");
  const [notFoundQuestion, setNotFoundQuestion] = useState("");
  const ref = app.firestore().collection("Questions");
  const common_ques = app.firestore().collection("commonly-asked");
  const notFoundQuestionRef = app.firestore().collection("Not-Found-Questions");
  useLayoutEffect(() => {
    common_ques.onSnapshot((query) => {
      query.forEach((doc) => {
        setCommonQues(doc.data().data);
      });
      if (position === 0) {
        setCheckAns(true);
        return;
      }
    });
    // eslint-disable-next-line
  }, []);

  const findAnswer = (e) => {
    e.preventDefault();
    if (input.length !== 0) {
      setLoading(true);
      ref
        .doc("Q&A")
        .get()
        .then((results) => {
          setLoading(false);
          setAsked(true);
          setAllQuestions(results.data().data);
        });
    }
  };
  const submitNotFoundQuestion = (e) => {
    e.preventDefault();
    notFoundQuestionRef
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("yessss");
          console.log(doc.data().question);
          notFoundQuestionRef
            .doc(email)
            .set({
              email: email,
              question: [...doc.data().question, notFoundQuestion],
            })
            .then(() => {
              console.log("done");
            });
        } else {
          notFoundQuestionRef
            .doc(email)
            .set({ email: email, question: [notFoundQuestion] })
            .then(() => {
              console.log("done one");
            });
        }
        console.log(doc);
      });
  };
  useLayoutEffect(() => {
    if (input.length === 0) {
      setSearchedQna([]);
      setAsked(false);
      return;
    }
  }, [input]);
  useLayoutEffect(() => {
    const options = {
      keys: ["Q"],
    };
    const fuse = new Fuse(allQuestions, options);
    const pattern = input.trim().toLowerCase();
    setSearchedQna(fuse.search(pattern));
  }, [allQuestions]);
  return (
    <MainDiv>
      {openModal ? (
        <ChatBox className={closing ? "closing" : ""}>
          <Header>
            <IoClose
              className="cross"
              size="2rem"
              onClick={() => {
                setClosing(true);
                setTimeout(() => {
                  setOpenModal(false);
                }, 800);
              }}
            />
            {!asked && !submitUnknownQuestions ? (
              <h2>Commonly Asked</h2>
            ) : (
              <button onClick={() => setSubmitUnknownQuestions(true)}>
                Didn't find your Answer
              </button>
            )}
          </Header>
          <OneMoreExtraDiv></OneMoreExtraDiv>
          {commonQues.length === 0 || loading ? (
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
              {!asked
                ? commonQues.map((item, pos) => {
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
                  })
                : searchedQna.map((item, pos) => {
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
              {asked && searchedQna.length === 0 ? (
                <DidNotFindAnswer>
                  <p>
                    Click on "Didn't find your Answer" and submit your Question,
                    we'll reach back to you.
                  </p>
                </DidNotFindAnswer>
              ) : (
                ""
              )}
              {submitUnknownQuestions ? (
                <SubmitQuestion>
                  <IoClose
                    className="cross"
                    size="2rem"
                    onClick={() => {
                      setSubmitUnknownQuestions(false);
                    }}
                  />
                  <TextAreaForQuestion
                    placeholder="Enter Your Question"
                    onChange={(e) => {
                      setNotFoundQuestion(e.target.value);
                    }}
                  />
                  <EmailInputField
                    placeholder="Enter Your Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <SubmitButton
                    onClick={(e) => {
                      submitNotFoundQuestion(e);
                    }}
                  >
                    Submit
                  </SubmitButton>
                </SubmitQuestion>
              ) : (
                ""
              )}
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  findAnswer(e);
                }
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
              onClick={(e) => {
                findAnswer(e);
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
const TextAreaForQuestion = styled.input`
  width: 80%;
  height: 3.5rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
  outline: 0;
  border: 0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: 1px solid pink;
  font-size: 1rem;
`;
const EmailInputField = styled.input`
  width: 80%;
  height: 3.5rem;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
  outline: 0;
  border: 0;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: 1px solid pink;
  font-size: 1rem;
`;
const SubmitButton = styled.button`
  font-size: 1rem;
  padding: 0.7rem;
  width: 40%;
  border-radius: 5px;
  outline: 0;
  border: 0;
  background-color: pink;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: 0.3s ease-in-out;
  border: 1px solid pink;

  :hover {
    background-color: #fff;
    color: pink;
  }
`;
const SubmitQuestion = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .cross {
    position: absolute;
    right: 0%;
    margin: 1rem;
    top: 0;
    cursor: pointer;
  }
`;
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
  @media (max-width: 500px) {
    position: fixed;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    position: fixed;
  }
`;
const DidNotFindAnswer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const OneMoreExtraDiv = styled.div`
  height: 20px;
  width: 100%;
  position: absolute;
  top: 50px;
  background-color: #fff;
  z-index: 1;
`;
const LoadingArea = styled.div`
  height: calc(70vh - 100px);
  padding: 1rem;
  padding-bottom: calc(1rem + 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 1.5rem;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    margin-top: 1.5rem;
  }
`;
const AnsArea = styled.div`
  height: calc(70vh - 100px);
  max-height: calc(70vh - 100px);
  overflow-y: auto;
  padding: 1rem;
  padding-top: calc(1rem + 20px);
  padding-bottom: calc(1rem + 20px);
  position: relative;
  @media (max-width: 500px) {
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    padding-bottom: calc(1rem + 20px + 50px);
  }
  @media (max-width: 900px) and (orientation: landscape) {
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    padding-bottom: calc(1rem + 20px + 50px);
    padding-left: 1.5rem;
  }
`;
const SingleQNA = styled.div`
  height: 5rem;
  overflow: hidden;
  width: 100%;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: pink;
  cursor: pointer;
  transition: 0.6s ease;
  padding: 1rem;
  p:nth-child(1) {
    max-height: 80%;
    overflow: hidden;
    font-weight: bold;
  }
`;
const Header = styled.div`
  width: 100%;
  height: 50px;
  background-color: pink;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  position: relative;
  button {
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 0;
    outline: 0;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: 0.4s ease;
    background-color: #fff;
    position: relative;
  }
  button:focus {
    background-color: lightgray;
  }
  button:hover {
    background-color: lightgray;
  }
  h2 {
    color: #000;
    font-size: 1.5rem;
  }
  .cross {
    position: absolute;
    left: 0%;
    margin-left: 1rem;
    cursor: pointer;
  }

  @media (max-width: 500px) {
    border-radius: 0;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    border-radius: 0;
  }
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
  @media (max-width: 500px) {
    position: fixed;
    bottom: 0;
    border-radius: 0;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    position: fixed;
    bottom: 0;
    border-radius: 0;
  }
`;
const InputField = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 0px 0px 10px 10px;
  outline: 0;
  border: 1px solid lightpink;
  padding-left: 0.5rem;
  font-size: 1rem;
  padding-right: 50px;
  @media (max-width: 500px) {
    border-radius: 0;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    border-radius: 0;
  }
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
  z-index: 2;
  @media (max-width: 500px) {
    width: 100%;
    height: 100vh;
    bottom: auto;
    top: 0;
    right: 0;
    border-radius: 0;
  }
  @media (max-width: 900px) and (orientation: landscape) {
    width: 100%;
    height: 100vh;
    bottom: auto;
    top: 0;
    right: 0;
    border-radius: 0;
  }
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
  z-index: 1;
`;
const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #caf7e3;
`;
export default App;
