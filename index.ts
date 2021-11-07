import { OperateAndCheck } from "./src/service/adapter/action/callable";
import { argValueTypeEnum, argValueTypeString, Operation, operationArgument } from "./src/service/adapter/action/operation/operation";
import { Subject } from "./src/service/adapter/subject/define";
import { TestCase } from "./src/service/testcase/testcase";
import { OperationPredication } from "./src/service/common/define";
import { Filter } from "./src/service/adapter/action/operation/backend_operation";

const testCase = new TestCase("set-parameter-01", "set parameter")
testCase.AddPrecondition(new OperateAndCheck(
    Subject.backend,
    new Operation(OperationPredication.Set, "parameters", [
        new operationArgument("backup", new argValueTypeEnum("enable")),
        new operationArgument("other", new argValueTypeString("string value"))
    ]),
    [],
    [0]
))
testCase.AddProcedure(new OperateAndCheck(
    Subject.backend,
    new Operation(OperationPredication.List, "parameters", []),
    [new Filter("backup", new argValueTypeEnum("enable"))],
    [0]
))
testCase.AddPostcondition(new OperateAndCheck(
    Subject.backend,
    new Operation(OperationPredication.Set, "parameters", []),
    [],
    [0]
))
testCase.WriteToFile()