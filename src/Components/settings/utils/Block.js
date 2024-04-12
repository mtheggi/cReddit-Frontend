import { postRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";


export async function blockUser(username) {
    if (!username) return false;
    console.log(`Blocking user ${username}`)
    const res = await postRequest(`${baseUrl}/user/block/${username}`);
    return (res.status === 200);
}

export async function blockCommunity(communityName) {
    if (!communityName) return false;
    console.log(`Blocking community ${communityName}`)
    const res = await postRequest(`${baseUrl}/subreddit/${communityName}/mute`);
    return (res.status === 200);
}