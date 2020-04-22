import React, { useState } from "react";
import "./Snowman.css";
import { randomWord, ENGLISH_WORDS } from "./words.js";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

function Snowman({ maxWrong, images, words }) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const [nWrong, updateNWrong] = useState(0);
  const [guessed, updateGuessed] = useState(new Set());
  const [answer, updateAnswer] = useState(randomWord(words));


  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  function guessedWord() {
    return answer
      .split("")
      .map(ltr => (guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
  */
  function handleGuess(evt) {
    let ltr = evt.target.value;
    updateGuessed(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    updateNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  // ********************************************************************************
  /** Determines if game can continue with buttons rendered or displays lose message */
  // TODO need a better variable name, one could read now as "final message of the game"
  const finalHTML = nWrong < maxWrong ? generateButtons() : `You lose! The word was ${answer}`;

  /** resets game by reseting states, and picking new word */
  function resetGame() {
    updateAnswer(randomWord(words));
    updateGuessed(new Set());
    updateNWrong(0);
  }
  // ********************************************************************************

  /** render: render game */
  // maybe add reset button to lose message, be a strict game keeper
  // comment on <img>, it's dense
  return (
    <div className="Snowman" alt="Snowman">
      <img src={images[nWrong]} alt={`img${images[nWrong][0]}`} />
      <p> Number wrong: {nWrong}</p>
      <p className="Snowman-word">{guessedWord()}</p>
      <p>{finalHTML}</p>
      <button onClick={resetGame} >Reset</button>  
    </div>
  );
}

Snowman.defaultProps = {
  maxWrong: 6,
  images: [img0, img1, img2, img3, img4, img5, img6],
  words: ENGLISH_WORDS
};

export default Snowman;