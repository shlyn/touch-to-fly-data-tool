import React from "react";
import { Menu, Icon, Input, Dropdown } from "semantic-ui-react";
import { letterOptions } from "../../utils/data";
import styled from "styled-components";

const TaskInput = ({
  taskLetter,
  taskName,
  dropdownHandler,
  inputHandler,
  setTaskHandler
}) => {
  return (
    <Menu.Item
      name="new"
      active={true}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100px"
      }}
    >
      <InputContainer>
        <Dropdown
          placeholder="A"
          scrolling
          options={letterOptions}
          value={taskLetter}
          name="taskLetter"
          onChange={(e, data) => dropdownHandler(e, data)}
        />
        <Icon name="delete" color="red" onClick={() => setTaskHandler()} />
      </InputContainer>
      <Input
        onChange={e => inputHandler(e)}
        name="taskName"
        value={taskName}
        style={{ marginTop: "10px" }}
      />
    </Menu.Item>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default TaskInput;
