
# AWS URL Shortener Service with Pulumi

This repository contains the code and configuration for an AWS-based URL shortener service built using Pulumi. This service allows you to shorten URLs and provides endpoints for both creating and accessing shortened URLs.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shorten long URLs to compact, easy-to-share forms.
- Two main endpoints:
  1. `POST /url` to shorten a URL.
  2. `GET /url/{urlId}` to redirect to the original URL.
- Data storage using AWS DynamoDB.
- Automatic generation of short URLs.

## Prerequisites

Before you can deploy this URL shortener service, ensure you have the following prerequisites:

- [Pulumi](https://www.pulumi.com/docs/get-started/aws/begin/)
- [AWS CLI](https://aws.amazon.com/cli/)
- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [AWS Account](https://aws.amazon.com/free/)

## Getting Started

To get started with this URL shortener service, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/nijeesh4all/aws_url_shortner
   ```

2. Navigate to the project directory:

   ```bash
   cd aws_url_shortner
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure your AWS credentials:

   ```bash
   aws configure
   ```

5. Deploy the Pulumi stack:

   ```bash
   pulumi up
   ```

## Usage

Once the Pulumi stack is deployed, you can start using the URL shortener service. Here are some example requests:

### Shorten a URL

```http
POST /url

Request Body:
"https://example.com/your/long/url"
```

Response:
```json
{
  "id": "85ab57bd-f8cf-46f0-88e9-ec7c148a5d53",
  "createdAt": "2023-09-28T12:00:00Z",
  "url": "https://example.com/your/long/url",
  "short_url": "https://<api_gateway_url>/85ab57bd-f8cf-46f0-88e9-ec7c148a5d53"
}
```

### Redirect to the Original URL

```http
GET /url/85ab57bd-f8cf-46f0-88e9-ec7c148a5d53
```

This will perform an HTTP 301 redirection to the original long URL.

## Architecture

The URL shortener service is built on AWS using the following services:

- AWS Lambda for handling HTTP requests.
- AWS API Gateway for API routing.
- AWS DynamoDB for storing URL mappings.
- Pulumi for defining and connecting AWS resources.



## Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

In this template, replace the placeholders with your specific project details. You might want to include an architecture diagram (`architecture.png`) to illustrate the service's architecture. Additionally, create the mentioned `ARCHITECTURE.md`, `CONTRIBUTING.md`, and `LICENSE` files as appropriate for your project.

Remember to keep your README up to date as your project evolves, and provide clear instructions for users to set up and use the service.
```

## TODO
- [ ] Add Proper Authentication:
- [ ] Implement Web Application Firewall (WAF):
- [ ] Enable URL Expiration with TTL:
- [ ] Monitoring and Logging:
- [ ] Rate Limiting and Throttling:
- [ ] Custom Domains and SSL/TLS:
- [ ] Testing and CI/CD:
