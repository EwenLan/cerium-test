import assert from "assert"
import { OperateAndCheck } from "../../../../../../src/adapter/action/callable"
import { Filter } from "../../../../../../src/adapter/action/operation/backend_operation"
import { Operation, operationArgument, argValueTypeEnum, argValueTypeString } from "../../../../../../src/adapter/action/operation/operation"
import { Subject } from "../../../../../../src/adapter/subject/define"

describe("run operation then check return code string", () => {
    it("success with one argument", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b"))
        )), [], [0])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b;" "-filter {}" "0" }`)
    })
    it("success with mixed arguments", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d"))
        )), [], [0])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b, c=\\"d\\";" "-filter {}" "0" }`)
    })
    it("success with mixed arguments and filter", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d"))
        )), [new Filter("e", new argValueTypeEnum("f"))], [0])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b, c=\\"d\\";" "-filter {
    e == f
}" "0" }`)
    })
    it("success with mixed arguments and multiple filters", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d"))
        )), [
            new Filter("e", new argValueTypeEnum("f")),
            new Filter("g", new argValueTypeEnum("123"))], [0])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b, c=\\"d\\";" "-filter {
    e == f
    g == 123
}" "0" }`)
    })
    it("success with mixed arguments and mixed filters", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d"))
        )), [
            new Filter("e", new argValueTypeEnum("f")),
            new Filter("g", new argValueTypeEnum("123")),
            new Filter("h", new argValueTypeString("i"))], [0])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b, c=\\"d\\";" "-filter {
    e == f
    g == 123
    h == \\"i\\"
}" "0" }`)
    })
    it("success with multiple return code", () => {
        let runoperation = new OperateAndCheck(Subject.backend, new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d"))
        )), [new Filter("e", new argValueTypeEnum("f"))], [0, 1])
        assert.equal(runoperation.String(), `OperateAndCheck { %backend% "aaa bbb: a=b, c=\\"d\\";" "-filter {
    e == f
}" "0 1" }`)
    })
})

describe("operation args string", () => {
    it("success with enmu argument", () => {
        let arg = new operationArgument("aaa", new argValueTypeEnum("bbb"))
        assert.equal(arg.String(), "aaa=bbb")
    })
    it("success with string argument", () => {
        let arg = new operationArgument("aaa", new argValueTypeString("bbbb"))
        assert.equal(arg.String(), `aaa="bbbb"`)
    })
})

describe("backend operation string", () => {
    it("successful with enmu argument", () => {
        let operation = new Operation("aaa", "bbb", new Array<operationArgument>(new operationArgument("a", new argValueTypeEnum("b"))))
        assert.equal(operation.String(), "aaa bbb: a=b;")
    })
    it("successful with enmu arguments", () => {
        let operation = new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeEnum("123"))
        ))
        assert.equal(operation.String(), "aaa bbb: a=b, c=123;")
    })
    it("successful without arguments", () => {
        let operation = new Operation("aaa", "bbb", new Array<operationArgument>())
        assert.equal(operation.String(), "aaa bbb:;")
    })
    it("mixed value type", () => {
        let operation = new Operation("aaa", "bbb", new Array<operationArgument>(
            new operationArgument("a", new argValueTypeEnum("b")),
            new operationArgument("c", new argValueTypeString("d")),
        ))
        assert.equal(operation.String(), "aaa bbb: a=b, c=\"d\";")
    })
})