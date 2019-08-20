import React, { Component } from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { getAllAreasOfOperation } from "../../api/index";
import EntryTable from "../EntryTable/EntryTable";

export default class Home extends Component {
  render() {
    return <Container>some stuff</Container>;
  }
}

const Container = styled.div`
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;
