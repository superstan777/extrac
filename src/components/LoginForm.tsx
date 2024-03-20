import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  Radio,
  RadioGroup,
  useToast,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { addExpense } from "../utility/addExpense";

export const LoginForm = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false); loading during promise to be done
  const [split, setSplit] = useState("true");
  const expense = useRef<string | undefined>();
  const value = useRef<number | undefined>();
  const date = useRef<string | undefined>();

  const toast = useToast();

  const formHandler = () => {
    addExpense(
      expense.current.value,
      value.current.value,
      date.current.value,
      JSON.parse(split)
    );
    toast({
      title: "Expense added",
      description: "Database has been updated with new record.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  //error border to be done https://chakra-ui.com/docs/components/input/usage

  return (
    <Center>
      <Card h="100%" w="40%">
        <CardHeader>
          <Heading size="md">Log in</Heading>
        </CardHeader>
        <CardBody>
          <Stack spacing={4}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                E
              </InputLeftElement>
              <Input placeholder="Enter expense" ref={expense} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                $
              </InputLeftElement>
              <Input placeholder="Enter amount" ref={value} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                D
              </InputLeftElement>
              <Input placeholder="Enter date" ref={date} />
            </InputGroup>

            <Center>
              <Text marginRight="1rem">Split?</Text>
              <RadioGroup defaultValue="true" onChange={setSplit} value={split}>
                <Stack direction="row">
                  <Radio value="true">yes</Radio>
                  <Radio value="false">no</Radio>
                </Stack>
              </RadioGroup>
            </Center>

            <Button
              colorScheme="blue"
              // isLoading
              onClick={formHandler}
            >
              Add Expense
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
