import { http, HttpResponse } from "msw"
export const userHandlers = [
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