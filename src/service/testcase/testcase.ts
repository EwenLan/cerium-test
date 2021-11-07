import { mkdirSync, writeFile } from "fs";
import { mkdir } from "fs/promises";
import { SectionIndent } from "../../utils/format";
import { CaseIDPrefix, CaseNamePrefix, StringifyableContent, Indent, SectionPrefix, TestCasePrefix, TestCaseFilePostfix, OutputDirectory } from "../common/define";

class emptyLine {
    String(): string {
        return ``
    }
}

export class Section {
    _contents: StringifyableContent[] = []
    constructor() { }
    AddConfiguredAction(content: StringifyableContent) {
        this._contents.push(content)
    }
    AddEmptyLine() {
        this._contents.push(new emptyLine())
    }
    String(): string {
        let innerSection = ``
        if (this._contents.length > 0) {
            innerSection += this._contents[0].String()
            for (let i = 1; i < this._contents.length; ++i) {
                innerSection += `\n${this._contents[i].String()}`
            }
        }
        innerSection = SectionIndent(innerSection)
        return `{\n${innerSection}\n}`
    }
}

export class ProcedureSection extends Section {
    String(): string {
        let sectionContent = `${SectionPrefix.Procedure} `
        sectionContent += super.String()
        return sectionContent
    }
}

export class PostconditionSection extends Section {
    String(): string {
        let sectionContent = `${SectionPrefix.Postcondition} `
        sectionContent += super.String()
        return sectionContent
    }
}

export class PreconditionSection extends Section {
    String(): string {
        let sectionContent = `${SectionPrefix.Precondition} `
        sectionContent += super.String()
        return sectionContent
    }
}

export class InformationSection {
    _caseID: string = ""
    _caseName: string = ""

    constructor(caseID: string, caseName: string) {
        this._caseID = caseID
        this._caseName = caseName
    }
    String(): string {
        let content = `${SectionPrefix.Information} {\n`
        content += SectionIndent(`${CaseIDPrefix} "${this._caseID}"\n${CaseNamePrefix} "${this._caseName}"`)
        content += `\n}`
        return content
    }
}

export class TestCase {
    _information: InformationSection
    _precondition: PreconditionSection = new PreconditionSection()
    _procedure: ProcedureSection = new ProcedureSection()
    _postcondition: PostconditionSection = new PostconditionSection()
    constructor(caseID: string, caseName: string) {
        this._information = new InformationSection(caseID, caseName)
    }
    AddPrecondition(action: StringifyableContent) {
        this._precondition.AddConfiguredAction(action)
    }
    AddProcedure(action: StringifyableContent) {
        this._procedure.AddConfiguredAction(action)
    }
    AddPostcondition(action: StringifyableContent) {
        this._postcondition.AddConfiguredAction(action)
    }
    String(): string {
        let testContent = new Section()
        testContent.AddConfiguredAction(this._information)
        testContent.AddEmptyLine()
        testContent.AddConfiguredAction(this._precondition)
        testContent.AddEmptyLine()
        testContent.AddConfiguredAction(this._procedure)
        testContent.AddEmptyLine()
        testContent.AddConfiguredAction(this._postcondition)

        let content = `${TestCasePrefix} `
        content += testContent.String()
        return content
    }
    WriteToFile() {
        mkdirSync(OutputDirectory, { recursive: true })
        writeFile(`${OutputDirectory}/${this._information._caseID}.${TestCaseFilePostfix}`, this.String(), (err) => {
            if (err) {
                console.error(`fail to write file, error: ${err}`)
            }
        })
    }
}