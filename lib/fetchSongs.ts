import { DynamoSong } from "@/type/dynamo";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocument, ScanCommand } from "@aws-sdk/lib-dynamodb";

const marshallOptions = {
  convertEmptyValues: false, // false, by default.
  removeUndefinedValues: false, // false, by default.
  convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
  wrapNumbers: false, // false, by default.
};

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
  if (songs == undefined) return undefined;
  return songs;
};