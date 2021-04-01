import { AutoIncrement, BelongsTo, Column, Default, DefaultScope, ForeignKey, HasOne, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { UserAddress } from "./UserAddress.model";
import { UserRole } from "./UserRole.model";

@Scopes(() => ({
    listableItem: {
        attributes: ['id', 'name', 'phone', 'mail'],
        include: [UserRole],
        order: [['id', 'DESC']]
    },
    fullInformation: {
        attributes: ['id', 'name', 'phone', 'mail'],
        include: [UserRole.scope('requiredForUser'), UserAddress.scope('requiredForUser')]
    }
}))
@Table({ modelName: 'user' })
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => UserRole)
    @Column
    roleId: number;

    @BelongsTo(() => UserRole)
    role: UserRole;

    @Column
    name: string;

    @Column
    @Default("")
    phone: string;

    @Column
    @Default("")
    mail: string;

    @HasOne(() => UserAddress)
    address: UserAddress;
}