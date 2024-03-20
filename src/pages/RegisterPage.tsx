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
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  // const [isLoading, setIsLoading] = useState<boolean>(false); loading during promise to be done
  const navigate = useNavigate();
  const email = useRef<string | undefined>();
  const password = useRef<number | undefined>();
  const confirmPassword = useRef<string | undefined>();

  const registerButtonHandler = async () => {
    if (password.current.value !== confirmPassword.current.value) {
      console.log("passwords not the same"); // to be done later
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.current.value,
      password: password.current.value,
    });

    if (error) {
      console.error("Error signing up:", error.message);
      return error.message;
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
                ref={confirmPassword}
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
