import { putRequest } from "../../../services/Requests";
import { baseUrl } from "../../../constants";

const url = `${baseUrl}/user/settings`
let setUserSettings;

export async function changeSetting(pageName, settingName, newSettingValue) {
    const newSetting = {}
    newSetting[pageName] = {}
    newSetting[pageName][settingName] = newSettingValue

    console.log(newSetting)

    try {
        const res = await putRequest(url, newSetting);

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