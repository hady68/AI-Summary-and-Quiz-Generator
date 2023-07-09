const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {  Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: `Enter your API`,
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
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", 
    content: ` for the given content do the following : generate 2 summaries simple summary and expert summary based on the instructions for both below:  
    Act as a teacher who will be generating a simple 8 point summary based on the content provided, Make the summary such that a novice learner who is learning the concept for the first time understand.
    Add bullet points for each point. when the simple summary ends add "%$" to denote it's end. 
    For the expert summary act as an industry leader generating a  8 point summary the for an experienced professional in the same domain of the content.
    Make sure to include relevant industry usecases of the concept.Add bullet points for each point.
        
    In both summary make sure that the whole context of the content is intact.
    ${text}`
  }],
});

const summary = completion.data.choices[0].message?.content;
let expertsummary = '';

if (summary.includes('%$') ){
    const splitIndex = summary.indexOf('%$');
    const simpsummary = summary.substring(0, splitIndex);
    const expertsummary = summary.substring(splitIndex + '%$'.length);
  
    // Send the processed text back to the client
    res.json({ 
      summary: simpsummary,
      expertsummary: expertsummary
    });
  }
  
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
