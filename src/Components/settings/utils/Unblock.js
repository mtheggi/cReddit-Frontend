import { deleteRequest } from "../../../services/Requests";

export async function unblockUser(username) {
    console.log(`Unblocking user ${username}`)
    const res = await deleteRequest(`/user/block/${username}`);
    return res;
}

export async function unblockCommunity(communityName) {
    console.log(`Unblocking community ${communityName}`)
    const res = await deleteRequest(`/user/block-community/${communityName}`);
    return res;
}