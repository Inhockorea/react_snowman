import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, queryAllByAltText} from "@testing-library/react";
import Snowman from "./Snowman";


// beforeEach(function() {
//   const { getByText, queryByAltText, toHaveAttribute} = render(<Snowman />);
//   let clickLetter = letter => fireEvent.click(getByText(letter))
// });

it("renders without crashing", function() {
  render(<Snowman />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("image changes to img1 after the 1st incorrect Guess; the letter guess gets disabled", function() {
  const { getByText, queryByAltText} = render(<Snowman />);

  const incorrectLetter = getByText('b');
  fireEvent.click(incorrectLetter);

  expect(queryByAltText("img1")).toHaveAttribute("src","1.png")
  expect(queryByAltText("img0")).toBeNull();
  expect(incorrectLetter).toContainHTML("disabled")
});

it("image stays the same after a correct guess and the revealed letter shows; the letter guess gets disabled", function() {
  const { getByText, queryByAltText, toHaveAttribute} = render(<Snowman />);

  const correctLetter = getByText("a");
  fireEvent.click(correctLetter);


  expect(queryByAltText("img0")).toHaveAttribute("src","0.png")
  expect(queryByAltText("img1")).toBeNull();
  expect(correctLetter).toContainHTML("disabled")
});

it("shows the message 'you lose' when you guess more than max guesses", function(){
  const { getByText, queryByAltText, toHaveAttribute} = render(<Snowman />);

  fireEvent.click(getByText("b"))
  fireEvent.click(getByText("t"))
  fireEvent.click(getByText("x"))
  fireEvent.click(getByText("u"))
  fireEvent.click(getByText("v"))
  fireEvent.click(getByText("z"))
  fireEvent.click(getByText("q"))

  expect(queryAllByAltText("Snowman")).toHaveAttribute("You lose")
})



// it("counts correctly when tails appears", function() {
//   const { getByText, queryByAltText } = render(<Snowman />);

//   const incorrectbutton = getByDisplayValue("b");
//   fireEvent.click(incorrectbutton);

//   expect(
//     getByText("Out of 2 flips, there have been 1 heads and 1 tails.")
//   ).toBeInTheDocument();
// });

// afterEach(function() {
//   Math.random.mockRestore();
// });
