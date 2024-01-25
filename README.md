
# Puppeteer-Lambda
## Convert Web Pages to PDF using AWS Lambda and Puppeteer in Node.js

This Node.js project demonstrates how to convert web pages to PDF files using AWS Lambda and Puppeteer. It is designed to provide a serverless solution for on-the-fly PDF generation from URLs, leveraging the power of headless browser automation.

### Installation

To get started with this project, you need to install the necessary Node.js dependencies.

1. **Install Node.js dependencies:**

   Run the following command in your project directory:

   ```bash
   npm install
   ```

   This command installs all the required dependencies, including Puppeteer, which is essential for the project's functionality.

### AWS Lambda Configuration with API Gateway

To deploy this solution on AWS, you need to configure AWS Lambda and set up an API Gateway. Follow these steps to get everything up and running:

1. **Create a Lambda Function:**

   - Go to the AWS Management Console.
   - Navigate to the Lambda service.
   - Click on "Create Function".
   - Choose "Author from scratch".
   - Enter a function name, select Node.js as the runtime.
   - Choose or create an execution role with basic Lambda permissions.

2. **Upload Your Code:**

   - After creating the function, upload your code (including `node_modules`) as a ZIP file.
   - Ensure your Lambda function handler is correctly set (e.g., `index.handler` if your main file is `index.js` and the exported function is `handler`).

3. **Increase Timeout and Memory:**

   - Puppeteer can be resource-intensive. Increase the Lambda function's timeout and memory allocation (e.g., 3 minutes and 1024 MB) to ensure smooth execution.

4. **Set up an API Gateway:**

   - Navigate to the API Gateway service in the AWS Management Console.
   - Create a new API (HTTP or REST API based on your preference).
   - Define a new resource and method linked to your Lambda function.
   - Deploy the API to a new or existing stage.

5. **Testing and Deployment:**

   - Test your Lambda function via the AWS Console to ensure it’s working as expected.
   - Use the invoke URL provided by API Gateway to call your Lambda function from external applications.

6. **API Gateway Customizations (Optional):**

   - Configure API Gateway settings like API key, rate limiting, and others as per your requirements.

7. **Monitoring and Logging:**

   - Utilize AWS CloudWatch for monitoring and logging the performance of your Lambda function and API Gateway.

8. **Versioning and Aliases:**

   - Use versioning and aliases in Lambda for managing different deployment stages (development, staging, production).

### Conclusion

This setup provides a robust, scalable, and cost-effective solution for converting web pages to PDFs in a serverless environment. By leveraging AWS Lambda and API Gateway, you can efficiently handle requests for PDF generation with minimal infrastructure management.

For more information and advanced configurations, refer to the AWS Lambda and API Gateway documentation.
