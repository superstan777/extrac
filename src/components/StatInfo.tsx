import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import {
  fetchCurrentMonthExpenseValue,
  fetchLastMonthExpenseValue,
} from "../utility/databaseActions";
import { supabase } from "../client";
import { authContext } from "../authContext";

export const StatInfo = () => {
  const uuid = useContext(authContext);
  const [mainValue, setMainValue] = useState();
  const [percentageValue, setPercentageValue] = useState();
  const [stateArrow, setStateArrow] = useState<"increase" | "decrease">();

  const mainValueHandler = async () => {
    const value = await fetchCurrentMonthExpenseValue(uuid);
    setMainValue(value);
  };
  const percentageValueHandler = async () => {
    const currentMonth = await fetchCurrentMonthExpenseValue(uuid);
    const lastMonth = await fetchLastMonthExpenseValue(uuid);
    if (currentMonth > lastMonth) {
      const percentageValue = (currentMonth / lastMonth - 1) * 100;
      setPercentageValue(percentageValue.toFixed(2));
      setStateArrow("increase");
    }

    if (currentMonth < lastMonth) {
      const percentageValue = (1 - currentMonth / lastMonth) * 100;
      setPercentageValue(percentageValue.toFixed(2));
      setStateArrow("decrease");
    }
  };

  useEffect(() => {
    const subscription = supabase
      .channel("room2")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "expenses" },
        () => {
          mainValueHandler();
          percentageValueHandler();
        }
      )
      .subscribe();

    mainValueHandler();
    percentageValueHandler();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Stat
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <StatLabel>Spent</StatLabel>
      <StatNumber>{mainValue} PLN</StatNumber>
      <StatHelpText>
        <StatArrow type={stateArrow} />
        {percentageValue}% {stateArrow === "increase" ? "more" : "less"} than
        last month
      </StatHelpText>
    </Stat>
  );
};
