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
import { useState } from "react";
import { addExpense } from "../utility/databaseActions";
import { useAuth } from "../hooks/useAuth";

export const ExpenseForm = () => {
  const { user } = useAuth();

  // const [isLoading, setIsLoading] = useState<boolean>(false); loading during promise to be done
  const [split, setSplit] = useState("true");
  const [expense, setExpense] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  const toast = useToast();

  const formHandler = async () => {
    try {
      await addExpense(expense, Number(value), date, JSON.parse(split), user);
      setExpense("");
      setValue("");

      toast({
        title: "Expense added",
        description: "Database has been updated with new record.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding expense:", error);

      toast({
        title: "Failed to add expense",
        description: "Make sure all fields are filled correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //error border to be done https://chakra-ui.com/docs/components/input/usage

  return (
    <Card h="100%">
      <CardHeader>
        <Heading size="md">Add Expense</Heading>
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
            <Input
              placeholder="Enter expense"
              onChange={(e) => setExpense(e.target.value)}
              value={expense}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input
              placeholder="Enter amount"
              type="number"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              D
            </InputLeftElement>
            <Input
              placeholder="Enter date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
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
  );
};
