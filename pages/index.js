{/* James Park added code here */}
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/goka-logo.png';

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
            <h1>Make a fu*kin awesome elevator pitch, instantly.</h1>
          </div>
          <div className="header-subtitle">
            <h2><br />
                Step 1: Input your startup idea.<br />
                Step 2: Instantly get an elevator pitch.<br />
                Step 3: Go get funded and build.
                {/*<span style={{ fontSize: "10px", textAlign: "right", display: "block" }}>
                  brought to you by:{" "}
                  <a href="https://goka.xyz/" style={{ color: "white" }}>
                    James Park
                  </a>
                </span>*/}
            </h2>
          </div>
        </div>
        {/* James Park added code here */}
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder={`For best results, state the problem you solve, solution, and customer.\n
Protip  \➪  Define the problem, solution, and customer with a colon
Example input  \➪  " The Problem: It's hard as fu*k to code! "
                                          " My Solution: We make it easy as sh*t to code. "
                                          " My Customer: Someone that loathes coding but needs to. "`}
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
                <h3>Your elevator pitch</h3>
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
          href="https://goka.xyz"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>buidl with goka.xyz</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;