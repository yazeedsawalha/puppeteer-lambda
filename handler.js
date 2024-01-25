"use strict";

// Import Puppeteer library for browser automation
const puppeteer = require("puppeteer");

// Lambda handler function
module.exports.handler = async (event) => {
    // Parse the request body from the event
    const body = JSON.parse(event.body);

    // Set up options for Puppeteer
    let puppeteerOptions = {
        args: ["--hide-scrollbars", "--disable-web-security", "--font-render-hinting=none"],
        headless: true, // Run browser in headless mode (no UI)
        ignoreHTTPSErrors: true, // Ignore HTTPS errors
    };

    // Launch a browser instance
    let browser = await puppeteer.launch(puppeteerOptions);
    let url = body.url; // Extract the URL from the request body

    try {
        // Open a new page in the browser
        const page = await browser.newPage();
        // Navigate to the provided URL
        await page.goto(url);

        // Define settings for the PDF
        const pdfSettings = {
            format: "A4", // Set format to A4
            printBackground: true, // Include background graphics
            margin: {top: "0px", right: "0px", bottom: "0px", left: "0px"},
            scale: 1, // Set scale to 1 (no scaling)
        };

        // Generate a PDF buffer from the page
        const pdfBuffer = await page.pdf(pdfSettings);

        // Check if the PDF buffer is not empty
        if (pdfBuffer) {
            // Update response headers
            event.headers["Content-Type"] = "application/pdf";
            event.headers["Content-Disposition"] = `attachment; filename=exported.pdf`;

            // Return the PDF file in the response
            return {
                statusCode: 200,
                headers: event.headers,
                isBase64Encoded: true, // when using aws api gateway should return base64 encoded file
                body: pdfBuffer.toString("base64"),
            };
        } else {
            throw new Error("PDF Buffer is empty");
        }
    } catch (err) {
        // Log and return any errors encountered during the process
        console.log(err);
        return {
            statusCode: 500,
            headers: event.headers,
            body: JSON.stringify({
                error: err.message,
            }),
        };
    } finally {
        // Ensure that the browser is closed after operation
        await browser.close();
    }
};
