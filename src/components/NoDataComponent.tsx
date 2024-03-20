import { Center, Heading, Text } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

interface Props {
  text: string;
}

export const NoDataComponent: React.FC<Props> = ({ text }) => {
  return (
    <Center h="100%" flexDirection="column">
      <Heading>
        <Center h="100%">
          <WarningIcon marginRight="2" />
          No data
        </Center>
      </Heading>
      <Text marginTop="1">Add some expenses to create {text}</Text>
    </Center>
  );
};
