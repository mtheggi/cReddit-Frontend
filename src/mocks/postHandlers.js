import { http, HttpResponse } from "msw"
export const postHandlers = [


    http.post('/post', async (resolver) => {
        return HttpResponse.json({
            message: "User logged in successfully",
            _id: "3432ff4t23524"
        });
    }),

        // get posts --> ADD TO API
        http.get(`/post/home-feed`, (resolver) => {
            return HttpResponse.json([
                {
                    _id: "350651awd651awd",
                    type: "(Images & Video) or (Normal) or (Poll) or (Links)",
                    username: "r/DunderMifflin",
                    communityName: "Watermelon",
                    title: "Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?",
                    content: "Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation, Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation",
                    profilePicture: "drive.creddit.com/subreddit_or_user_pfp",
                    netVote: 1500,
                    commentCount: 50,
                    isNSFW: false,
                    isSpoiler: false,
                    isApproved: false,
                    isUpvoted: false,
                    isDownvoted: false,
                    isHidden: false,
                    isSaved: false,
                    createdAt: "2024-03-25T15:37:33.339+00:00",
                    pollOptions: [
                        {
                            option: "Option 1",
                            isVoted: false,
                            votes: 10
                        }
                    ],
                    expirationDate: "2024-03-25T15:37:33.339+00:00"
                },
                {
                    _id: "350651awd651awd",
                    type: "(Images & Video) or (Normal) or (Poll) or (Links)",
                    username: "r/DunderMifflin",
                    communityName: "Watermelon",
                    title: "Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?",
                    content: "Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation, Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation",
                    profilePicture: "drive.creddit.com/subreddit_or_user_pfp",
                    netVote: 1500,
                    commentCount: 50,
                    isNSFW: false,
                    isSpoiler: false,
                    isApproved: false,
                    isUpvoted: false,
                    isDownvoted: false,
                    isHidden: false,
                    isSaved: false,
                    createdAt: "2024-03-25T15:37:33.339+00:00",
                    pollOptions: [
                        {
                            option: "Option 1",
                            isVoted: false,
                            votes: 10
                        }
                    ],
                    expirationDate: "2024-03-25T15:37:33.339+00:00"
                },
                {
                    _id: "350651awd651awd",
                    type: "(Images & Video) or (Normal) or (Poll) or (Links)",
                    username: "r/DunderMifflin",
                    communityName: "Watermelon",
                    title: "Ignoring the fact that Karen = Ann, who from Parks and Rec would have made a fine addition to The Office (or vice versa)?",
                    content: "Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation, Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation Who do you side with? I feel bad for Pam but I do think she was in the wrong in this situation",
                    profilePicture: "drive.creddit.com/subreddit_or_user_pfp",
                    netVote: 1500,
                    commentCount: 50,
                    isNSFW: false,
                    isSpoiler: false,
                    isApproved: false,
                    isUpvoted: false,
                    isDownvoted: false,
                    isHidden: false,
                    isSaved: false,
                    createdAt: "2024-03-25T15:37:33.339+00:00",
                    pollOptions: [
                        {
                            option: "Option 1",
                            isVoted: false,
                            votes: 10
                        }
                    ],
                    expirationDate: "2024-03-25T15:37:33.339+00:00"
                },
            ])
        }
        ),
    
    ]



