import { Disposable, window, StatusBarItem, StatusBarAlignment } from "vscode";
import { cpus } from "os";
import { cpu, currentLoad } from "systeminformation";
import { IHardwareProvider } from "../IHardwareProvider";

export class CpuProvider implements IHardwareProvider {

    private statusBarItem: StatusBarItem;

    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);
        this.statusBarItem.show();
    }

    async UpdateValue(): Promise<void> {
        const data = await currentLoad();
        this.statusBarItem.text = `${data.currentLoad.toFixed(0)}%`;
    }

    dispose() {
        this.statusBarItem.dispose();
    }

}