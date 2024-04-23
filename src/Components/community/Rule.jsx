import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

/**
 * Rule component displays the rules of a community.
 * @component
 * @param {Object} props - The props object.
 * @param {string} props.id - The unique identifier for the rule.
 * @param {number} props.i - The index of the rule.
 * @param {string} props.text - The text of the rule.
 * @param {string} props.description - The description of the rule.
 * @returns {JSX.Element} - The rendered Rule component.
 */
function Rule({ id, i, text, description }) {
  return (
    <Accordion id={id} className="w-full pr-2 pl-5 mb-1 hover:bg-reddit_dark">
      <CustomToggle eventKey={i.toString()} text={text} number={i} />

      <Accordion.Collapse eventKey={i.toString()}>
        <CustomCollapse description={description} />
      </Accordion.Collapse>
    </Accordion>
  );
}

export default Rule;

function CustomToggle({ eventKey, text, number }) {
  const [isDropped, setIsDropped] = useState(false);
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    setIsDropped(!isDropped)
  );

  return (
    <div
      type="button"
      className="flex flex-row items-center w-full hover:bg-reddit_hover pl-5 pr-2 pt-2 pb-2"
      onClick={decoratedOnClick}
    >
      <div className="flex flex-row items-center justify-start w-full">
        <p className="text-gray-500 text-sm mr-2">{number}</p>

        <p className="text-gray-500 text-sm ml-3">{text}</p>
        <ChevronDownIcon
          data-testid="chvronUP"
          className={`h-5 w-5 ml-auto text-gray-300 transition-transform duration-[300ms] ${
            isDropped ? "rotate" : ""
          }`}
        />
      </div>
    </div>
  );
}

function CustomCollapse({ description }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <p className="text-gray-500 text-sm ml-5 pl-4 pr-2">{description}</p>
    </div>
  );
}
