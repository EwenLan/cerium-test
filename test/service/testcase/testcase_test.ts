import assert from "assert"
import { OperateAndCheck } from "../../../src/adapter/action/callable"
import { Filter } from "../../../src/adapter/action/operation/backend_operation"
import { argValueTypeEnum, argValueTypeString, Operation, operationArgument } from "../../../src/adapter/action/operation/operation"
import { Subject } from "../../../src/adapter/subject/define"
import { OperationPredication } from "../../../src/service/common/define"
import { PreconditionSection, Section, TestCase } from "../../../src/service/testcase/testcase"

describe("section string", () => {
    it("success with one backend operation", () => {
        let s = new Section()
        s.AddConfiguredAction(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Add, "aaa", []),
            [],
            [0]
        ))
        assert.equal(s.String(), `{
    OperateAndCheck { %backend% "ADD aaa:;" "-filter {}" "0" }
}`)
    })
    it("success with two backend operations", () => {
        let s = new Section()
        s.AddConfiguredAction(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Add, "aaa", []),
            [],
            [0]
        ))
        s.AddConfiguredAction(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Remove, "bbb", [
                new operationArgument("eee", new argValueTypeString("fff"))
            ]),
            [new Filter("ccc", new argValueTypeEnum("123"))],
            [0, 123]
        ))
        assert.equal(s.String(), `{
    OperateAndCheck { %backend% "ADD aaa:;" "-filter {}" "0" }
    OperateAndCheck { %backend% "RMV bbb: eee=\\"fff\\";" "-filter {
        ccc == 123
    }" "0 123" }
}`)
    })
})

describe("precondition string", () => {
    it("precondition string with two operations", () => {
        let s = new PreconditionSection()
        s.AddConfiguredAction(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Add, "aaa", []),
            [],
            [0]
        ))
        s.AddConfiguredAction(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Remove, "bbb", [
                new operationArgument("eee", new argValueTypeString("fff"))
            ]),
            [new Filter("ccc", new argValueTypeEnum("123"))],
            [0, 123]
        ))
        assert.equal(s.String(), `Precondition {
    OperateAndCheck { %backend% "ADD aaa:;" "-filter {}" "0" }
    OperateAndCheck { %backend% "RMV bbb: eee=\\"fff\\";" "-filter {
        ccc == 123
    }" "0 123" }
}`)
    })
})

describe("testcase string", () => {
    it("full content", () => {
        let testcase = new TestCase("case id", "case name")
        testcase.AddPrecondition(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Add, "aaa", []),
            [],
            [0]
        ))
        testcase.AddPrecondition(new OperateAndCheck(
            Subject.backend,
            new Operation(OperationPredication.Remove, "bbb", [
                new operationArgument("eee", new argValueTypeString("fff"))
            ]),
            [new Filter("ccc", new argValueTypeEnum("123"))],
            [0, 123]
        ))
        console.error(testcase.String())
        assert.equal(testcase.String(), `import package

testcase {
    Information {
        case id "case id"
        case name "case name"
    }
    
    Precondition {
        OperateAndCheck { %backend% "ADD aaa:;" "-filter {}" "0" }
        OperateAndCheck { %backend% "RMV bbb: eee=\\"fff\\";" "-filter {
            ccc == 123
        }" "0 123" }
    }
    
    Procedure {
        
    }
    
    Postcondition {
        
    }
}`)
    })
})