// IWritableObject The base type which can be exported into the test case file
export interface IWritableObject {
	ToString(): string
}

// IAction The smallest unit of test step
export interface IAction extends IWritableObject {
	SetSubject(subjectName: string): void
	SetVerb(verbType: string): void
	SetObject(objectName: string): void
	SetAdverbial(adverbialName: string, content: any): void
}

export interface ISection extends IWritableObject {
	AddAction(action: IAction): void
}