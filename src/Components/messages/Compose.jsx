import MessagesCompose from "./MessagesCompose";

/**
 * Represents a component for composing messages.
 * @returns {JSX.Element} The JSX element representing the compose component.
 */
const Compose = () => {
  return (
    <div id="compose" data-testId="compose">
      <MessagesCompose />
    </div>
  );
};

export default Compose;
