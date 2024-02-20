import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const dbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_DYNAMO_SECRET_ACCESS_KEY as string,
  },
  region: process.env.AWS_REGION,
});
const docClient = DynamoDBDocumentClient.from(dbClient);

export async function POST(request: Request) {
  try {
    const { customerName, artistName, songName, other } = await request.json();
    const currentDateTime = new Date();
    const command = new PutCommand({
      TableName: process.env.AWS_DYNAMO_REQUEST_TABLE_NAME,
      Item: {
        request_id: randomUUID(),
        customer_name: customerName,
        artist_name: artistName,
        song_name: songName,
        other: other,
        created_at: currentDateTime.toString(),
      },
    });
    const response = await docClient.send(command);
    return Response.json({ status: 200 });
  } catch {
    return Response.json({ message: "post failed" }, { status: 400 });
  }
}
