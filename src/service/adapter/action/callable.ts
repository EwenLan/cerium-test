import { Subject } from "../subject/define"
import { Operation } from "./operation/operation"
import { Filter } from "./operation/backend_operation"
import { ActionPrefix } from "../../common/action"


export class OperateAndCheck {
    _subject: string
    _backendOperation: Operation
    _filter: Filter[] = []
    _returnCodes: number[]
    constructor(subject: Subject, backendOperation: Operation, filter: Filter[], returnCodes: number[]) {
        this._subject = subject
        this._backendOperation = backendOperation
        this._filter = filter
        this._returnCodes = returnCodes.slice()
    }

    String(): string {
        let operationStr = this._backendOperation.String().replace(/"/g, `\\"`)
        let returnCodes = ""
        if (this._returnCodes.length > 0) {
            returnCodes += `${this._returnCodes[0]}`
            for (let i = 1; i < this._returnCodes.length; ++i) {
                returnCodes += ` ${this._returnCodes[i]}`
            }
        }
        let filterStr = ""
        if (this._filter.length > 0) {
            filterStr += `\n${this._filter[0].String()}`
            for (let i = 1; i < this._filter.length; ++i) {
                filterStr += `\n${this._filter[i].String()}`
            }
            filterStr += `\n`
        }
        return `${ActionPrefix.OperateAndCheck} { %${this._subject}% "${operationStr}" "-filter {${filterStr.replace(/"/g, `\\"`)}}" "${returnCodes}" }`
    }
}