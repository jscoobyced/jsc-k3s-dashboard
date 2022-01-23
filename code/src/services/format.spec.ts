import { Formatter } from "./format"

describe("readableSize", () => {
    const formatter = Formatter()

    it("can convert negative numbers", () => {
        const result = formatter.readablizeBytes(-100)
        expect(result).toEqual("")
    })

    it("can convert 0", () => {
        const result = formatter.readablizeBytes(0)
        expect(result).toEqual("0 bytes")
    })

    it("can convert to bytes", () => {
        const result = formatter.readablizeBytes(50)
        expect(result).toEqual("50 bytes")
    })

    it("can convert to kb", () => {
        const result = formatter.readablizeBytes(6000)
        expect(result).toEqual("5.86 kB")
    })

    it("can convert to MB", () => {
        const result = formatter.readablizeBytes(6000000)
        expect(result).toEqual("5.72 MB")
    })

    it("can convert to GB", () => {
        const result = formatter.readablizeBytes(6000000000)
        expect(result).toEqual("5.59 GB")
    })

    it("can convert to TB", () => {
        const result = formatter.readablizeBytes(6000000000000)
        expect(result).toEqual("5.46 TB")
    })

    it("can convert to PB", () => {
        const result = formatter.readablizeBytes(6000000000000000)
        expect(result).toEqual("5.33 PB")
    })
})

describe("rawUnit", () => {
    const formatter = Formatter()

    it("can convert 0", () => {
        const result = formatter.rawUnit("0 Ki")
        expect(result).toEqual(0)
    })

    it("can convert from Ki", () => {
        const result = formatter.rawUnit("6 Ki")
        expect(result).toEqual(6144)
    })

    it("can convert to Mi", () => {
        const result = formatter.rawUnit("6 Mi")
        expect(result).toEqual(6291456)
    })

    it("can convert to Gi", () => {
        const result = formatter.rawUnit("6 Gi")
        expect(result).toEqual(6442450944)
    })
})

export { }