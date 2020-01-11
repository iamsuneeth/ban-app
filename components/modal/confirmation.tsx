import React from "react";
import { Button } from "../elements/button/Button";
import { Text } from "../elements/text/Text";
import { Row } from "../elements/view/Row";
import { PaddedView } from "../elements/view/PaddedView";

export const confirmation = ({ sheetRef, message, onSelection }) => {
  return (
    <>
      <Text type="main" center>
        {message}
      </Text>
      <Row>
        <PaddedView size="medium">
          <Button
            primary
            style={{ flex: 1 }}
            onPress={() => {
              sheetRef.current.snapTo(0);
              onSelection && onSelection(true);
            }}
          >
            Confirm
          </Button>
        </PaddedView>
        <PaddedView size="medium">
          <Button
            secondary
            style={{ flex: 1 }}
            onPress={() => {
              sheetRef.current.snapTo(0);
              onSelection && onSelection(true);
            }}
          >
            Cancel
          </Button>
        </PaddedView>
      </Row>
    </>
  );
};
