import { IValue, Indent } from "../../../common/define"

export class Filter {
    _key: string = ""
    _value: IValue

    constructor(key: string, value: IValue) {
        this._key = key
        this._value = value
    }

    String(): string {
        return `${Indent}${this._key} == ${this._value.String()}`
    }
}
