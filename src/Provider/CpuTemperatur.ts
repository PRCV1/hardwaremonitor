import { cpuTemperature } from "systeminformation";
import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { IHardwareProvider } from "../IHardwareProvider";

export class CpuTemperaturProvider implements IHardwareProvider {

    private statusBarItem: StatusBarItem;

    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);    
        this.statusBarItem.show();
    }

    async UpdateValue(): Promise<void> {
        const data = await cpuTemperature();
        this.statusBarItem.text = `${(data.main ?? 0).toFixed(0)} °C`;
    }

    dispose() {
        this.statusBarItem.dispose();
    }
}