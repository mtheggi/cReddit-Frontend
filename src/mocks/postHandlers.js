import { http, HttpResponse } from "msw"
export const postHandlers = [


    http.post('/post', async (resolver) => {
        return HttpResponse.json({
            message: "User logged in successfully",
            postId: "3432ff4t23524"
        });
    }),



]