import * as vscode from "vscode";
import { CpuProvider } from "./Provider/CpuProvider";
import { IHardwareProvider } from "./IHardwareProvider";
import { RamProvider } from "./Provider/RamProvider";
import { NetworkProvider } from "./Provider/NetworkProvider";
import { CpuTemperaturProvider } from "./Provider/CpuTemperatur";

let intervall: NodeJS.Timeout;
let providers: IHardwareProvider[] = [];

export function activate(context: vscode.ExtensionContext) {

	const settings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration("hardwaremonitor");

	vscode.workspace.onDidChangeConfiguration(OnSettingsChanged);

	SetupProviders(settings, context);

	const intervallSetting: number | undefined = settings.get<number>("intervall");
	if (intervallSetting) {
		intervall = setInterval(refreshAll, intervallSetting * 1000);
	}else {
		intervall = setInterval(refreshAll, 2500);
	}
}

export function deactivate() {
	clearInterval(intervall);
}

function SetupProviders(settings: vscode.WorkspaceConfiguration, context: vscode.ExtensionContext): void {
	if (settings.get<boolean>("showCpu")) {
		const cpu: IHardwareProvider = new CpuProvider();
		providers.push(cpu);
		context.subscriptions.push(cpu);
	}

	if (settings.get<boolean>("showRam")) {
		const ram: IHardwareProvider = new RamProvider();
		providers.push(ram);
		context.subscriptions.push(ram);
	}

	if (settings.get<boolean>("showNetwork")) {
		const network: IHardwareProvider = new NetworkProvider();
		providers.push(network);
		context.subscriptions.push(network);
	}

	if (settings.get<boolean>("showCpuTemperature")) {
		const cpuTemperatur: IHardwareProvider = new CpuTemperaturProvider();
		providers.push(cpuTemperatur);
		context.subscriptions.push(cpuTemperatur);
	}
}

async function refreshAll(): Promise<void> {
	await Promise.all(providers.map(p => p.UpdateValue()));
}

function OnSettingsChanged(e: vscode.ConfigurationChangeEvent): void {
	if(e.affectsConfiguration("hardwaremonitor.showCpu")) {
		console.log("ja");
	}else {
		console.log("nein");
	}
}
