import { getAppConfiguration } from "./AppConfiguration";
import { AppConfigurationResponse } from "./AppConfigurationResponse";

const expected: AppConfigurationResponse = {
    tag: "1.0.0"
}

const expectedNoTag: AppConfigurationResponse = {
    tag: ""
}

beforeAll(() => {
    process.env.TAG = expected.tag
})

describe("AppConfiguration", () => {
    it("should return the TAG value", async () => {
        const result = await getAppConfiguration()
        expect(result).toEqual(expected)
    })

    it("should return empty string if environment variable is not set", async () => {
        delete process.env.TAG
        const result = await getAppConfiguration()
        expect(result).toEqual(expectedNoTag)
    })
})

export { }