import React, { Component } from "react";
import { Icon, Sidebar, Menu } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <Link to="/">
            <Menu.Item>
              <Icon name="home" />
              ACS
            </Menu.Item>
          </Link>
          <Link to="/resources">
            <Menu.Item>
              <Icon name="list" />
              Resources
            </Menu.Item>
          </Link>
        </Sidebar>
      </Container>
    );
  }
}
const Container = styled.div`
  width: 10%;
`;
