export interface ExpenseInterface {
  date: string | null;
  id: number;
  name: string;
  split: boolean | null;
  value: number | null;
  user_id: string | null;
}

export interface GraphDataInterface {
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

export interface AuthInterface {
  user: string;
  login: (user: string) => Promise<void>;
  logout: () => void;
}
