/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useState } from "react";

export function App() {
  
  const [quotes, setQuotes] = useState([]);
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [colors, setColors] = useState("#FFF")

 const fetchData = async() => {
    try{
    const response = await fetch("https://type.fit/api/quotes");
    const data = await response.json();
    
    setQuotes(data);
    const randIndex = Math.floor(Math.random() * data.length) 
    setRandomQuotes(data[randIndex])

    }catch(error){
      console.log(error);
      return 
    }
  }
  useEffect(()=>{
    fetchData();
  },[])

  const getNewQuote = () => {

    const colors = [
      '#16a085',
      '#27ae60',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#BDBB99',
      '#77B1A9',
      '#73AB57'];
      

    let randIndex = Math.floor(Math.random() * quotes.length);
    let randColorIndex = Math.floor(Math.random() * colors.length);
    setRandomQuotes(quotes[randIndex]);
    setColors(colors[randIndex]);
  }

  
  return (
    <div style={{backgroundColor: colors, minHeight:"100vh"}}>
      <br />
     <p className="ml-5">Random Quote Machine</p>
     <hr />
     <div className="container pt-5">

            <div className="jumbotron">
                  <div className="card">
                    <p className="card-header">Inspirational Quotes</p>
                    <div id="quote-box" className="card-body" >
                      {randomQuotes ? (
                        <>
                        <h5 id="author" className="card-title"> {randomQuotes.author || "No Author :/"}</h5>
                        <p id="text" className="card-text text-center bg-success">&quot;{randomQuotes.text}&quot;</p>
                        </>
                      ) : (
                          <h2>Loading...</h2>
                        )
                      }
                      <div className="row">
                        <button 
                        id="new-quote"
                        onClick={getNewQuote} className="btn btn-primary ml-3">Next quote.</button>
                        <a
                        id="tweet-quote" 
                        href={ " https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="+ encodeURIComponent('"'+randomQuotes.text+'"'+randomQuotes.author)}
                        target="_blank"
                        className="btn btn-warning">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a className="btn btn-danger" 
                        href={
                          "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+randomQuotes.author+"&content="+randomQuotes.text+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"}
                          target="_blank">
                          <i className="fa fa-tumblr">.</i>
                        </a>
                      </div>
                    </div>
                    
                  </div>
          </div>
          
      </div>
    </div>
  )
}

export default App

