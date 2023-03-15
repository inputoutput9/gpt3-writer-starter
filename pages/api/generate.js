import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix =
`
Write me an elevator pitch to an investor for a startup in the style of Paul Graham that is based on the input given on the problem it solves, the solution, target customer.
Make sure the pitch includes the problem the startup is solving, the solution, who the solution is for (i.e., the target customer), and why launch now (i.e., the urgency of the startup idea).

Make the elevator pitch with the following criteria:
Irrefutable: the elevator pitch is a statement about your company. You want to state who you are and what you do, to the point that no one can deny your claims.
Succinct: The pitch needs to be quick and easy, something you could say in 100 words or less.
Understandable: Everyone should be able to hear your pitch and get a proper snapshot of your company. Do not use complicated jargon.
Attractive: You want to show the reward is worth the investment risk.

Use the following structure:
“You know how (insert target customer) deals with (insert problem)? I (insert solution).
This helps our customers to (insert customer’s benefit) so they can (insert customer’s goal).”

Here are examples of the best elevator pitches I want you to model off of:

Example Elevator Pitch: “Has this ever happened to you? You’re rushing to get the kids out the door in the morning so you can get them to school on time and not be late for an important meeting (The audience)
And then you realize that you can’t find your car keys. This happens all the time to me. In fact, did you know that the average suburban professional misplaces their keys more than five times per month? (The problem)
That’s more than 600 million times per year! Using bluetooth technology, I’ve created a low cost key fob (The “I solution”) that helps people find their keys and other lost items in record time (The benefit), making it easier to get out the door on busy mornings (The goal).
We’ve got a working prototype and now we’re looking to raise funds to go into large-scale production. We’ve got some new team members on board with extensive manufacturing experience and supply chain expertise, so we’re hoping to get to market in the next six months.”

Example Airbnb Elevator Pitch: “Most tourists booking online care about price- and hotels are one of the highest costs for when traveling. On the other hand, platforms like Couchsurfing have proven that over half a million people are willing to lend their couches or spare bedrooms. We have created a platform that connects travelers with locals, letting them rent our rooms, or even entire places. Travelers save money, and locals can monetize their empty rooms- we just take a 10% commission. I’ve really appreciated your time today. Would you be interested in continuing this conversation sometime over [phone/text/email]?
Example Slack Elevator Pitch: “There is no publicly available pitch deck for Slack, but let's assume the company is just starting up: The average office worker receives 304 emails per week. They also attend an average of 62 monthly meetings, half of which they consider 'wasted time'. Slack was made to make work more efficient. It organizes conversations by channels and drastically reduces the need for emails or meetings. It's integrated with 100s of productivity tools like Google Docs, Calendars, Email, Dropbox, Zoom... so you can receive automatic notifications and take action without leaving the interface. I’ve really appreciated your time today. Would you be interested in continuing this conversation sometime over [phone/text/email]?
Example WeWork Elevator Pitch: “There are 40MM independent workers in the US: consultants, freelancers, and small business owners. Solving office space is tough and expensive, especially in cities like New York. We created the concept of space as a service. We have 20 locations in the city- where people can rent a desk or an office without any of the complications of a traditional lease, effectively saving at least 25% of the cost. They get access to a shared front desk, mailroom, and a community of like-minded people. I’ve really appreciated your time today. Would you be interested in continuing this conversation sometime over [phone/text/email]?”

Here are the startup’s problem it solves, the solution, its target customer:
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;