import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "../client";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const registerButtonHandler = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords are not the same",
        description: "Make sure both passwords are correct",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Error crea",
        description: "Account wasn't created. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log(data);
      navigate("/login");
    }
  };

  //error border to be done https://chakra-ui.com/docs/components/input/usage

  return (
    <Center>
      <Card h="100%" w="40%">
        <CardHeader>
          <Heading size="md">Register</Heading>
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
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                P
              </InputLeftElement>
              <Input
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
              >
                P
              </InputLeftElement>
              <Input
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
              />
            </InputGroup>
            <Button colorScheme="blue" onClick={registerButtonHandler}>
              Register
            </Button>
            <Text>or</Text>
            <Center>
              <Link to="/login">
                <Button colorScheme="blue" variant="link" w="fit-content">
                  Log in
                </Button>
              </Link>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
