import React, { Component } from "react";
import { Button, Menu, Icon, Header, Input, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { getTasksById, createNewTask, editTask } from "../../api/index";
import TaskDisplay from "../TaskDisplay/TaskDisplay";
import { getTaskId } from "../../redux/tasks/actions";
import { connect } from "react-redux";
import { letterOptions } from "../../utils/data";

class Entry extends Component {
  state = {
    activeItem: "task",
    taskInput: false,
    taskName: "",
    taskLetter: ""
  };

  async componentDidMount() {
    getTaskId();
    const { id } = this.props.task;
    const tasks = await getTasksById(id);
    this.setState({
      tasks: tasks.task,
      activeItem: tasks.task[0].name,
      areaOfOperationId: tasks.task[0].area_of_operation.id,
      areaOfOperationName: tasks.task[0].area_of_operation.name,
      order: tasks.task[0].area_of_operation.order,
      numeral: tasks.task[0].area_of_operation.numeral
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  keyDownHandler = e => {
    if (e.key === "Enter") {
      const {
        areaOfOperationId,
        areaOfOperationName,
        taskName,
        taskLetter,
        order,
        numeral
      } = this.state;

      createNewTask({
        areaOfOperationId,
        areaOfOperationName,
        order,
        numeral,
        taskName,
        taskLetter
      });
    }
  };

  submitHandler = e => {
    editTask();
  };

  addTaskHandler = () => {
    this.setState({ taskInput: true });
  };

  dropdownHandler = (e, data) => {
    this.setState({ taskLetter: data.value });
  };

  render() {
    const { activeItem, tasks, taskInput, taskName, taskLetter } = this.state;

    const taskMenu =
      tasks &&
      tasks.map(data => {
        const { name, letter } = data;
        return (
          <Menu.Item
            name={name}
            active={activeItem === name}
            onClick={this.handleItemClick}
            content={`${letter}.   ${name}`}
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
          elements,
          id
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
              taskId={id}
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
                <Dropdown
                  placeholder="A"
                  scrolling
                  options={letterOptions}
                  value={taskLetter}
                  name="taskLetter"
                  onChange={(e, data) => this.dropdownHandler(e, data)}
                />
                <Input
                  onChange={e => this.inputHandler(e)}
                  name="taskName"
                  value={taskName}
                  onKeyDown={e => this.keyDownHandler(e)}
                />
              </Menu.Item>
            )}
            <Menu.Menu position="right">
              <Button
                style={{ background: "transparent" }}
                onClick={() => this.addTaskHandler()}
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
