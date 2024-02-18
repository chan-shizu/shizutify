import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocument, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { marshallOptions, unmarshallOptions } from "./fetchSongsOptions";

const translateConfig = { marshallOptions, unmarshallOptions };
const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
});
const ddbDocClient = DynamoDBDocument.from(dbClient, translateConfig);

export const fetchSongs = async () => {
  const command = new ScanCommand({
    TableName: process.env.AWS_DYNAMO_SONG_TABLE_NAME,
  });
  const output = await ddbDocClient.send(command);
  const songs = output.Items;
  if (!songs) return undefined;
  return songs.sort((a, b) => b.created_at - a.created_at);
};
