import { StatusBarAlignment, StatusBarItem, window } from "vscode";
import { IHardwareProvider } from "../IHardwareProvider";
import { networkStats, networkInterfaceDefault } from "systeminformation";

export class NetworkProvider implements IHardwareProvider {
    
    private statusBarItem: StatusBarItem;
    
    constructor() {
        this.statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 100);    
        this.statusBarItem.show();
    }

    async UpdateValue(): Promise<void> {
        const defaultNetwork: string = await networkInterfaceDefault();
        const data = (await networkStats()).filter(n => n.iface.toLowerCase() === defaultNetwork.toLowerCase())[0];
        this.statusBarItem.text = `$(cloud-download) ${this.formatValue(data.rx_sec ?? 0)} | $(cloud-upload) ${this.formatValue(data.tx_sec ?? 0)}`;
    }

    formatValue(value: number): string {
        //bytes
        if (value <= 1024) {
            return `${value.toFixed(0)} Bit/s`;
        }else if (value <= 1024 * 1024) {
            return `${(value / 1024).toFixed(0)} KBit/S`;
        }else if (value <= 1024 * 1024 * 1024) {
            return `${(value / 1024 / 1024).toFixed(0)} MBit/s`;
        }
        return `${(value / 1024 / 1024 / 1024).toFixed(0)} GBit/s`;
    }

    dispose() {
        this.statusBarItem.dispose();
    }
}