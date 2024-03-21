import { supabase } from "../client";

export const fetchAllExpenses = async (uuid: string) => {
  // sam se otypował - na początek daj typescryptowi podziałać zanim sam dasz typy
  try {
    const { data } = await supabase
      .from("expenses")
      .select()
      .eq("user_id", uuid)
      .order("date", { ascending: false });
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const addExpense = async (
  expense: string,
  value: number | null,
  date: string,
  split: boolean,
  uuid: string
): Promise<void> => {
  const { error } = await supabase
    .from("expenses")
    .insert({ name: expense, value, split, date, user_id: uuid });

  if (error) {
    throw new Error("Error adding expense: " + error.message);
  }
};

export const deleteExpense = async (id: number): Promise<void> => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);
};

export const fetchCurrentMonthExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("value")
      .eq("user_id", uuid)
      .gte("date", startOfMonth.toDateString()) // Greater than or equal to start of month
      .lte("date", endOfMonth.toDateString()); // Less than or equal to end of month

    const valuesArray = data?.map((obj) => obj.value);

    const sum = valuesArray.reduce((acc, curr) => acc + curr, 0);

    return sum;
  } catch (e) {
    console.log(e);
  }
};

export const fetchCurrentYearExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1); // Adjusted to the start of the year
  const endOfYear = new Date(today.getFullYear(), 11, 31); // Adjusted to the end of the year

  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("value")
      .eq("user_id", uuid)
      .gte("date", startOfYear.toDateString()) // Greater than or equal to start of year
      .lte("date", endOfYear.toDateString()); // Less than or equal to end of year

    if (error) {
      throw new Error(error.message);
    }

    const valuesArray = data?.map((obj) => obj.value);
    const sum = valuesArray?.reduce((acc, curr) => acc + curr, 0); // Handle the case when data is null or undefined

    return sum;
  } catch (error) {
    console.error("Error fetching current year expense value:", error);
    throw error; // Re-throw the error to handle it outside of this function
  }
};

export const fetchLastMonthExpenseValue = async (uuid: string) => {
  const today = new Date();
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  try {
    const { data } = await supabase
      .from("expenses")
      .select("value")
      .eq("user_id", uuid)
      .gte("date", lastMonthStart.toDateString()) // Greater than or equal to start of last month
      .lte("date", lastMonthEnd.toDateString()); // Less than or equal to end of last month

    const valuesArray = data?.map((obj) => obj.value);

    const sum = valuesArray?.reduce((acc, curr) => acc + curr, 0);

    return sum;
  } catch (e) {
    console.log(e);
  }
};

export const fetchLastThreeMonthsExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const { data } = await supabase
      .from("expenses")
      .select("value, date")
      .eq("user_id", uuid)
      .gte("date", startDate.toDateString()) // Greater than or equal to start of last month
      .lte("date", endDate.toDateString()); // Less than or equal to end of last month

    //   const valuesArray = data?.map((obj) => obj.value);
    //   const sum = valuesArray.reduce((acc, curr) => acc + curr, 0);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchLastSixMonthsExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const { data } = await supabase
      .from("expenses")
      .select("value, date")
      .eq("user_id", uuid)
      .gte("date", startDate.toDateString()) // Greater than or equal to start of last month
      .lte("date", endDate.toDateString()); // Less than or equal to end of last month

    console.log(data);
    //   const valuesArray = data?.map((obj) => obj.value);
    //   const sum = valuesArray.reduce((acc, curr) => acc + curr, 0);

    return data;
  } catch (e) {
    console.log(e);
  }
};
