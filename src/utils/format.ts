import { Indent } from "../service/common/define";

export function SectionIndent(content: string): string {
    let indentedContent = `${Indent}` + content
    indentedContent = indentedContent.replace(/\n/g, `\n${Indent}`)
    return indentedContent
}