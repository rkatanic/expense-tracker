export interface Transaction {
  id?: string;
  userId: string;
  name: string;
  value: number;
  type: TransactionType;
  category?: Category | string;
  dateCreated: number;
  dateModified?: number;
}

export enum TransactionType {
  INCOME = "Income",
  EXPENSE = "Expense",
}

export enum Category {
  SALARY = "Salary",
  FOOD_AND_DRINKS = "Food & Drinks",
  ELECTRICITY = "Electricity",
  MEDICINE = "Medicine",
  INTERNET = "Internet",
  TELEPHONE = "Telephone",
  HOUSING = "Housing",
  FUEL = "Fuel",
  TECH = "Tech",
  ENTERTAINMENT = "Entertainment",
  OTHER = "Other",
}
