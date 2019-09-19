import React from "react";
import AddingSubDisplay from "./AddingSubDisplay";
import { Button, Table, Icon, Input } from "semantic-ui-react";
import { remove } from "jest-util/build/preRunMessage";

const AddingDisplay = ({
  inputHandlerCode,
  inputHandlerDescription,
  inputHandlerCodeSub,
  inputHandlerDescriptionSub,
  removeInput,
  elements,
  elementId,
  addSubElement,
  removeInputSub
}) => {
  const display = elements.map((data, i) => {
    const { text, abbreviation_code, type, id, addition, sub_elements } = data;
    if (type.id === elementId && addition === true) {
      return (
        <>
          <Table.Row>
            <Table.Cell>
              <Input
                placeholder={"Code"}
                value={abbreviation_code}
                name="abbreviation_code"
                onChange={e => inputHandlerCode({ e, i })}
              />
            </Table.Cell>
            <Table.Cell>
              <Input
                placeholder={"Description"}
                value={text}
                name="text"
                style={{ width: "100%" }}
                onChange={e => inputHandlerDescription({ e, i })}
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                name="add"
                color="green"
                style={{
                  fontSize: "1.3em"
                }}
                onClick={() => addSubElement({ id })}
              />
            </Table.Cell>
            <Table.Cell>
              <Icon
                name="delete"
                color="red"
                style={{
                  fontSize: "1.3em"
                }}
                onClick={() => removeInput({ i })}
              />
            </Table.Cell>
          </Table.Row>
          <AddingSubDisplay
            sub_elements={sub_elements}
            mainId={id}
            inputHandlerCodeSub={inputHandlerCodeSub}
            inputHandlerDescriptionSub={inputHandlerDescriptionSub}
            removeInputSub={removeInputSub}
          />
        </>
      );
    }
  });

  return <>{display}</>;
};

export default AddingDisplay;
