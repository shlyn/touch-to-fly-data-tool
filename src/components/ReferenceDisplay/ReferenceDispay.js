import React, { Component } from "react";
import { Button, Segment, Header, Icon, Input } from "semantic-ui-react";

export default class ReferenceDispay extends Component {
  render() {
    const {
      resources,
      editing,
      resourcesHandler,
      currentResources
    } = this.props;
    const referenceDisplay = resources.map((data, i) => {
      if (editing) {
        return (
          <Segment>
            <Input
              onChange={e => resourcesHandler(e)}
              placeholder={data.resource.documentName}
              value={currentResources[i].resource.documentName}
              style={{ width: "100%" }}
            />
          </Segment>
        );
      } else {
        return <Segment>{data.resource.documentName}</Segment>;
      }
    });

    return (
      <>
        <Segment color="red">
          <Header>References</Header>
          <Segment.Group horizontal>
            {referenceDisplay}
            {editing && (
              <Button
                style={{ background: "transparent" }}
                onClick={() => this.setState({})}
              >
                <Icon name="add" />
              </Button>
            )}
          </Segment.Group>
        </Segment>
      </>
    );
  }
}
