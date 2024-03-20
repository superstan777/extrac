import { ExpenseForm } from "../components/ExpenseForm";
import { ExpenseTable } from "../components/ExpenseTable";
import { Grid, GridItem } from "@chakra-ui/react";
import { Graph } from "../components/Graph";
import { Stats } from "../components/Stats";

export const DashboardPage = () => {
  return (
    <>
      <Grid
        h="90vh"
        maxH="90vh"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={1} colSpan={1}>
          <ExpenseForm />
        </GridItem>

        <GridItem colSpan={2}>
          <Graph />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Stats />
        </GridItem>
        <GridItem colSpan={2}>
          <ExpenseTable />
        </GridItem>
      </Grid>
    </>
  );
};
