import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { fetchLastThreeMonthsExpenses } from "../utility/databaseActions";
import { useState, useEffect } from "react";
import { supabase } from "../client";
// import { GraphDataInterface } from "../interfaces";
import { NoDataComponent } from "./NoDataComponent";
import { useAuth } from "../hooks/useAuth";

interface ValueDateExpense {
  value: number;
  date: string | null;
}

export const Graph = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<any>(undefined);

  //formatowanie
  const formatLastThreeMonths = (array: ValueDateExpense[]) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const groupedValues: any = {};

    array.forEach((item: ValueDateExpense) => {
      if (item.date) {
        const monthIndex = parseInt(item.date.split("-")[1]) - 1; // wyciagam numer miesiaca

        const monthName = monthNames[monthIndex]; // zamieniam numer miesiaca na nazwe miesiaca

        // Create a key in the groupedValues object for the month if it doesn't exist
        if (!groupedValues[monthName]) {
          groupedValues[monthName] = 0;
        }

        // Increment the value for the corresponding month
        groupedValues[monthName] += item.value;
      }
    });
    console.log(groupedValues);
    // Format the result to match the desired format and sort by month index
    const formattedResult = Object.keys(groupedValues)
      .map((month) => {
        return { month: month, spent: groupedValues[month] };
      })
      .sort((a, b) => {
        return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
      });

    return formattedResult;
  };

  //handler
  const graphHandler = async () => {
    const expenseArray = await fetchLastThreeMonthsExpenses(user);

    if (expenseArray) {
      const formattedData = formatLastThreeMonths(expenseArray);
      setGraphData(formattedData);
    }
  };

  useEffect(() => {
    const subscription = supabase
      .channel("room3")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        () => {
          graphHandler();
        }
      )
      .subscribe();

    graphHandler().then(() => {
      setIsLoaded(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card h="100%">
      <Skeleton
        isLoaded={isLoaded}
        fadeDuration={0.5}
        startColor="white"
        endColor="white"
      >
        <CardBody>
          {graphData?.length !== 0 ? (
            <>
              <CardHeader>
                <Heading size="md">Monthly spendings</Heading>
              </CardHeader>
              <CardBody>
                <Center>
                  <LineChart width={600} height={200} data={graphData}>
                    <Line type="monotone" dataKey="spent" stroke="#3182ce" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </Center>
              </CardBody>
            </>
          ) : (
            <NoDataComponent text="graph" />
          )}
        </CardBody>
      </Skeleton>
    </Card>
  );
};
