import { Formatter } from "./format"

describe("readableSize", () => {
    const formatter = Formatter()

    it("should return empty string for negative numbers", () => {
        const result = formatter.readablizeBytes(-100)
        expect(result).toEqual("")
    })

    it("should return '0 bytes' for zero size", () => {
        const result = formatter.readablizeBytes(0)
        expect(result).toEqual("0 bytes")
    })

    it("should format 50 to bytes", () => {
        const result = formatter.readablizeBytes(50)
        expect(result).toEqual("50 bytes")
    })

    it("should format kilo to kb ", () => {
        const result = formatter.readablizeBytes(6000)
        expect(result).toEqual("5.86 kB")
    })

    it("should format mb values to MB", () => {
        const result = formatter.readablizeBytes(6000000)
        expect(result).toEqual("5.72 MB")
    })

    it("should format gb values GB", () => {
        const result = formatter.readablizeBytes(6000000000)
        expect(result).toEqual("5.59 GB")
    })

    it("should format tb values TB", () => {
        const result = formatter.readablizeBytes(6000000000000)
        expect(result).toEqual("5.46 TB")
    })

    it("should format pb values PB", () => {
        const result = formatter.readablizeBytes(6000000000000000)
        expect(result).toEqual("5.33 PB")
    })
})

describe("rawUnit", () => {
    const formatter = Formatter()

    it("should return 0 if value is negative", () => {
        const result = formatter.rawUnit("-10 Ki")
        expect(result).toEqual(0)
    })

    it("should return 0 for a '0 Ki' value", () => {
        const result = formatter.rawUnit("0 Ki")
        expect(result).toEqual(0)
    })

    it("should convert '6 Ki' correctly", () => {
        const result = formatter.rawUnit("6 Ki")
        expect(result).toEqual(6144)
    })

    it("should convert '6 Mi' correctly", () => {
        const result = formatter.rawUnit("6 Mi")
        expect(result).toEqual(6291456)
    })

    it("should convert '6 Gi' correctly", () => {
        const result = formatter.rawUnit("6 Gi")
        expect(result).toEqual(6442450944)
    })
    it("should return 0 if not a parseable value", () => {
        const result = formatter.rawUnit("bla ba blaaa")
        expect(result).toEqual(0)
    })
})

export { }