import { IValue } from "../../../service/common/define"

class argValue {
    _value: string = ""
    constructor(value: string) {
        this._value = value
    }
}

export class argValueTypeString extends argValue {
    constructor(value: string) {
        super(value)
    }
    String(): string {
        return `"${this._value}"`
    }
}

export class argValueTypeEnum extends argValue {
    constructor(value: string) {
        super(value)
    }
    String(): string {
        return `${this._value}`
    }
}

export class operationArgument {
    _name: string = ""
    _value: IValue

    constructor(name: string, value: IValue) {
        this._name = name
        this._value = value
    }

    String(): string {
        return `${this._name}=${this._value.String()}`
    }
}


export class Operation {
    _predicate: string = "";
    _object: string = "";
    _args: operationArgument[] = [];

    constructor(predicate: string, object: string, args: operationArgument[]) {
        this._predicate = predicate;
        this._object = object;
        this._args = args.slice();
    }

    String(): string {
        let prefix = `${this._predicate} ${this._object}:`;
        let argsList = "";
        if (this._args.length > 0) {
            argsList += ` ${this._args[0].String()}`;
            for (let i = 1; i < this._args.length; ++i) {
                argsList += `, ${this._args[i].String()}`;
            }
        }
        return `${prefix}${argsList};`;
    }
}