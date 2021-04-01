import { Sequelize } from "sequelize-typescript";
import Crypto from 'crypto';
import { ILogger } from "../Logger/Logger";
import { SocketIO } from "../Socket-IO";



export class Core {
    public name: string;
    private sequelize!: Sequelize;
    private socketIO!: string;
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.name = `core-${Crypto.randomBytes(12).toString('hex')}`;
        this.logger = logger;
    }

    public async initSequelize(sequelize: Sequelize): Promise<void> {
        try {
            await sequelize.authenticate();
            this.logger.write({ instance: this.name, message: 'Sequelize authentication complete...' });
            await sequelize.sync({ alter: true });
            this.logger.write({ instance: this.name, message: 'Sequelize synchronization complete...' });
            this.sequelize = sequelize;
        } catch ({ message }) {
            this.logger.write({ instance: this.name, message });
        }
    }

    public async initSocketIO(socketIO: SocketIO): Promise<void> {
        try {
            throw new Error('socketIO not loaded');
        } catch ({ message }) {
            this.logger.write({ instance: this.name, message });
        }
    }

}