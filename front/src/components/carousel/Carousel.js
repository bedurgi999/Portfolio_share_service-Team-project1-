import React, { useContext, useState } from "react";
import { Carousel } from 'react-bootstrap';
import { UserStateContext } from "../../App";
import "./Carousel.css";



function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const userState = useContext(UserStateContext);
  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  return (
    <>
      {isLogin && (<div style={{height:110}}></div>)}
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="image">
          <img src={require('./first.png')} alt="first"/>
        </Carousel.Item>
        <Carousel.Item className="image">
        <img src={require('./second.png')} alt="second"/>
        </Carousel.Item>
        <Carousel.Item className="image">
          <img src={require('./third.png')} alt="third"/>
        </Carousel.Item>
        <Carousel.Item className="image">
          <img src={require('./fifth.png')} alt="fifth"/>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default ControlledCarousel;