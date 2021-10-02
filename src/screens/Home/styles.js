import styled from "styled-components";

export const Container = styled.div`
  perspective: 600px;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.background};
  display: grid;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: PulseBackground 2s ease infinite;
  background-size: 400% 400%;

  @keyframes PulseBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const PopIt = styled.div`
  width: 50vh;
  height: 50vh;
  position: relative;
  transition: transform 1s;
  transform-style: preserve-3d;
  transform-origin: center right;
  ${(props) =>
    props.isFlipped ? "transform: translateX(-100%) rotateY(-180deg);" : ""}
  border-radius: 2rem;
`;

export const PopItFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: red;
  border-radius: 2rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2em;
  border: 5px solid rgba(0, 0, 0, 0.3);
  border-bottom-width: 0px;
  background: ${(props) => props.background};

  &:nth-child(1) {
    border-radius: 2em 2em 0px 0px;
  }
  &:nth-child(6) {
    border-radius: 2em 2em 0px 0px;
    border-bottom-width: 5px;
    border-radius: 0px 0px 2em 2em;
  }
`;

export const Circle = styled.div`
  width: 14%;
  aspect-ratio: 1/1;

  border-radius: 50%;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.3);
  ${(props) =>
    props.pressed
      ? `box-shadow: inset -1em -2em 1em rgba(255,255,255, .1),
  inset 1em 2em 1em rgba(0,0,0,.4);`
      : ` box-shadow: inset 1em 2em 1em rgba(255,255,255, .2),
              inset -1em -2em 1em rgba(0,0,0, .4);`}
`;

export const PopItBack = styled.div`
  background: blue;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  border-radius: 2rem;
`;

export const Controls = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  color: white;
  text-transform: uppercase;
`;

export const Difficulties = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const DifficultyButton = styled.button`
  border-width: 1px;
  margin: 1em;
  font-size: 1em;

  &:nth-child(1) {
    background: green;
    color: blue;
  }
  &:nth-child(2) {
    background: yellow;
  }
  &:nth-child(3) {
    background: orange;
  }
  &:nth-child(4) {
    background: black;
    color: white;
  }
`;

export const DifficultyInfo = styled.div`
  text-align: center;
`;

export const Score = styled.div`
  font-weight: bold;
  color: white;
  text-align: center;
`;

export const Timer = styled.div`
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: 2rem;
`;

export const ButtonTimer = styled.button`
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.5);
`;

export const ButtonTimerContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

export const Info = styled.div`
  text-align: center;
  margin-top: 1rem;
  color: white;
  font-size: 2rem;
`;
