import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { UserStateContext, DispatchContext } from "../App";
import "./Header.css";
import Burger from "./hamburger/Burger";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;
  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <div id="header" style={{backgroundColor:"white", padding:0, position: (isLogin) ? "fixed" : null, zIndex:99000, width:"-webkit-fill-available"}}>
      <Nav activeKey={location.pathname} style={{backgroundColor:"white", borderRadius:50, height:110, alignItems:"center", justifyContent:"space-between"}}>
        <Nav.Item /*className="me-auto mb-5"*/style={{display:"flex",flexDirection:"row", alignItems:"center",}}>
          <Nav.Link>
            <img alt="" src={require("./logo.png")} width="200px" height="60px" onClick={() => navigate("/home")}/>
          </Nav.Link>
          <Nav.Link disabled >
          {isLogin ? (
            <>
              <span id="fadein"> 환영합니다, </span>
              <span style={{fontWeight:"bold"}}>{userState.user.name}</span>
              <span>님!</span>
            </>
            ) : (
              <></>
            )}
          </Nav.Link>
        </Nav.Item>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Burger logout={logout} />
        </div>
      </Nav>
    </div>
  );
}

export default Header;
