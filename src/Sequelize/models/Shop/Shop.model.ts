import { AutoIncrement, Column, Model, PrimaryKey, Table } from "sequelize-typescript";



@Table({ tableName: 'shop' })
export class Shop extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    name: string;

    @Column
    address: string;
}