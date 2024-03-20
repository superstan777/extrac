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
} from "@chakra-ui/react";
import { useRef } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginPage = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false); loading during promise to be done
  const { login } = useAuth();
  const email = useRef<string | undefined>();
  const password = useRef<number | undefined>();

  const loginButtonHandler = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.current.value,
      password: password.current.value,
    });
    if (error) {
      console.error("Error signing in:", error.message);
      return error.message;
    } else {
      console.log(data.user.id);
      await login(data.user.id);
      // return data.user;
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
              <Input placeholder="Enter email" ref={email} />
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
                ref={password}
                type="password"
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
