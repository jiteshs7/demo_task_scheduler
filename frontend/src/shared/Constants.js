export const REGEX = Object.freeze({
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  FULL_NAME: /^[a-zA-Z ]*$/,
});

export const PRIORITY = Object.freeze({
  HIGH: { val: 2, label: "High" },
  MEDIUM: { val: 1, label: "Medium" },
  LOW: { val: 0, label: "Low" },
});

export const STATUS = Object.freeze({
  NOT_STARTED: { val: 0, label: "Not Started" },
  IN_PROGRESS: { val: 1, label: "In Progress" },
  COMPLETED: { val: 2, label: "Completed" },
});

export const SECRET_KEY = "super-secret";

export const BASE_URL = "http://localhost:8080";
