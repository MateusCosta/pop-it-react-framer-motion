import React, { useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

import {
  Container,
  PopIt,
  PopItFront,
  PopItBack,
  Controls,
  Row,
  Circle,
  Difficulties,
  DifficultyButton,
  DifficultyInfo,
  Score,
  Timer,
  ButtonTimer,
  ButtonTimerContainer,
  Info,
} from "./styles";

import paw from "../../images/paw.png";
import sfx from "../../sounds/sfx-pop.mp3";
import sfx2 from "../../sounds/sfx-pop4.mp3";

const levels = [
  {
    level: "easy",
    chance: 25,
    background: `linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)`,
  },
  {
    level: "medium",
    chance: 50,
    background: `linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)`,
  },
  {
    level: "hard",
    chance: 75,
    background: `radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)`,
  },
  {
    level: "almost impossible",
    chance: 100,
    background: `linear-gradient(310deg, #ff0063, #000000)`,
  },
];

function Home() {
  const [difficulty, setDifficulty] = useState(levels[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [pawIsVisible, setPawIsVisible] = useState(true);
  const [biggestScore, setBiggestScore] = useState(0);
  const [info, setInfo] = useState("");
  const [popItList, setPopItList] = useState(
    Array(30)
      .fill()
      .map((item, index) => ({ id: index, pressed: false }))
  );

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    centerX: 0,
    centerY: 0,
    width: 0,
    height: 0,
  });

  const [seconds, setSeconds] = React.useState(10);
  const [start, setStart] = useState(false);
  const containerRef = useRef();
  const controlsPaw = useAnimation();

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      setIsFlipped(!isFlipped);
    }
  };

  React.useEffect(() => {
    if (!start) return;
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      calculateScore();
    }
  }, [start, seconds]);



  const calculateScore = () => {
    setStart(false);
    setSeconds(10);
    if(popItList.filter((item) => item.pressed).length > biggestScore){
        setBiggestScore(popItList.filter((item) => item.pressed).length);
        setInfo(`Personal record ${popItList.filter((item) => item.pressed).length}`);
    }else{

        setInfo("Game Over");
    }
  };

  function getRelativeCoordinates(event, referenceElement) {
    const position = {
      x: event.pageX,
      y: event.pageY,
    };

    const offset = {
      left: referenceElement.offsetLeft,
      top: referenceElement.offsetTop,
      width: referenceElement.clientWidth,
      height: referenceElement.clientHeight,
    };

    let reference = referenceElement.offsetParent;

    while (reference) {
      offset.left += reference.offsetLeft;
      offset.top += reference.offsetTop;
      reference = reference.offsetParent;
    }

    return {
      x: position.x - offset.left,
      y: position.y - offset.top,
      width: offset.width,
      height: offset.height,
      centerX:
        (position.x - offset.left - offset.width / 2) / (offset.width / 2),
      centerY:
        (position.y - offset.top - offset.height / 2) / (offset.height / 2),
    };
  }

  const handleMouseMove = (e) => {
    setMousePosition(getRelativeCoordinates(e, containerRef.current));
  };

  const handleClick = (event, element) => {
    if (
      (element.pressed && !isFlipped) ||
      (!element.pressed && isFlipped) ||
      !start
    )
      return;
    setPawIsVisible(true);
    setMousePosition(getRelativeCoordinates(event, containerRef.current));

    const newPopItList = popItList;
    const newitemIndex = newPopItList.indexOf(element);
    newPopItList[newitemIndex].pressed = !newPopItList[newitemIndex].pressed;
    setPopItList([...newPopItList]);

    const sound = new Audio();
    if (newPopItList[newitemIndex].pressed) {
      sound.src = sfx;
    } else {
      sound.src = sfx2;
    }
    sound.play();
    if (Math.floor(Math.random() * 100) + 1 <= difficulty.chance) {
      setTimeout(
        () =>
          clickPaw(mousePosition, newPopItList[newitemIndex].pressed, element),
        1000
      );
    }
  };

  const clickPaw = (mouse, pressed, element) => {
    controlsPaw.start({
      x: mouse.x,
      y: mouse.y,
      opacity: 1,
      display: "block",
      position: "absolute",
      zIndex: "10",
      transition: { duration: 0.3 },
      transitionEnd: {
        display: "none",
        x: 0,
        y: 0,
      },
    });
    const sound = new Audio();
    if (pressed) {
      sound.src = sfx;
    } else {
      sound.src = sfx2;
    }
    sound.play();
    const newPopItList = popItList;
    const newitemIndex = newPopItList.indexOf(element);
    newPopItList[newitemIndex].pressed = !newPopItList[newitemIndex].pressed;
    setPopItList([...newPopItList]);
  };

  const handleChangeDifficulty = (level) => {
    setDifficulty(level);
  };

  const startTimer = () => {
    setPopItList(
      Array(30)
        .fill()
        .map((item, index) => ({ id: index, pressed: false }))
    );
    setSeconds(10);
    setStart(true);
    setInfo("Pop It!");
  };

  return (
    <Container background={difficulty.background}>
      <Timer>{`${seconds} seconds`}</Timer>
      <PopIt isFlipped={isFlipped} ref={containerRef}>
        <PopItFront>
          <Row background="red">
            {popItList.slice(0, 5).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
          <Row background="orange">
            {popItList.slice(5, 10).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
          <Row background="yellow">
            {popItList.slice(10, 15).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
          <Row background="green">
            {popItList.slice(15, 20).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
          <Row background="blue">
            {popItList.slice(20, 25).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
          <Row background="purple">
            {popItList.slice(25, 30).map((item, index) => (
              <Circle
                key={index}
                pressed={item.pressed}
                onClick={(e) => handleClick(e, item)}
              ></Circle>
            ))}
          </Row>
        </PopItFront>
        <PopItBack>
          <Row background="red">
            {popItList
              .slice(0, 5)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
          <Row background="orange">
            {popItList
              .slice(5, 10)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
          <Row background="yellow">
            {popItList
              .slice(10, 15)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
          <Row background="green">
            {popItList
              .slice(15, 20)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
          <Row background="blue">
            {popItList
              .slice(20, 25)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
          <Row background="purple">
            {popItList
              .slice(25, 30)
              .reverse()
              .map((item, index) => (
                <Circle
                  key={index}
                  pressed={!item.pressed}
                  onClick={(e) => handleClick(e, item)}
                ></Circle>
              ))}
          </Row>
        </PopItBack>
      </PopIt>
      <Controls>
        Press Spacebar to flip <br />
        Pop it everything, the cat will try to stop you  <br />
        <Difficulties>
          {levels.map((item, index) => (
            <DifficultyButton
              key={index}
              onClick={() => handleChangeDifficulty(item)}
            >
              {item.level}
            </DifficultyButton>
          ))}
        </Difficulties>
        <DifficultyInfo>{difficulty.level}</DifficultyInfo>
        <Score>{popItList.filter((item) => item.pressed).length} Points</Score>
        <ButtonTimerContainer>
          <ButtonTimer onClick={() => startTimer()}>Start</ButtonTimer>
        </ButtonTimerContainer>
        <Info>{info}</Info>
      </Controls>
      <div>
        <AnimatePresence>
          {pawIsVisible && (
            <motion.img
              onAnimationComplete={() => setPawIsVisible(false)}
              animate={controlsPaw}
              initial={{
                display: "none",
                position: "absolute",
                top: mousePosition.x,
                width: "100px",
                zIndex: 999,
              }}
              src={paw}
            />
          )}
        </AnimatePresence>
        {/* <motion.div  animate={controlsPaw} initial={{display: 'none', position: 'absolute', top: 0, width: '100px'}} 
          style={{fontSize: '40px', color: 'red', background: 'blue'}}>.</motion.div> */}
      </div>
    </Container>
  );
}

export default Home;
