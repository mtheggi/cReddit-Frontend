import { postRequest } from "../../../services/Requests";


export async function blockUser(username) {
    if (!username) return false;
    console.log(`Blocking user ${username}`)
    const res = await postRequest(`/user/block/${username}`);
    return (res.status === 200);
}

export async function blockCommunity(communityName) {
    if (!communityName) return false;
    console.log(`Blocking community ${communityName}`)
    const res = await postRequest(`/user/block-community/${communityName}`);
    return (res.status === 200);
}