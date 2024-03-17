import { http, HttpResponse } from "msw"
export const userHandlers = [
    http.get('/user/settings', async (resolver) => {
        return HttpResponse.json(
            {
                country: "Egypt",
                // gender: "Man",
                displayName: "theUser",
                about: "Hello world",
                email: "jondoe@gmail.com",
                preferences: {
                    socialLinks: [
                        {
                            displayName: "El Buy Me a Coffee bta3y",
                            platform: "Buy Me a Coffee",
                            url: "https://twitter.com/faUwUsa"
                        },
                        {
                            displayName: "El twitter bta3y",
                            platform: "Twitter",
                            url: "https://twitter.com/faUwUsa"
                        },
                        {
                            displayName: "El Reddit bta3y",
                            platform: "Reddit",
                            url: "https://twitter.com/faUwUsa"
                        },
                        {
                            displayName: "El Discord bta3y",
                            platform: "Discord",
                            url: "https://twitter.com/faUwUsa"
                        },
                        {
                            displayName: "El Facebook bta3y",
                            platform: "Facebook",
                            url: "https://twitter.com/faUwUsa"
                        },
                    ],
                    inboxMessagesNotif: true,
                    repliesNotif: true,
                    communityContentSort: "top",
                    apple: "apple id",
                    openNewTab: true,
                    twitter: "twitter handle",
                    followEmail: true,
                    modNotif: true,
                    upvotesNotif: true,
                    cakeDayNotif: true,
                    isActiveCommunityVisible: false,
                    communityThemes: true,
                    chatMessagesNotif: true,
                    globalContentView: "card",
                    chatRequests: true,
                    showAdultContent: true,
                    isContentVisible: true,
                    google: "jondoe@gmail.com",
                    mentionsNotif: true,
                    newFollowerNotif: false,
                    invitationNotif: true,
                    commentsNotif: true,
                    autoPlayMedia: true,
                    allowFollow: true,
                    darkMode: true,
                    chatEmail: true
                },
                connectedToTwitter: false,
                connectedToApple: true,
                connectedToGoogle: false
            }
        )
    }),

    http.delete('/user/u/:username', async (resolver) => {
        const usernamesent = resolver.params.username

        // console.log(usernamesent)
        // const body = await resolver.request.json()
        // console.log("post request body")
        // console.log(body)
        return HttpResponse.json([
            {
                parameterSent: usernamesent,
                username: "u/theUser",
                displayName: "theUser",
                about: "Hello to my page",
                email: "john@email.com",
                profilePicture: "drive.creddit.com/pfp",
                banner: "drive.creddit.com/pfp",
                followers: 100,
                cakeDay: "29/08/2023"
            }
        ])


    })

]