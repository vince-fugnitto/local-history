import * as vscode from 'vscode';

export class LocalHistoryProvider implements vscode.TreeDataProvider<LocalHistory> {

    private _onDidChangeTreeData: vscode.EventEmitter<LocalHistory | undefined> = new vscode.EventEmitter<LocalHistory | undefined>();
    readonly onDidChangeTreeData: vscode.Event<LocalHistory | undefined> = this._onDidChangeTreeData.event;

    constructor() {
        vscode.window.onDidChangeActiveTextEditor(() => this.refresh());
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: LocalHistory): vscode.TreeItem {
        return new LocalHistory(
            element.label,
            element.path,
            { command: 'extension.localHistory', title: '', arguments: [element.label] }
        );
    }

    getChildren(_element?: LocalHistory): Thenable<LocalHistory[]> {
        const editor = vscode.window.activeTextEditor;
        const label = editor
            ? editor.document.languageId
            : 'No Opened Editor';
        const path = editor
            ? editor.document.fileName
            : '';
        return Promise.resolve([new LocalHistory(label, path)]);
    }
}

export class LocalHistory extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly path: string,
        public command?: vscode.Command
    ) {
        super(label);
    }

    get tooltip(): string {
        return this.label;
    }

    get description(): string {
        return this.path;
    }

    contextValue = 'local-history-item';

}
