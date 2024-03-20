import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  Skeleton,
  Center,
  VStack,
  AbsoluteCenter,
  Box,
  Flex,
} from "@chakra-ui/react";
import {
  fetchCurrentMonthExpenseValue,
  fetchLastMonthExpenseValue,
  fetchCurrentYearExpenseValue,
} from "../utility/databaseActions";
import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useAuth } from "../hooks/useAuth";

export const Stats = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [spent, setSpent] = useState();
  const [percentageValue, setPercentageValue] = useState();
  const [isPercentageValueVisible, setIsPercentageValueVisible] =
    useState<boolean>(false);
  const [stateArrow, setStateArrow] = useState<
    "increase" | "decrease" | null
  >();

  const [yearSpent, setYearSpent] = useState();

  const spentHandler = async () => {
    const value = await fetchCurrentMonthExpenseValue(user);
    setSpent(value);
  };

  const yearSpentHandler = async () => {
    const value = await fetchCurrentYearExpenseValue(user);
    setYearSpent(value);
  };

  const calculatePercentageValue = async () => {
    const currentMonth = await fetchCurrentMonthExpenseValue(user);
    const lastMonth = await fetchLastMonthExpenseValue(user);

    if (lastMonth === 0) {
      setIsPercentageValueVisible(false);
      setPercentageValue(null); // Reset percentage value
      return;
    }

    const difference = currentMonth - lastMonth;
    const percentage = ((currentMonth - lastMonth) / lastMonth) * 100;

    if (currentMonth === lastMonth) {
      setIsPercentageValueVisible(true);
      setPercentageValue(null);
      setStateArrow(null); // Remove arrow if values are the same
      return;
    }

    setPercentageValue(Math.abs(percentage.toFixed(2)));
    setStateArrow(difference > 0 ? "increase" : "decrease");
    setIsPercentageValueVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await spentHandler();
      await calculatePercentageValue();
      await yearSpentHandler();
    };

    const subscription = supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        fetchData
      )
      .subscribe();

    fetchData().then(() => {
      setIsLoaded(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card h="100%" alignItems="center" justifyContent="center">
      <Flex
        w="100%"
        h="100%"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        // backgroundColor="red"
      >
        <Skeleton
          isLoaded={isLoaded}
          fadeDuration={0.5}
          startColor="white"
          endColor="white"
        >
          <Stat
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p="4"
          >
            <StatLabel>Spent this month</StatLabel>
            <StatNumber>{spent} PLN</StatNumber>
            {isPercentageValueVisible && (
              <StatHelpText>
                {stateArrow && <StatArrow type={stateArrow} />}
                {percentageValue === null
                  ? "Same as last month"
                  : `${percentageValue}% ${
                      stateArrow === "increase" ? "more" : "less"
                    } than last month`}
              </StatHelpText>
            )}
          </Stat>

          <Stat
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p="4"
          >
            <StatLabel>Spent this year</StatLabel>
            <StatNumber>{yearSpent} PLN</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              5% more than last month
            </StatHelpText>
          </Stat>

          {/* </AbsoluteCenter> */}
        </Skeleton>
      </Flex>
    </Card>
  );
};
