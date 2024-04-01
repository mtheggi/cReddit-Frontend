import { http, HttpResponse } from "msw"
export const postHandlers = [
    http.post('/post', async (resolver) => {
        const body = await resolver.request.json();
        return HttpResponse.json({
            message: "User logged in successfully"
        });
    }),

]