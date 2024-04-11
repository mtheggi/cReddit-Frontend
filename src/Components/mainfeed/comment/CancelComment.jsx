import Modal from "react-bootstrap/Modal";

function CancelComment(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="flex flex-wrap justify-start items-center text-white bg-reddit_greenyDark rounded-b-sm font-plex ">
        <div className="ml-2 mr-2 flex flex-col justify-start w-full bg-reddit_greenyDark text-white text-md  rounded-t-sm font-plex pb-3 pt-3">
          <p className="text-white font-bold text-lg">Cancel Comment</p>
          <p className="text-white text-sm mt-6 ml-1">
            You have a comment in progress, are you sure you want to discard it?
          </p>
          <div className="flex flex-row justify-center mt-6">
            <button
              className="bg-gray-800 h-9 items-center rounded-3xl font-plex hover:bg-gray-700"
              onClick={props.onHide}
            >
              <p className="text-white text-md pl-3 pr-3 mr-6 ml-6">Cancel</p>
            </button>
            <button className="h-9 items-center rounded-3xl font-plex ml-2 bg-red-700">
              <p
                className="text-white text-md pl-3 pr-3 mr-6 ml-6"
                onClick={props.onHide}
              >
                Discard
              </p>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CancelComment;
