"use strict";

/**
 * AWS Lambda function for generating PDFs from web pages using Puppeteer.
 * 
 * Author: Yazeed
 * Date: 26/1/2024
 * Description: This Lambda function takes a URL from the request body and uses Puppeteer
 * to navigate to the page and generate a PDF, which is then returned in the response.
 */

// Import the Puppeteer library for browser automation.
const puppeteer = require("puppeteer");

// Main Lambda handler function.
module.exports.handler = async (event) => {
    // Parse the request body to get the URL.
    const body = JSON.parse(event.body);

    // Define Puppeteer launch options.
    const puppeteerOptions = {
        args: ["--hide-scrollbars", "--disable-web-security", "--font-render-hinting=none"],
        headless: true, // Browser runs in headless mode (no GUI).
        ignoreHTTPSErrors: true, // Ignore any HTTPS-related errors.
    };

    // Launch a Puppeteer browser instance.
    let browser = await puppeteer.launch(puppeteerOptions);
    const url = body.url; // Extract the URL from the request body.

    try {
        // Open a new tab in the browser.
        const page = await browser.newPage();
        // Navigate to the specified URL.
        await page.goto(url);

        // Define the settings for PDF generation.
        const pdfSettings = {
            format: "A4", // PDF page format.
            printBackground: true, // Include background graphics in the PDF.
            margin: {top: "0px", right: "0px", bottom: "0px", left: "0px"},
            scale: 1, // No scaling applied to the PDF.
        };

        // Generate a PDF buffer from the current page.
        const pdfBuffer = await page.pdf(pdfSettings);

        // Check for successful PDF generation.
        if (pdfBuffer) {
            // Set response headers for PDF download.
            event.headers["Content-Type"] = "application/pdf";
            event.headers["Content-Disposition"] = `attachment; filename=exported.pdf`;

            // Return the generated PDF in the response.
            return {
                statusCode: 200,
                headers: event.headers,
                isBase64Encoded: true, // AWS API Gateway requires base64 encoding.
                body: pdfBuffer.toString("base64"),
            };
        } else {
            // Handle case where PDF buffer is empty.
            throw new Error("PDF Buffer is empty");
        }
    } catch (err) {
        // Log errors and return an error response.
        console.log(err);
        return {
            statusCode: 500,
            headers: event.headers,
            body: JSON.stringify({ error: err.message }),
        };
    } finally {
        // Close the browser instance to free up resources.
        await browser.close();
    }
};
