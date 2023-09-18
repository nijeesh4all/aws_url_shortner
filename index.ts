import * as pulumi from "@pulumi/pulumi";
import * as apigateway from "@pulumi/aws-apigateway";
import { lambda } from "@pulumi/aws";

import { createUrlHandler, getUrlHandler } from "./api_gate_way_lambda_handler";
import urls_table from "./urls_table";

const helloHandler = new lambda.CallbackFunction("hello-handler", {
  callback: async (ev, ctx) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello, API Gateway!" })
    };
  },
});

// Define an endpoint that invokes a lambda to handle requests
const api = new apigateway.RestAPI("api", {
  routes: [
    {
      path: "test",
      method: "GET",
      eventHandler: helloHandler,
    },
    {
      path: "url",
      method: "POST",
      eventHandler: createUrlHandler,
    },
    {
      path: "url/{urlId}",
      method: "GET",
      eventHandler: getUrlHandler,
    },
  ],
});

export default api.url;
