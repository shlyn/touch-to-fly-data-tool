import React, { Component } from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { getAllAreasOfOperation } from "../../api/index";
import EntryTable from "../EntryTable/EntryTable";

export default class Entries extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {};
  }
  async componentDidMount() {
    const areasOfOperation = await getAllAreasOfOperation();
    this.setState({ areasOfOperation });
  }

  render() {
    const { areasOfOperation } = this.state;

    return (
      <Container>
        <Header as="h3">Current Areas Of Operation</Header>
        {areasOfOperation && <EntryTable areasOfOperation={areasOfOperation} />}
      </Container>
    );
  }
}

const Container = styled.div`
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;
