import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
  // set initial state
  let [quote, setQuote] = useState(
    "I am one of those who would rather sink with faith than swim without it."
  );
  const [author, setAuthor] = useState("Stanley Baldwin");

  // fetch data from API
  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/quotes?category=",
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setQuote(response.data[0].quote);
        setAuthor(response.data[0].author);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // handle onClick event
  const handleClick = () => {
    fetchData();
  };

  let url_twitter = "https://twitter.com/intent/tweet";

  return (
    <div className="mainContainer">
      <div id="quote-box">
        <div>
          <p id="text">{quote}</p>
        </div>
        <div className="bottom-container">
          <p id="author">-{author}</p>
          <br />
          <button id="new-quote" onClick={handleClick}>
            New Quote
          </button>
          <br />
          <a
            href={url_twitter}
            rel="noreferrer"
            id="tweet-quote"
            target="_blank"
          >
            <i className="fa fa-twitter fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
