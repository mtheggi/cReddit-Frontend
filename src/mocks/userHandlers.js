import { http, HttpResponse } from "msw"


export const userHandlers = [

    http.post('/user/login', async (resolver) => {
        try {
            const body = await resolver.request.json();
            if (body.username !== "Malek" || body.password !== "123456789") {
                throw new Error('Invalid username or password');
            }
            return HttpResponse.json({
                message: "User logged in successfully"
            });
        } catch (error) {
            return HttpResponse.json({
                message: error.message
            }, { status: 400 });
        }
    }),

    http.post('/user', async (resolver) => {
        try {
            const body = await resolver.request.json();
            if (body.email === "malek13122002@gmail.com") {
                throw new Error('Email already logged');
            }
            return HttpResponse.json({
                message: "User created successfully"
            });
        } catch (error) {
            return HttpResponse.json({
                message: error.message
            }, { status: 400 });
        }
    }),

    http.get('/user/is-available/:username', async (resolver) => {

        try {
            if (resolver.params.username == "Malek") {
                throw new Error('Username already taken');
            }
            return HttpResponse.json([
                {
                    message: "Username is available",
                    available: true
                }
            ])
        }
        catch (error) {
            return HttpResponse.json({
                message: error.message
            }, { status: 400 });
        }
    }),


    http.post('/user/forgot-password', async (resolver) => {
        try {
            const body = await resolver.request.json();
            if (body.email !== "malek13122002@gmail.com") {
                throw new Error('Email Does not Exist');
            }
            return HttpResponse.json({
                message: "Verify email sent succesfully"
            });
        } catch (error) {
            return HttpResponse.json({
                message: error.message
            }, { status: 400 });
        }
    }),


    http.post('/user/forgot-username', async (resolver) => {
        try {
            const body = await resolver.request.json();
            if (body.email !== "malek13122002@gmail.com") {
                throw new Error('Email Does not Exist');
            }
            return HttpResponse.json({
                message: "User logged in successfully"
            });
        } catch (error) {
            return HttpResponse.json({
                message: error.message
            }, { status: 400 });
        }
    }),

    http.delete('/user', async (resolver) => {
        return HttpResponse.json(
            {
                message: "User deleted successfully"
            }
        )
    }),



    http.post('/user/auth/google', async (resolver) => {
        const token = await resolver.request.json();

        return HttpResponse.json(
            {
                message: "User logged in successfully"
            }
        )
    }),
    http.get('/user/logout', async (resolver) => {
        return HttpResponse.json(
            {
                message: "User logged out successfully"
            }
        )
    }),
    http.get('/user/refreshToken', async (resolver) => {
        return HttpResponse.json(
            {
                message: "Token refreshed successfully"
            }
        )
    }),
    http.get('/user/verify/:verificationToken', async (resolver) => {

        // console.log("resolverVerficition", resolver.params.verificationToken)
        return HttpResponse.json(
            {
                message: "User verified successfully"
            }
        )
    }),
    http.get('/user/u/:username', async (resolver) => {

        return HttpResponse.json(
            {
                username: "theUser",
                displayName: "theUser",
                about: "Hello to my page",
                email: "john@email.com",
                profilePicture: "drive.creddit.com/pfp",
                banner: "drive.creddit.com/pfp",
                followers: 100,
                cakeDay: "29/08/2023"
            }
        )
    }),
    http.get('/user/:username/overview', async (resolver) => {
        return HttpResponse.json(
            {
                posts: [
                    "",
                    ""
                ]
            }
        )
    }),
    http.get('/user/:username/upvoted', async (resolver) => {
        return HttpResponse.json(
            {
                comments: 50,
                upvotes: 1500,
                pollVotes: {
                    option3: 40,
                    option1: 10,
                    option2: 20
                },
                isDownvoted: false,
                isNSFW: false,
                isUpvoted: true,
                postId: "350651awd651awd",
                ownerId: "350651awd651awd",
                title: "Hello World",
                downvotes: 100,
                content: "This is my content",
                isFollowed: true,
                isSpoiler: false,
                ownerProfilePicture: "drive.creddit.com/test",
                uploadDate: "06/03/2024 22:10:03",
                children: [
                    "",
                    ""
                ],
                isSaved: true,
                isLocked: true,
                communityProfilePicture: "drive.creddit.com / test",
                communityId: "350651awd651awd"
            }
        )
    }),
    http.get('/user/:username/downvoted', async (resolver) => {
        return HttpResponse.json(
            {
                comments: 50,
                upvotes: 1500,
                pollVotes: {
                    option3: 40,
                    option1: 10,
                    option2: 20
                },
                isDownvoted: false,
                isNSFW: false,
                isUpvoted: true,
                postId: "350651awd651awd",
                ownerId: "350651awd651awd",
                title: "Hello World",
                downvotes: 100,
                content: "This is my content",
                isFollowed: true,
                isSpoiler: false,
                ownerProfilePicture: "drive.creddit.com/test",
                uploadDate: "06/03/2024 22:10:03",
                children: [
                    "",
                    ""
                ],
                isSaved: true,
                isLocked: true,
                communityProfilePicture: "drive.creddit.com / test",
                communityId: "350651awd651awd"
            }
        )
    }),
    http.get('/user/submitted/:username', async (resolver) => {
        return HttpResponse.json(
            {
                comments: 50,
                upvotes: 1500,
                pollVotes: {
                    option3: 40,
                    option1: 10,
                    option2: 20
                },
                isDownvoted: false,
                isNSFW: false,
                isUpvoted: true,
                postId: "350651awd651awd",
                ownerId: "350651awd651awd",
                title: "Hello World",
                downvotes: 100,
                content: "This is my content",
                isFollowed: true,
                isSpoiler: false,
                ownerProfilePicture: "drive.creddit.com/test",
                uploadDate: "06/03/2024 22:10:03",
                children: [
                    "",
                    ""
                ],
                isSaved: true,
                isLocked: true,
                communityProfilePicture: "drive.creddit.com / test",
                communityId: "350651awd651awd"
            }
        )
    }),
    http.get('/user/settings', async (resolver) => {
        return HttpResponse.json({
            account: {
                email: "jondoe@gmail.com",
                gender: "Man",
                google: true,

                //EXTRA (NOT IN API DOCUMENTATION)
                country: "Egypt",
                connectedToTwitter: false,
                connectedToApple: false,
                connectedToGoogle: true
            },
            profile: {
                displayName: "John Doe",
                about: "I am a developer",
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
                    }
                ],
                avatar: "drive.creddit.com/test",
                banner: "drive.creddit.com/test",
                isNSFW: true,
                allowFollow: true,
                isContentVisible: false,
                showAdultContent: true,
                isActiveCommunityVisible: true
            },
            safetyAndPrivacy: {
                blockedUsers: [{
                    username: "user1",
                    blockTimestamp: 1711090917995
                },
                {
                    username: "user2",
                    blockTimestamp: 1711090917995
                },
                {
                    username: "user3",
                    blockTimestamp: 1711090917995
                },
                {
                    username: "user4",
                    blockTimestamp: 1711090917995
                }],
                mutedCommunities: [{
                    communityName: "community1",
                    muteTimestamp: 1711090917995
                },
                {
                    communityName: "community2",
                    muteTimestamp: 1711090917995
                },
                {
                    communityName: "community3",
                    muteTimestamp: 1711090917995
                },
                {
                    communityName: "community4",
                    muteTimestamp: 1711090917995
                }],
            },
            feedSettings: {
                showAdultContent: true,
                autoPlayMedia: false,
                communityThemes: true,
                communityContentSort: "Top",
                globalContentView: "Card",
                openNewTab: true
            },
            notifications: {
                mentionsNotifs: false,
                commentsNotifs: true,
                postsUpvotesNotifs: true,
                repliesNotifs: true,
                newFollowersNotifs: false,
                postNotifs: true,
                cakeDayNotifs: true,
                modNotifs: false,
                moderatorInCommunities: [],
                invitationNotifs: true
            },
            email: {
                followEmail: false,
                chatEmail: true
            }
        });
    }),

    http.put('/user/settings', async (resolver) => {
        return HttpResponse.json(
            {
                account: {
                    email: "jondoe22@gmail.com",
                    gender: "Woman",
                    google: true,

                    //EXTRA (NOT IN API DOCUMENTATION)
                    country: "USA",
                    connectedToTwitter: true,
                    connectedToApple: false,
                    connectedToGoogle: false
                },
                profile: {
                    displayName: "John Doe 2002",
                    about: "I am a developer",
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
                        }
                    ],
                    avatar: "drive.creddit.com/test",
                    banner: "drive.creddit.com/test",
                    isNSFW: true,
                    allowFollow: true,
                    isContentVisible: false,

                    //EXTRA (NOT IN API DOCUMENTATION)
                    showAdultContent: true,
                    isActiveCommunityVisible: true
                },
                safetyAndPrivacy: {
                    //EXTRA (NOT IN API DOCUMENTATION)
                    blockedUsers: [{
                        username: "user1",
                        blockTimestamp: 1711090917995
                    },
                    {
                        username: "user2",
                        blockTimestamp: 1711090917995
                    },
                    {
                        username: "user3",
                        blockTimestamp: 1711090917995
                    },
                    {
                        username: "user4",
                        blockTimestamp: 1711090917995
                    }],
                    //EXTRA (NOT IN API DOCUMENTATION)
                    mutedCommunities: [{
                        communityName: "community1",
                        muteTimestamp: 1711090917995
                    },
                    {
                        communityName: "community2",
                        muteTimestamp: 1711090917995
                    },
                    {
                        communityName: "community3",
                        muteTimestamp: 1711090917995
                    },
                    {
                        communityName: "community4",
                        muteTimestamp: 1711090917995
                    }],
                },
                feedSettings: {
                    showAdultContent: true,
                    autoPlayMedia: false,
                    communityThemes: true,
                    communityContentSort: "Top",
                    globalContentView: "Card",
                    openNewTab: true
                },
                notifications: {
                    mentionsNotifs: false,
                    commentsNotifs: true,
                    postsUpvotesNotifs: true,
                    repliesNotifs: true,
                    newFollowersNotifs: false,
                    postNotifs: true,
                    cakeDayNotifs: true,
                    modNotifs: false,
                    moderatorInCommunities: [],
                    invitationNotifs: true
                },
                email: {
                    followEmail: false,
                    chatEmail: true
                }
            }
        )
    }),

    http.post('/user/block/:username', async (resolver) => {

        return HttpResponse.json(
            {
                message: "User blocked"
            }
        )
    }),

    http.delete('/user/block/:username', async (resolver) => {

        return HttpResponse.json(
            {
                message: "User unblocked"
            }
        )
    }),

    http.post('/user/block-community/:subreddit', async (resolver) => {
        return HttpResponse.json(
            {
                message: "Community blocked"
            }
        )
    }),

    http.delete('/user/block-community/:subreddit', async (resolver) => {
        return HttpResponse.json(
            {
                message: "Community unblocked"
            }
        )
    }),

    http.patch('/user/change-password', async (resolver) => {

        return HttpResponse.json(
            {
                newPassword: "Xyz789"
            }
        )
    }),



    http.patch('/user/reset-password', async (resolver) => {

        return HttpResponse.json([
            {
                oldPassword: "Abc123",
                newPassword: "Xyz789"
            }
        ])
    }),



    http.patch('/user/change-email', async (resolver) => {

        return HttpResponse.json([
            {
                password: "Abc123",
                newEmail: "john@email.com"
            }
        ])
    }),


    http.post('/user/follow/:username', async (resolver) => {

        return HttpResponse.json([
            {
                status: "OK",
                message: "Username blocked"
            }
        ])
    }),



    http.delete('/user/block/:username', async (resolver) => {

        return HttpResponse.json([
            {
                status: "OK",
                message: "Username unblocked"
            }
        ])
    }),


    http.post('/user/follow/:username', async (resolver) => {

        return HttpResponse.json([
            {
                status: "OK",
                message: "Username followed"
            }
        ])
    }),

    http.delete('/user/follow/:username', async (resolver) => {

        return HttpResponse.json([
            {
                status: "OK",
                message: "Username unfollowed"
            }
        ])
    }),






    http.delete('/user/clear-history', async (resolver) => {

        return HttpResponse.json(
            {
                message: "User history cleared successfully"
            }
        )
    }),

    http.post('/user/block-community/:subreddit', async (resolver) => {

        return HttpResponse.json(
            {
                message: "Community blocked successfully"
            }
        )
    }),

    http.delete('/user/block-community/:subreddit', async (resolver) => {

        return HttpResponse.json(
            {
                message: "Community unblocked successfully"
            }
        )
    }),

    http.get('/user/history', async (resolver) => {
        return HttpResponse.json([
            {
                comments: 50,
                upvotes: 1500,
                pollVotes: {
                    option3: 40,
                    option1: 10,
                    option2: 20
                },
                isDownvoted: false,
                isNSFW: false,
                isUpvoted: true,
                postId: "350651awd651awd",
                ownerId: "350651awd651awd",
                title: "Hello World",
                downvotes: 100,
                content: "This is my content",
                isFollowed: true,
                isSpoiler: false,
                ownerProfilePicture: "drive.creddit.com/test",
                uploadDate: "06/03/2024 22:10:03",
                children: [
                    "",
                    ""
                ],
                isSaved: true,
                isLocked: true,
                communityProfilePicture: "drive.creddit.com / test",
                communityId: "350651awd651awd"
            }
        ])
    }),


    http.get('/user/saved-posts', async (resolver) => {
        return HttpResponse.json([
            {
                comments: 50,
                upvotes: 1500,
                pollVotes: {
                    option3: 40,
                    option1: 10,
                    option2: 20
                },
                isDownvoted: false,
                isNSFW: false,
                isUpvoted: true,
                postId: "350651awd651awd",
                ownerId: "350651awd651awd",
                title: "Hello World",
                downvotes: 100,
                content: "This is my content",
                isFollowed: true,
                isSpoiler: false,
                ownerProfilePicture: "drive.creddit.com/test",
                uploadDate: "06/03/2024 22:10:03",
                children: [
                    "",
                    ""
                ],
                isSaved: true,
                isLocked: true,
                communityProfilePicture: "drive.creddit.com / test",
                communityId: "350651awd651awd"
            }
        ])
    }),



]