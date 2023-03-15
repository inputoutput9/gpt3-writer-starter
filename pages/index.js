{/* James Park added code here */}
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
const [userInput, setUserInput] = useState('');
const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);

  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
const onUserChangedText = (event) => {
  console.log(event.target.value);
  setUserInput(event.target.value);
};
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Hi, I am Goka AI.</h1>
          </div>
          <div className="header-subtitle">
            <h2><br />
                Step 1: Tell me about your startup idea.<br />
                Step 2: I will write you an elevator pitch.<br />
                Step 3: Go raise investor $$$.<br />
                <span style={{ fontSize: "12px" }}>
                Brought to you by:{" "}
                <a href="https://goka.xyz/" style={{ color: "white" }}>
                  James Park
                </a>
              </span>
            </h2>
          </div>
        </div>
        {/* James Park added code here */}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder={`For best results, tell me the problem you solve, your solution, and customer.\nTip: 2 to 3 sentences is enough. Feel free to add more details. `}
            value={userInput}
            onChange={onUserChangedText}
          />
            {/* James Park added code here */}
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generate</p>
              </div>
            </a>
          </div>
          {/* James Park added code here */}
          {apiOutput &&
          (<div className="output">
            <div className="output-header-container">
              <div className="output-header">
                <h3>Goka's Answer</h3>
              </div>
            </div><div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;