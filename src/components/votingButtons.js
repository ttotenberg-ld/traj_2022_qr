import pop1 from "../media/popSound1.mp3";
import pop2 from "../media/popSound2.mp3";
import pop3 from "../media/popSound3.mp3";
import pop4 from "../media/popSound4.mp3";
import pop5 from "../media/popSound5.mp3";
import pop6 from "../media/popSound6.mp3";
import pop7 from "../media/popSound7.mp3";
import styled from "styled-components";
import useSound from "use-sound";
import { withLDConsumer } from "launchdarkly-react-client-sdk";
import React, { useState } from 'react';


const VotingButtons = ({ flags, ldClient /*, ...otherProps */ }) => {
  let showButtons = ldClient.variation("votingButtons");
  let buttonColor = ldClient.variation("buttonColor");

  const sounds = [
    pop1,
    pop2,
    pop3,
    pop4,
    pop5,
    pop6,
    pop7

  ];

  const [randomSound, setRandomSound] = useState(sounds[Math.floor(Math.random()*sounds.length)]);

  const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  `;

  const ColoredButton = styled.button`
  background-color: ${buttonColor};
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
  `;

  const ButtonGroup = styled.div`
  display: grid;
  `;

  let [play] = useSound(randomSound);

  function clicked(metric) {
    setRandomSound(sounds[Math.floor(Math.random()*sounds.length)]);
    play();
    ldClient.track(metric);
  }
  
  return showButtons ? (
    <div>
      <br />
      <h1 style={{ color: 'black' }}><center>Favorite Session?</center></h1>
      <ButtonGroup>
        <Button onClick={() => {clicked('button-1')}}>
          <b>Tom</b>
        </Button>
        
        <ColoredButton onClick={() => {clicked('button-2')}}>
          <b>Tom but in {buttonColor}</b>
        </ColoredButton>
      </ButtonGroup>
    </div>
  ) : (
    <div></div>
  );
};

export default withLDConsumer()(VotingButtons);
