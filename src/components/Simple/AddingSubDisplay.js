import React from "react";
import AddingSubDisplay from "./AddingSubDisplay";
import { Button, Table, Icon, Input } from "semantic-ui-react";

const AddingDisplay = ({
  inputHandlerCodeSub,
  inputHandlerDescriptionSub,
  mainId,
  sub_elements,
  removeInputSub
}) => {
  const display = sub_elements.map((data, i) => {
    const { abbreviation_code, text, id, addition } = data;
    if (addition === true) {
      return (
        <>
          <Table.Row>
            <Table.Cell style={{ paddingLeft: "30px" }}>
              <Input
                placeholder={"Code"}
                value={abbreviation_code}
                name="abbreviation_code"
                onChange={e => inputHandlerCodeSub({ e, i, mainId })}
              />
            </Table.Cell>
            <Table.Cell style={{ paddingLeft: "30px" }} colSpan="2">
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
                onClick={() => removeInputSub({ i, mainId })}
              />
            </Table.Cell>
          </Table.Row>
        </>
      );
    }
  });
  return <>{display}</>;
};

export default AddingDisplay;
