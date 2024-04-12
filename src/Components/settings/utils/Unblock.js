import { deleteRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";

export async function unblockUser(username) {
    console.log(`Unblocking user ${username}`)
    const res = await deleteRequest(`${baseUrl}/user/block/${username}`);
    return res;
}

export async function unblockCommunity(communityName) {
    console.log(`Unblocking community ${communityName}`)
    const res = await deleteRequest(`${baseUrl}/subreddit/${communityName}/mute`);
    return res;
}