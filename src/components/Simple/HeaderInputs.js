import React from "react";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
const HeaderInputs = ({ name, letter, inputHandler }) => {
  return (
    <Container>
      <Input
        placeholder={name}
        name="name"
        value={name}
        onChange={e => inputHandler(e)}
      />
      <Input
        placeholder={letter}
        name="letter"
        value={letter}
        onChange={e => inputHandler(e)}
        style={{ width: "10%", marginLeft: "5px" }}
      />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 10px;
`;

export default HeaderInputs;
