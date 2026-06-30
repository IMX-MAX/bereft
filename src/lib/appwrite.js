import { Client, Account, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://tor.cloud.appwrite.io/v1")
  .setProject("69bdb28e003c4db80f0a");

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
