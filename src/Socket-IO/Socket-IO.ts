import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket as SocketIOClient } from 'socket.io';

export interface ISocketIOProps {
    port: number;
    maxListeners: number;
}

export class SocketIO {
    public name: string;
    private port: number;
    private maxListeners: number;
    private httpServer!: HttpServer;
    private socketIOServer!: SocketIOServer;

    constructor(props: ISocketIOProps) {
        this.name = `SocketIO:${props.port}`;
        this.port = props.port;
        this.maxListeners = props.maxListeners;
    }

    private async createHttpServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.httpServer = new HttpServer();
            this.httpServer.listen(this.port, () => {
                resolve();
            });
        });
    }

    private async createSocketServer(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socketIOServer = new SocketIOServer(this.httpServer, {
                cors: {
                    origin: "*",
                    methods: ["GET", "POST"],
                    allowedHeaders: [],
                    credentials: true
                }
            });
            this.initializeSocketServer
            resolve();
        });
    }
    private initializeSocketServer(): void {
        this.socketIOServer.setMaxListeners(this.maxListeners);
        this.socketIOServer.on('connection', this.onClientConnected.bind(this));
    }

    /**
     * @description Connects events to client after connection to server.
     * @param client client which connected to server.
     */
    private async onClientConnected(client: SocketIOClient): Promise<void> {
        
    }

}