import React from "react";
import { Header, Icon, Transition } from "semantic-ui-react";

const SuccessMessage = ({ success }) => {
  return (
    <Transition visible={success} animation="scale" duration={500}>
      <Header as="h3">
        <Icon name="check" />
        Your changes have been made
      </Header>
    </Transition>
  );
};

export default SuccessMessage;
