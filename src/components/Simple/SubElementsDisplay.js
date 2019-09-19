import React from "react";
import { Button, Table, Icon, Input } from "semantic-ui-react";
import AddingSubDisplay from "./AddingSubDisplay";
const SubElementsDisplay = ({
  sub_elements,
  editSubElementHandler,
  deleteSubHandler,
  mainId
}) => {
  return sub_elements.map((data, i) => {
    const { abbreviation_code, text, id, addition } = data;
    if (addition !== true) {
      return (
        <Table.Row>
          <Table.Cell style={{ paddingLeft: "30px" }}>
            <Input
              placeholder={abbreviation_code}
              value={abbreviation_code}
              name="abbreviation_code"
              onChange={e => editSubElementHandler({ e, i, mainId })}
            />
          </Table.Cell>
          <Table.Cell colSpan="2" style={{ paddingLeft: "30px" }}>
            <Input
              placeholder={text}
              value={text}
              name="text"
              style={{ width: "100%" }}
              onChange={e => editSubElementHandler({ e, i, mainId })}
            />
          </Table.Cell>
          <Table.Cell>
            <Button
              style={{
                fontSize: "1.2em",
                padding: "10px",
                width: "75px"
              }}
              color="red"
              icon
              onClick={() => deleteSubHandler({ id, abbreviation_code })}
              disabled={addition === true}
            >
              <Icon name="trash" position="right" />
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    }
  });
};

export default SubElementsDisplay;
