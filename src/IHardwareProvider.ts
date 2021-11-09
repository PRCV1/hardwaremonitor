import { Disposable } from "vscode";

export interface IHardwareProvider extends Disposable {
    UpdateValue(): Promise<void>
}