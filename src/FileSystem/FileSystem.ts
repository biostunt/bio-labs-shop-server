import fs from 'fs';
import path from 'path';

export class FileSystem {

    /**
     * @description Transforms given path to path starting from [src] folder. With this feature you can describe your path from [src]. 
     *
     * 
     * @param givenPath - path to file
     * @returns path consisted of [src] path + @param givenPath
     */
    private static createPath(givenPath: string): string {
        return path.resolve(__dirname, '..', givenPath)
    }

    public static unionPath(...args: string[]): string {
        return path.resolve(...args);
    }

    public static async fileExists(filepath: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.stat(this.createPath(filepath), (err, stats) => {
                if (err) resolve(false);
                else resolve(true);
            })
        })
    }

    public static async readFile(filepath: string, type: string = 'binary') : Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.createPath(filepath), type, (err: any, data: any) => {
                if (err) reject(err);
                else resolve(data);
            })
        })
    }

    public static async writeFile(filepath: string, data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.createPath(filepath), data, (err) => {
                if (err) reject();
                else resolve();
            });
        });
    }

    public static async appendFile(filepath: string, data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.fileExists(filepath)) reject(`Filename ${filepath} doesn't exists. Couldn't append file`);
            fs.appendFile(this.createPath(filepath), data, (err) => {
                if (err) reject(err.message);
                resolve();
            })
        })
    }
}