import { mem } from "systeminformation";
import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { IHardwareProvider } from "../IHardwareProvider";

export class RamProvider implements IHardwareProvider {

    private statusBarItem: StatusBarItem;

    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);
        this.statusBarItem.show();
    }

    async UpdateValue(): Promise<void> {
        const data = await mem();
        this.statusBarItem.text = `${this.formatAmount(data.used)} GB | ${this.formatAmount(data.total)} GB`;
    }

    formatAmount(amount: number): string {
        return (amount / 1024 / 1024 / 1024).toFixed(1);
    }

    dispose() {
        this.statusBarItem.dispose();
    }

}