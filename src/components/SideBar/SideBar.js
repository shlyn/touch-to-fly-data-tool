import React, { Component } from "react";
import {
  Button,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";
import styled from "styled-components";
import Home from "../Home/Home";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <Container>
        <Sidebar
          as={Menu}
          icon="labeled"
          inverted
          vertical
          visible
          width="thin"
        >
          <Menu.Item as="a">
            <Icon name="pencil" />
            New
          </Menu.Item>
          <Menu.Item as="a">
            <Icon name="newspaper" />
            <Link to="/entries">Areas Of Operation</Link>
          </Menu.Item>
        </Sidebar>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 10%;
`;
