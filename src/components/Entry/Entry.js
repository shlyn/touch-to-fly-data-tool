import React, { Component } from "react";
import { Button, Menu, Segment, Icon, Header, Table } from "semantic-ui-react";
import styled from "styled-components";
import { getTasksById } from "../../api/index";
import TaskDisplay from "../TaskDisplay/TaskDisplay";

export default class Entry extends Component {
  state = { activeItem: "task" };
  async componentDidMount() {
    const tasks = await getTasksById();
    this.setState({ tasks: tasks.task, activeItem: tasks.task[0].name });
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem, tasks } = this.state;
    console.log(tasks);
    const taskMenu =
      tasks &&
      tasks.map(data => {
        const { name } = data;
        return (
          <Menu.Item
            name={name}
            active={activeItem === name}
            onClick={this.handleItemClick}
          />
        );
      });

    const taskDisplay =
      tasks &&
      tasks.map(data => {
        const {
          resources,
          name,
          knowledge_description,
          skills_description,
          risk_management_description,
          objective
        } = data;
        if (activeItem === name) {
          return (
            <TaskDisplay
              resources={resources}
              name={name}
              knowledgeDescription={knowledge_description}
              skillsDescription={skills_description}
              riskManagementDescription={risk_management_description}
              objective={objective}
            />
          );
        }
      });

    return (
      <Container>
        <MenuContainer>
          <Header>Area of Operation</Header>
          <Menu pointing vertical>
            {taskMenu}
            <Menu.Menu position="right">
              <Button style={{ background: "transparent" }}>
                <Icon name="add" />
              </Button>
            </Menu.Menu>
          </Menu>
        </MenuContainer>
        {taskDisplay}
      </Container>
    );
  }
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  margin-left: 150px;
  width: 90%;
  height: 100vh;
  padding: 30px;
`;

const MenuContainer = styled.div`
  height: 100vh;
  padding: 30px;
`;
