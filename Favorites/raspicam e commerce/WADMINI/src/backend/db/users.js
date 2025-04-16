import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Ribhav",
    lastName: "Soni",
    email: "ribhavsoni19@gmail.com",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Sheel",
    lastName: "Todkar",
    email: "sheeltodkar@gmail.com",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Harshad",
    lastName: "Shinde",
    email: "harshadshinde@gmail.com",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
