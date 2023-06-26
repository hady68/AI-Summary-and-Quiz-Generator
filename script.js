const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {  Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "Enter your API KEY HERE",
  });
  const openai = new OpenAIApi(configuration);


// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// POST endpoint handler
app.post("/process-text", async(req, res) => {
  const text = req.body.text;

//   // Perform your desired operation on the received text
//   // Example: convert text to uppercase
//   const processedText = text.toUpperCase(); 
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", 
    content: `write me a story based on this word that i provide : ${text}`
  }],
});

const summary = completion.data.choices[0].message?.content;

// Send the processing text back to the client
  res.json({ summary });
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
