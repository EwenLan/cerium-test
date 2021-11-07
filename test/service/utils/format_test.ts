import assert from "assert";
import { SectionIndent } from "../../../src/utils/format";

describe("section indent test", () => {
    it("indent emtpy string", () => {
        const content = ""
        assert.equal(SectionIndent(content), `    `)
    })
})