import React, { useState } from "react";
import { useTextSelection } from "@mantine/hooks";

import { Container, Stack, Text, Textarea, Title } from "@mantine/core";

interface Props {
  // rootElement: HTMLElement;
  value: string;
}

function App({ value }: Props) {
  console.log(
    "APP"
    // window.getSelection()?.toString(),
    // (rootElement.shadowRoot as any).getSelection()
  );

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("value:", e.target.value);
    // setValue(e.target.value);
  };

  return (
    <Container size="xs" px="xs">
      <Title order={1}>WonderAI Chrome Extension</Title>
      <Stack>
        <Text>This is normal text by Mantine.dev package</Text>
        <Textarea value={value} onChange={onTextAreaChange} />
      </Stack>
    </Container>
  );
}

export default App;
