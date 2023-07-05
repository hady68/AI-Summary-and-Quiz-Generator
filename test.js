
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs/promises');
const configuration = new Configuration({
  apiKey: ``,
});
const openai = new OpenAIApi(configuration);

(async () => {
    const transcript = await fs.readFile("transcript.txt", 'utf8');
    
     const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo-16k",
  messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", 
  content: ` Act as a teacher who will be generating 2 summaries based on the video transcript provided, Make 2 summaries which will
  we a simple summary in which the summary of video is generated in various bullet points, using '->' before each point. when the simple 
  summary ends add ======= simple end ======. For the second summary it will be an expert summary where the summary is bigger than before 
  including important examples and implementation of the topic talked about in the video. Also keep the summary such that the whole context of 
  the video is covered and nothing is lost. give the 2 sumarries seperately first the ====simple one ==== then the ==== expert one====.
  ${transcript}`
}],
});

console.log(completion.data.choices[0].message?.content);
})();


