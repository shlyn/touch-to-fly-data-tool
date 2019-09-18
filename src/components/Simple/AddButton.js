import React from "react";
import { Button, Table, Icon } from "semantic-ui-react";

const AddButton = ({ addElementInput, elementId }) => {
  return (
    <Table.Row>
      <Table.Cell colSpan="3">
        <Button
          style={{ background: "transparent" }}
          onClick={() => addElementInput({ element_id: elementId })}
        >
          <Icon name="add" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};

export default AddButton;
