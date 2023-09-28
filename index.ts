import * as pulumi from "@pulumi/pulumi";
import { lambda } from "@pulumi/aws";

import urls_table from "./src/urls_table";
import api from './src/api'
import assets_bucket from './src/site/index';


export default api.url;
exports.bucket_name = assets_bucket.bucket
exports.bucket_website = assets_bucket.websiteEndpoint