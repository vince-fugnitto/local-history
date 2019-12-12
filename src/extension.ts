
import * as vscode from 'vscode';
import { LocalHistoryProvider } from './local-history';

export function activate(context: vscode.ExtensionContext) {
    const localHistoryProvider = new LocalHistoryProvider();
    vscode.window.registerTreeDataProvider('local-history', localHistoryProvider);
    let disposable: vscode.Disposable[] = [];
    disposable.push(vscode.commands.registerCommand(
        'extension.localHistory',
        (label: string) => vscode.window.showInformationMessage(`executed: ${label}`))
    );
    context.subscriptions.push(...disposable);
}
export function deactivate() { }
