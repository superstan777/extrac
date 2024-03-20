import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { fetchLastThreeMonthsExpenseValue } from "../utility/databaseActions";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { GraphData } from "../interfaces";
import { NoDataComponent } from "./NoDataComponent";
import { useAuth } from "../hooks/useAuth";

interface FetchData {
  value: number;
  data: string;
}

export const Graph = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<GraphData[] | undefined>(
    undefined
  );

  const graphHandler = async () => {
    const data = await fetchLastThreeMonthsExpenseValue(user);

    const formattedData = formatLastThreeMonths(data);
    console.log(formattedData);
    setGraphData(formattedData);
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

  const formatLastThreeMonths = (data: FetchData): GraphData[] => {
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

    const groupedValues = {};

    // Loop through each object in the input data
    data.forEach((item) => {
      // Extract month from the date string
      const monthIndex = parseInt(item.date.split("-")[1]) - 1;
      const monthName = monthNames[monthIndex];

      // Create a key in the groupedValues object for the month if it doesn't exist
      if (!groupedValues[monthName]) {
        groupedValues[monthName] = 0;
      }

      // Increment the value for the corresponding month
      groupedValues[monthName] += item.value;
    });

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

  return (
    <Card h="100%">
      <Skeleton
        isLoaded={isLoaded}
        fadeDuration={1}
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
