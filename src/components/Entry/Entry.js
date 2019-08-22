import React, { Component } from "react";
import { Button, Menu, Icon, Header, Input } from "semantic-ui-react";
import styled from "styled-components";
import { getTasksById } from "../../api/index";
import TaskDisplay from "../TaskDisplay/TaskDisplay";
import { getTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";
class Entry extends Component {
  state = { activeItem: "task", taskInput: false, newTask: "" };

  async componentDidMount() {
    getTaskId();
    const { id } = this.props.task;
    const tasks = await getTasksById(id);
    this.setState({ tasks: tasks.task, activeItem: tasks.task[0].name });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  keyDownHandler = e => {
    if (e.key === "Enter") {
      // add task api call
      this.setState({ activeItem: this.state.newTask, taskInput: false });
    }
  };

  render() {
    const { activeItem, tasks, taskInput, newTask } = this.state;
    console.log(newTask);
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
          objective,
          elements
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
              elements={elements}
            />
          );
        }
      });

    return (
      <Container>
        <MenuContainer>
          <Header>Preflight Preparation</Header>
          <Menu pointing vertical>
            {taskMenu}
            {taskInput && (
              <Menu.Item name="new" active={true}>
                <Input
                  onChange={e => this.inputHandler(e)}
                  name="newTask"
                  value={newTask}
                  onKeyDown={e => this.keyDownHandler(e)}
                />
              </Menu.Item>
            )}
            <Menu.Menu position="right">
              <Button
                style={{ background: "transparent" }}
                onClick={() =>
                  this.setState({ taskInput: true, activeItem: "new" })
                }
              >
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

const mapDispatchToProps = {
  getTaskId
};

export default connect(
  state => state,
  mapDispatchToProps
)(Entry);

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
