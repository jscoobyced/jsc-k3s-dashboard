import { AppConfigurationResponse } from "./AppConfigurationResponse";

export const getAppConfiguration = async (): Promise<AppConfigurationResponse> => {
    const tag = process.env.TAG ?? ""
    return Promise.resolve({
        tag
    })
}  