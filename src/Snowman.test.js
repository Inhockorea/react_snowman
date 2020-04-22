import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, queryAllByAltText } from "@testing-library/react";
import Snowman from "./Snowman";

const maxWrong = 3;
const words = ['apple'];
const testSnowman = <Snowman maxWrong={maxWrong} words={words} />;

it("renders without crashing", function () {
  render(testSnowman);
});

it("matches snapshot", function () {
  const { asFragment } = render(testSnowman);
  expect(asFragment()).toMatchSnapshot();
});

it("image changes to img1 after the 1st incorrect Guess; the letter guess gets disabled", function () {
  const { getByText, queryByAltText } = render(testSnowman);

  const incorrectLetter = getByText('b');
  fireEvent.click(incorrectLetter);

  expect(queryByAltText("img1")).toHaveAttribute("src", "1.png");
  expect(queryByAltText("img0")).toBeNull();
  expect(incorrectLetter).toContainHTML("disabled");
});

it("image stays the same after a correct guess and the revealed letter shows; the letter guess gets disabled", function () {
  const { getByText, queryByAltText } = render(testSnowman);

  const correctLetter = getByText("a");
  fireEvent.click(correctLetter);


  expect(queryByAltText("img0")).toHaveAttribute("src", "0.png");
  expect(queryByAltText("img1")).toBeNull();
  expect(correctLetter).toContainHTML("disabled");
});

it("shows the message 'you lose' when you guess more than max guesses", function () {
  const { getByText } = render(testSnowman);

  fireEvent.click(getByText("b"));
  fireEvent.click(getByText("t"));
  fireEvent.click(getByText("x"));

  expect(getByText(`You lose! The word was apple`)).toBeInTheDocument();

});

it("ensures reset function returns states to default vaules", function () {
  const { getByText, queryByAltText } = render(testSnowman);

  fireEvent.click(getByText("b"));
  fireEvent.click(getByText("a"));

  fireEvent.click(getByText("Reset"));

  expect(getByText("Number wrong: 0")).toBeInTheDocument();  // Number Wrong counter reset
  expect(getByText("a")).not.toContainHTML("disabled");  // prevous guesses were reset
  expect(getByText("b")).not.toContainHTML("disabled");
  expect(getByText("_____")).toBeInTheDocument();  // blanks for "apple"
});