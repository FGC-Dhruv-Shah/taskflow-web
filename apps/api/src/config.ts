export interface Settings {
  appName: string;
  apiVersion: string;
  defaultPageSize: number;
  maxPageSize: number;
  defaultCurrency: string;
}

export const settings: Settings = {
  appName: "TaskFlow API",
  apiVersion: "v1",
  defaultPageSize: 20,
  maxPageSize: 100,
  defaultCurrency: "USD",
};
