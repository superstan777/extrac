import { supabase } from "../client";

export const fetchAllExpenses = async (uuid: string) => {
  // sam se otypował - na początek daj typescryptowi podziałać zanim sam dasz typy

  const { data, error } = await supabase
    .from("expenses")
    .select()
    .eq("user_id", uuid)
    .order("date", { ascending: false });
  if (error) {
    throw new Error("Error fetching expenses: " + error.message);
  }
  return data;
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
  if (error) {
    throw new Error("Error deleting expense: " + error.message);
  }
};

export const fetchCurrentMonthExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("value")
    .eq("user_id", uuid)
    .gte("date", startOfMonth.toDateString())
    .lte("date", endOfMonth.toDateString());
  if (error) {
    throw new Error(
      "Error fetching value of current month expenses: " + error.message
    );
  }

  const valuesArray: number[] = data.map((obj) => obj.value);
  const sum: number = valuesArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

export const fetchCurrentYearExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const { data, error } = await supabase
    .from("expenses")
    .select("value")
    .eq("user_id", uuid)
    .gte("date", startOfYear.toDateString())
    .lte("date", endOfYear.toDateString());

  if (error) {
    throw new Error(
      "Error fetching value of current year expenses: " + error.message
    );
  }

  const valuesArray: number[] = data.map((obj) => obj.value);
  const sum: number = valuesArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

export const fetchLastMonthExpenseValue = async (uuid: string) => {
  const today = new Date();
  const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("value")
    .eq("user_id", uuid)
    .gte("date", lastMonthStart.toDateString()) // Greater than or equal to start of last month
    .lte("date", lastMonthEnd.toDateString()); // Less than or equal to end of last month

  if (error) {
    throw new Error(
      "Error fetching value of last month expenses: " + error.message
    );
  }

  const valuesArray: number[] = data.map((obj) => obj.value);
  const sum: number = valuesArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

export const fetchLastThreeMonthsExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("value, date")
    .eq("user_id", uuid)
    .gte("date", startDate.toDateString())
    .lte("date", endDate.toDateString());

  if (error) {
    throw new Error(
      "Error fetching value of last three months expenses: " + error.message
    );
  }

  const valuesArray: number[] = data.map((obj) => obj.value);
  const sum: number = valuesArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
};

export const fetchLastThreeMonthsExpenses = async (uuid: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("value, date")
    .eq("user_id", uuid)
    .gte("date", startDate.toDateString())
    .lte("date", endDate.toDateString());

  if (error) {
    throw new Error(
      "Error fetching value of last three months expenses: " + error.message
    );
  }

  return data;
};

export const fetchLastSixMonthsExpenseValue = async (uuid: string) => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const { data, error } = await supabase
    .from("expenses")
    .select("value, date")
    .eq("user_id", uuid)
    .gte("date", startDate.toDateString())
    .lte("date", endDate.toDateString());

  if (error) {
    throw new Error(
      "Error fetching value of last six months expenses:  " + error.message
    );
  }

  const valuesArray: number[] = data.map((obj) => obj.value);
  const sum: number = valuesArray.reduce((acc, curr) => acc + curr, 0);
  return sum;
};
