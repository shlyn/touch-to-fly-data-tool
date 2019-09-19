import React from "react";
import AddingSubDisplay from "./AddingSubDisplay";
import { Button, Table, Icon, Input } from "semantic-ui-react";

const AddingDisplay = ({
  inputHandlerCodeSub,
  inputHandlerDescriptionSub,
  removeInput,
  mainId,
  sub_elements
}) => {
  const display = sub_elements.map((data, i) => {
    const { abbreviation_code, text, id, addition } = data;

    return (
      <>
        <Table.Row>
          <Table.Cell>
            <Input
              placeholder={"Code"}
              value={abbreviation_code}
              name="abbreviation_code"
              onChange={e => inputHandlerCodeSub({ e, i, mainId })}
            />
          </Table.Cell>
          <Table.Cell>
            <Input
              placeholder={"Description"}
              value={text}
              name="text"
              style={{ width: "100%" }}
              onChange={e => inputHandlerDescriptionSub({ e, i, mainId })}
            />
          </Table.Cell>
          <Table.Cell colSpan="2">
            <Icon
              name="delete"
              color="red"
              style={{
                fontSize: "1.3em"
              }}
              onClick={() => removeInput({ i, mainId })}
            />
          </Table.Cell>
        </Table.Row>
      </>
    );
  });
  return <>{display}</>;
};

export default AddingDisplay;
