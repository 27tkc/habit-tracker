import { Account, Client } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // Your project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!); // Your app's package name

export const account = new Account(client);
