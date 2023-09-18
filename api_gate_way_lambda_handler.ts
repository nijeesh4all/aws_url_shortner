import * as aws from "@pulumi/aws";
import { retrive_url, store_url } from "./urls_table";

function if_valid_http_url(string: string): boolean {
  try {
    const newUrl = new URL(string);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function response(json_body:object, status_code: number){
    return {
        statusCode: status_code,
        body: JSON.stringify(json_body)
    }
}

function success_response(message: string, status_code: number, body:object) {
    return response(
        {
            message,
            error: false,
            ...body
        },
        status_code
    )
}

function error_response(message: string, status_code: number) {
    return response(
        {
            message,
            error: true
        },
        status_code
    )
}

const createUrlHandler = new aws.lambda.CallbackFunction("createUrlHandler", {
  memorySize: 256 /*MB*/,
  callback: async function (event: any, context) {
    console.log("event.body", event.body);
    
    const url = atob(event.body);
    console.log("url", url);

    if (!url) {
      return error_response("empty url", 400);
    }

    if (!if_valid_http_url(url)) {
      return error_response("invalid url", 400);
    }

    const response = await store_url(url)
    if(!response){
        return error_response("could not create", 400)
    }

    return success_response( "created",  201, response);
  },
});

const getUrlHandler = new aws.lambda.CallbackFunction("getUrlHandler", {
  memorySize: 256 /*MB*/,
  callback: async function (event: any, context) {
    const { urlId } = event.pathParameters;

    console.log("event.requestParameters", event.pathParameters);
    console.log("url", urlId);

    if (!urlId) {
      return error_response("empty url", 404);
    }

    const result = await retrive_url(urlId);
    console.log("result", result);
    const { url } = result;

    if (!url) {
      return error_response("empty url", 404);
    }

    return {
      statusCode: 301,
      headers: {
        Location: url,
      },
    };
  },
});

export { createUrlHandler, getUrlHandler };
