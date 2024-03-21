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
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  const { login } = useAuth();
  // const [isEmailEmpty, setIsEmailEmpty] = useState<boolean>(false);
  // const [isPasswordEmpty, setIsPasswordEmpty] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();

  // const isEmpty = (string: string): boolean => {
  //   return string === "" ? true : false;
  // };

  const loginButtonHandler = async () => {
    // if (isEmpty(email.current.value)) {
    //   setIsEmailEmpty(true);
    // }

    // if (isEmpty(password.current.value)) {
    //   setIsPasswordEmpty(true);
    // }

    // if (isEmailEmpty || isPasswordEmpty) {
    //   return;
    // }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      toast({
        title: "Invalid credentials",
        description: "Make sure email and passwords are correct",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      return error.message;
    } else {
      await login(data.user.id).then(() =>
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        })
      );
    }
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
              <Input
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                // isInvalid={isEmailEmpty}
                errorBorderColor="red.300"
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
                type="password"
                // isInvalid={isPasswordEmpty}
                errorBorderColor="red.300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button colorScheme="blue" onClick={loginButtonHandler}>
              Log in
            </Button>
            <Text>or</Text>
            <Center>
              <Link to={`/register`}>
                <Button colorScheme="blue" variant="link" w="fit-content">
                  Register
                </Button>
              </Link>
            </Center>
          </Stack>
        </CardBody>
      </Card>
    </Center>
  );
};
