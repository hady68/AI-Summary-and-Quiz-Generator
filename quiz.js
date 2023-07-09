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
  res.sendFile(path.join(__dirname, "quiz.html"));
});

// POST endpoint handler
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

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
