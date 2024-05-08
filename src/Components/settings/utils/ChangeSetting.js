import { putRequestFD } from "../../../services/Requests";
import { baseUrl } from "../../../constants";

const url = `${baseUrl}/user/settings`
let setUserSettings;

export async function changeSetting(pageName, settingName, newSettingValue) {

    const msg = {}
    msg[settingName] = newSettingValue


    const settingsFormData = new FormData();
    settingsFormData.append(pageName, JSON.stringify(msg));

   
    try {
        const res = await putRequestFD(url, settingsFormData);

        return res
    }
    catch (error) {
        console.log(error)
        return null;
    }
}

export function getF(F) {
    setUserSettings = F
}