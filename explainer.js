const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {  Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: `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`,
  });
  const openai = new OpenAIApi(configuration);


// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Explainer.html"));
});

// POST endpoint handler
app.post("/explain-text", async(req, res) => {
  const text = req.body.text;

//   // Perform your desired operation on the received text
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", 
    content: `for the given content give an explaination of what it is and real life examples 
    to solidify the understanding. Explain in simple words in max 100 words.
    ${text}`
  }],
});

const explaination = completion.data.choices[0].message?.content;


  
    // Send the processed text back to the client
    res.json({ 
      explaination: explaination
    });
  
  
});

// Start the server
app.listen(5500, () => {
  console.log("Explainer AI started on port 5500");
});
