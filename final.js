const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const {  Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);


// Middleware to parse JSON body
app.use(bodyParser.json());

// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "quiz.html"));
});

app.get("/explain", (req, res) => {
  res.sendFile(path.join(__dirname, "Explainer.html"));
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
app.post("/quiz-text", async(req, res) => {
  const text = req.body.text;

//   // Perform your desired operation on the received text
const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-16k",
    messages: [{role: "user", 
    content: ` for the given content do the following : 
    Act as a quiz master who will be generating a 5 question mcq quiz based on the content provided, 
    Make the quiz such that each qustion is more difficult than the last.
    Add radio for each question an insure to add a "?" after each question.
    Start the output directly with the question nothing before that.
    ${text}`
  }],
});

const quiz = completion.data.choices[0].message?.content;
  
    // Send the processed text back to the client
    res.json({ 
      quiz:  quiz,
    });
  
  
});

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
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
