import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Center,
  Heading,
  Text,
  Skeleton,
  Flex,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { supabase } from "../client";
import { Expense } from "../interfaces";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { deleteExpense } from "../utility/databaseActions";
import { fetchAllExpenses } from "../utility/databaseActions";
import { useAuth } from "../hooks/useAuth";

export const ExpenseTable = () => {
  const { user } = useAuth();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [list, setList] = useState<Expense[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const subscription = supabase
      .channel("room1")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        () => {
          listHandler();
        }
      )
      .subscribe();

    listHandler().then(() => {
      setIsLoaded(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const listHandler = async () => {
    const array = await fetchAllExpenses(user);
    setList(array);
  };

  const deleteHandler = (id: number) => {
    deleteExpense(id);
  };

  const renderExpenses = () => {
    if (list) {
      const lastIndex = currentPage * itemsPerPage;
      const firstIndex = lastIndex - itemsPerPage;
      const currentItems = list.slice(firstIndex, lastIndex);

      return currentItems.map((obj: Expense) => (
        <Tr key={obj.id}>
          <Td>{obj.name}</Td>
          <Td isNumeric>{obj.value}</Td>
          <Td>{obj.date}</Td>
          <Td>{obj.split && <CheckIcon />}</Td>

          <Td>
            <Center>
              <Button variant="ghost" onClick={() => console.log("edit")}>
                <EditIcon />
              </Button>
              <Button variant="ghost" onClick={() => deleteHandler(obj.id)}>
                <DeleteIcon />
              </Button>
            </Center>
          </Td>
        </Tr>
      ));
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <Card h="100%">
      <Skeleton
        isLoaded={isLoaded}
        fadeDuration={4}
        startColor="white"
        endColor="white"
      >
        <Flex
          w="100%"
          h="100%"
          alignContent="center"
          alignItems="center"
          justifyContent="center"
        >
          <CardBody w="90%">
            {list?.length !== 0 ? (
              <>
                <TableContainer>
                  <Table variant="striped" colorScheme="gray" size="sm">
                    <Thead>
                      <Tr>
                        <Th>EXPENSE</Th>
                        <Th isNumeric>VALUE</Th>
                        <Th>DATE</Th>
                        <Th>SPLIT</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{renderExpenses()}</Tbody>
                  </Table>
                </TableContainer>
                <Button
                  onClick={prevPage}
                  isDisabled={currentPage === 1}
                  margin="2"
                >
                  <ArrowBackIcon />
                </Button>
                <Button
                  margin="2"
                  onClick={nextPage}
                  isDisabled={currentPage * itemsPerPage >= (list?.length || 0)}
                  // isDisabled
                >
                  <ArrowForwardIcon />
                </Button>
              </>
            ) : (
              <Center h="100%" flexDirection="column">
                <Heading>
                  <Center h="100%">
                    <WarningIcon marginRight="2" />
                    No data
                  </Center>
                </Heading>
                <Text marginTop="1">Add some expenses to create table</Text>
              </Center>
            )}
          </CardBody>
        </Flex>
      </Skeleton>
    </Card>
  );
};
