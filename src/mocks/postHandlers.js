import { http, HttpResponse } from "msw"
export const postHandlers = [
    http.post('/post', async (resolver) => {
        try {
            const body = await resolver.request.json();
            if (body.username !== "Malek" || body.password !== "123456789") {
                throw new Error("Post type, community name, and title are required");
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

]