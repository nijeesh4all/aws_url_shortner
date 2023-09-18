import { dynamodb } from "@pulumi/aws";
import { randomUUID } from "crypto";
import * as aws from "@pulumi/aws";

import { DynamoDB } from "aws-sdk";

const urls_table = new dynamodb.Table("urls_table", {
  attributes: [
    {
      name: "id",
      type: "S",
    }
  ],
  hashKey: "id",
  readCapacity: 1,
  writeCapacity: 1,
});

export default urls_table;

const store_url = async (url: string) => {
  const urlId = randomUUID();
  const ddb = new DynamoDB({ apiVersion: "2012-08-10" });

  const params = {
    TableName: urls_table.name.get(),
    Item: {
      id: { S: urlId },
      url: { S: url },
      createdAt: { S: Date.now().toLocaleString() },
    },
  };

  console.log("params", params);

  try {
    const response = await ddb.putItem(params).promise();
    console.log("response", response);
    return params;
  } catch (e) {
    console.error("could not create item");
    console.error(e);
    return null;
  }
};

const retrive_url = async (uuid: string) => {
  const dynamoDB = new DynamoDB.DocumentClient();


  const params = {
    TableName: urls_table.name.get(),
    Key: {
      id: uuid,
    }
  };

  console.log("params", params);

  let url_object: any = {};

  try {
    const result = await dynamoDB.get(params).promise();
    console.log("result", result);

    if (result.Item) {
      url_object = result.Item
    }
  } catch (e) {
    console.error("could not retreive item ", uuid);
    console.error(e);
  }

  return url_object;
};

export { store_url, retrive_url };
