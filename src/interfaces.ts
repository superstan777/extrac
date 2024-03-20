export interface Expense {
  date: string | null;
  id: number;
  name: string;
  split: boolean | null;
  value: number | null;
}

export interface GraphData {
  month:
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";
  spent: number;
}
