export abstract class Helper {
    public static sleepAsync(msToSleep: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, msToSleep));
    }
}