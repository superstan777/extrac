import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { Grid, GridItem } from "@chakra-ui/react";
import { Graph } from "../components/Graph";
import { Stats } from "../components/Stats";

export const DashboardPage = () => {
  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={4}
        height={{ base: "100%", md: "100vh" }}
        padding={{ base: 0, md: "5" }}
      >
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <ExpenseForm />
        </GridItem>

        <GridItem colSpan={{ base: 3, md: 2 }}>
          <Graph />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <Stats />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <ExpenseTable />
        </GridItem>
      </Grid>
    </>
  );
};
