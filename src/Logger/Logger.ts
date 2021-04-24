import { FileSystem } from "../FileSystem";

type TWhereWriteMessage = 'CONSOLE' | 'FILE';

export interface ILoggerWriteProps {
    instance?: string,
    message: string,
}
type TLoggerWrite = (props: ILoggerWriteProps ) => void;

export interface ILogger {
    write: TLoggerWrite
}

type TCompileMessageFunction = (instance: string, message: string) => string;


export interface ILoggerProps {
    /**
     * @description Should logger write data to console?
     * @default false
     */
    outputToConsole: boolean;
    /**
     * @ignore if outputToConsole is set to true.
     * @description Should logger divide any instance on different files? 
     * @default true
     */
    divideByInstances?: boolean;
    /**
     * @ignore if outputToConsole is set to true.
     * @description Name of the folder which contains log files.
     * @default `../logs/startup-${new Date().toISOString().split('T')[1].split('.')[0]}`
     */
    folderName?: string;
}

export class Logger implements ILogger {

    private outputToConsole: boolean;


    private folderName: string;
    private divideByInstances: boolean;

    /**
     * overridable function that compile message, which will be written in output
     * @param instance - name of instance that invoked logger
     * @param message - data
     * @returns compiled data line
     */
    public onMessageHandle: TCompileMessageFunction = (instance: string, message: string): string => {
        return `[${instance ? instance : 'UNKNOWN'}]:[${new Date().toISOString()}]->${message}\n`;
    }

    constructor(props: ILoggerProps = {
        outputToConsole: false,
        divideByInstances: true,
        folderName: `../logs/startup-${new Date().toISOString().split('T')[1].split('.')[0]}`
    }) {
        this.outputToConsole = props.outputToConsole;
        this.divideByInstances = props.divideByInstances;
        this.folderName = props.folderName.replace('${date}', new Date().toISOString().split('T')[1].split('.')[0]);
    }

    public async write(props: ILoggerWriteProps): Promise<void> {
        const { instance, message } = props;
        try {
            if (this.outputToConsole)
                await this.writeToConsole(instance, message);
            else
                await this.writeToFile(instance, message);
        } catch ({ message }) {
            console.warn(message);
        }
    }

    private async writeToConsole(instance: string, message: string): Promise<void> {
        console.info(this.onMessageHandle(instance, message));
    }

    private async writeToFile(instance: string, message: string): Promise<void> {
        let filepath: string = this.divideByInstances ?
            FileSystem.unionPath(this.folderName, `${instance}.txt`) :
            FileSystem.unionPath(this.folderName, 'log.txt');
        let exists = await FileSystem.fileExists(filepath);
        let data = this.onMessageHandle(instance, message);
        if (!exists) await FileSystem.writeFile(filepath, data);
        else await FileSystem.appendFile(filepath, data);
    }

}