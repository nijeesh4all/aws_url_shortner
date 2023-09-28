import { createUrlHandler, getUrlHandler } from "./api_gate_way_lambda_handlers";
import * as apigateway2 from "@pulumi/aws-apigateway";
import assets_bucket from './site/index';


// Define an endpoint that invokes a lambda to handle requests
const api = new apigateway2.RestAPI("api", {
    routes: [
      {
        path: "url",
        method: "POST",
        eventHandler: createUrlHandler,
      },
      {
        path: "url/{urlId}",
        method: "GET",
        eventHandler: getUrlHandler,
      }
    ]
  });
  
export default api

