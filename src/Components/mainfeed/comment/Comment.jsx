import AddComment from "./AddComment";
import { useState } from "react";

const Comment = ({ postId }) => {
    const [isCommenting, setIsCommenting] = useState(false);
    const onAddComment = () => {
        setIsCommenting(false);
    }
    return (

        <>
            <AddComment postId={postId} onAddComment={onAddComment} isCommenting={isCommenting} setIsCommenting={setIsCommenting} />

        </>

    );
}

export default Comment;