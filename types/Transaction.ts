export interface Transaction {
  id: string;
  userId: string;
  name: string;
  value: number;
  type: TransactionType;
  expenseType?: ExpenseType;
  dateCreated: Date;
}

export enum TransactionType {
  INCOME,
  EXPENSE,
}

export enum ExpenseType {
  FOOD,
  ELECTRICITY,
  MEDICINE,
  INTERNET,
  TELEPHONE,
  HOUSING,
  FUEL,
  TECH,
  ENTERTAINMENT,
  OTHER,
}
