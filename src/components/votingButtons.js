import styled from "styled-components";
import { withLDConsumer } from "launchdarkly-react-client-sdk";




const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 10px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: grid;
`

const votingButtons = ({ flags, ldClient /*, ...otherProps */ }) => {
  let showFeature = ldClient.variation("votingButtons");

  function clicked(metric) {
    ldClient.track(metric);
  }
  
  return showFeature ? (
    <div>
      <br />
      <ButtonGroup>
        <Button onClick={() => {clicked('button-1')}}>
          Vote 1 Button
        </Button>
        
        <Button onClick={() => {clicked('button-2')}}>
          Vote 2 Button
        </Button>
      </ButtonGroup>
    </div>
  ) : (
    <div></div>
  );
};

export default withLDConsumer()(votingButtons);
