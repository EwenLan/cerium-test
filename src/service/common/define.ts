export const Indent = "    "

export enum OperationPredication {
    Add = "ADD",
    Remove = "RMV",
    Set = "SET",
    Modify = "MOD",
    List = "LST"
}

export enum SectionPrefix {
    Information = "Information",
    Precondition = "Precondition",
    Procedure = "Procedure",
    Postcondition = "Postcondition",
}

export const TestCasePrefix = `import package

testcase`

export const CaseIDPrefix = "case id"
export const CaseNamePrefix = "case name"

export const TestCaseFilePostfix = `txt`

export const OutputDirectory = "./output"

export interface IValue {
    String(): string
}

export interface StringifyableContent {
    String(): string
}