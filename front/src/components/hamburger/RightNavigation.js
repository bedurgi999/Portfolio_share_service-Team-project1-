import React, { useContext } from "react";
import { UserStateContext } from "../../App";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Ul = styled.ul`
  margin:0;
  padding-right: 20px;
  z-index:3;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  color: #79889e;
  li {
    margin: 8px 0;
    padding: 10px 10px;
    cursor:pointer;
  }

  li:hover {
    color: black;
    background-color: rgba(255, 205, 119, 0.15);
    background-image: linear-gradient(30deg, rgba(254, 109, 115, 0.15) 12%, transparent 12.9%, transparent 87%, rgba(254, 109, 115, 0.15) 87.9%, rgba(254, 109, 115, 0.15)), linear-gradient(150deg, rgba(254, 109, 115, 0.15) 12%, transparent 12.9%, transparent 87%, rgba(254, 109, 115, 0.15) 87.9%, rgba(254, 109, 115, 0.15)), linear-gradient(30deg, rgba(254, 109, 115, 0.15) 12%, transparent 12.9%, transparent 87%, rgba(254, 109, 115, 0.15) 87.9%, rgba(254, 109, 115, 0.15)), linear-gradient(150deg, rgba(254, 109, 115, 0.15) 12%, transparent 12.9%, transparent 87%, rgba(254, 109, 115, 0.15) 87.9%, rgba(254, 109, 115, 0.15)), linear-gradient(60deg, rgba(65, 155, 224, 0.15) 25%, transparent 25.9%, transparent 75%, rgba(65, 155, 224, 0.15) 75%, rgba(65, 155, 224, 0.15)), linear-gradient(60deg, rgba(65, 155, 224, 0.15) 25%, transparent 25.9%, transparent 75%, rgba(65, 155, 224, 0.15) 75%, rgba(65, 155, 224, 0.15));
    background-position: 0 0, 0 0, 25px 50px, 25px 50px, 0 0, 25px 50px;
    background-size: 50px 100px;
    border-radius: 47px;
    font-weight: bold;
  }
  @media (max-width: 1300px) {
    flex-flow: column nowrap;
    background-color: white;
    opacity: 95%;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #79889e;
    }
  }
`;


const RightNavigation = ({ open, logout, changeOpen }) => {
  const userState = useContext(UserStateContext);
  const isLogin = !!userState.user;
  const navigate = useNavigate();

  return (
    <Ul open={open}>
      <li onClick={() => {
        changeOpen()
        navigate("/home")
        }}>
        <span
          className="material-icons"
          style={{ verticalAlign: "middle" }}
        >
          home
        </span>
        {" "}Home
      </li>
      {!isLogin && (
        <> 
          <li onClick={() => {
            changeOpen()
            navigate("/login")
          }}>
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              login
            </span>
            {" "}Login
          </li>
          <li onClick={() => { 
            changeOpen()
            navigate("/register")
          }}>
            <span
                className="material-icons"
                style={{ verticalAlign: "middle" }}
              >
                how_to_reg
            </span>
            {" "}회원가입
          </li>
        </>
      )}
      {isLogin && (
        <>
          <li onClick={() => {
            changeOpen()
            navigate("/network")}}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              explore
            </span>
            {" "}Mate
          </li>
          <li onClick={() => {
            changeOpen()
            navigate("/projects")}}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              folder
            </span>
            {" "}Projects
          </li>
          <li onClick={() => {
            changeOpen()
            navigate("/")}}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              contact_page
            </span>
            {" "}My page
          </li>
          <li onClick={() => {
            changeOpen()
            navigate(`/users/${userState.user.id}/profilePage`)}}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              manage_accounts
            </span>
            {" "}My profile
          </li>
          <li onClick={() => {
            changeOpen()
            logout()}} 
            style={{ color: "#FE4F70" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              logout
            </span>
            {" "}Logout
          </li>
        </>
      )}
    </Ul>
  )
}

export default RightNavigation;