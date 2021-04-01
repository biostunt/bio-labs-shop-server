import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { User } from "./User.model";



@Scopes(() => ({
    requiredForUser: {
        attributes: ['id', 'name']
    },
    standalone: {
        attributes: ['id', 'name'],
        include: [User]
    }
}))
@Table({ modelName: 'user_role' })
export class UserRole extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @HasMany(() => User)
    users: User[];
}