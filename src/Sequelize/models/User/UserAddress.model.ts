import { AutoIncrement, BelongsTo, Column, Default, ForeignKey, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { User } from "./User.model";

@Scopes(() => ({
    requiredForUser: {
        attributes: ['country', 'zip_code', 'address']
    },
    standalone: {
        attributes: ['id', 'country', 'zip_code', 'address'],
        include: [User]
    }
}))
@Table({ modelName: 'user_address' })
export class UserAddress extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    @ForeignKey(() => User)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column
    @Default("")
    country: string;

    @Column
    @Default("")
    zip_code: string;

    @Column
    @Default("")
    address: string;
}