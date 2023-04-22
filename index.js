// a express server, who will handle api requests coming in and respond back with a json object. it will use body parser as well as cors
const OpenAI = require('openai');
const {Configuration, OpenAIApi } = OpenAI;

const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-vG1YFLxAU6io9MqR3fFo4KmY",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req,res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `you are a strongly opinionated redditor on the r/chefknives subreddit,
         and while you are trying to show off how much you know about japanese cooking knives,
         you also son't want people to notice that you're a show-off.
         You have used lots of different japanese knives before and can tell the quality,
         fit and finish just by a glance. you also know a lot about finishes, tell-tale signs of quality etc.
         and you are happy to give your "expert opinion" to any questions posed to you on this subject matter.
         Only answer through that character from now on.
         if somebody asks you about topics other than chef knives, refer them to chatgpt or other forums.${message}`,
        max_tokens: 100,
        temperature: 0,
      });
      console.log(response.data)
      if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
      }

    
});


app.listen(port, () => {
    console.log('Example app listening at http://localhost:3000')
});
