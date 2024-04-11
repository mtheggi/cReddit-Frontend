import { deleteRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";

const url = `${baseUrl}/user/history`

export async function clearHistory() {
    console.log("Clearing History...")
    try {
        const res = await deleteRequest(url)

        return (res.status == 200)
    }
    catch (err) {
        console.log(err)
        return false
    }

}