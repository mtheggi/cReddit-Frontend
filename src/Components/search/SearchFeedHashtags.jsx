import SearchFeedComments from "./SearchFeedComments";
import SearchFeedPosts from "./SearchFeedPosts";

const SearchFeedHashtags = (

    {
        _id,
        postID,
        postPicture,
        postUsername,
        postVotes,
        postCreatedAt,
        isPostSpoiler,
        isPostNsfw,
        postTitle,
        communityName,
        createdAt,
        username,
        netVote,
        commentCount,
        commentPicture,
        content,
        type,
        lastElementRef
    }
) => {
    return (


        <>
            {type === "Comment" ?
                <SearchFeedComments
                    postID={postID}
                    postTitle={postTitle}
                    postUsername={postUsername}
                    postVotes={postVotes}
                    postPicture={postPicture}
                    postCreatedAt={postCreatedAt}
                    isPostNsfw={isPostNsfw}
                    isPostSpoiler={isPostSpoiler}
                    communityName={communityName}
                    createdAt={createdAt}
                    username={username}
                    netVote={netVote}
                    commentCount={commentCount}
                    commentPicture={commentPicture}
                    content={content}
                    lastElementRef={lastElementRef}
                />
                : <SearchFeedPosts
                    communityName={communityName}
                    username={username}
                    profilePicture={commentPicture}
                    content={content}
                    netVote={netVote}
                    createdAt={createdAt}
                    title={postTitle}
                    commentCount={commentCount}
                    _id={_id}
                    lastElementRef={lastElementRef}
                    isNSFW={isPostNsfw}
                    isSpoiler={isPostSpoiler}
                />


            }
        </>
    );
}

export default SearchFeedHashtags;