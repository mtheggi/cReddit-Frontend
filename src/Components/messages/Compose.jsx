import MessagesHeader from "./MessagesHeader";
import MessagesCompose from "./MessagesCompose";
import MessagesFooter from "./MessagesFooter";

const Compose = () => {
  return (
    <>
      <div
        id="compose"
        className="bg-[#030303] text-[#D7DADC] min-h-[100%] m-0 p-0"
      >
        <MessagesHeader />
        <MessagesCompose />
        <MessagesFooter />
      </div>
    </>
  );
};

export default Compose;
