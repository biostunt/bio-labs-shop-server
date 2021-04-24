import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductStock } from "../Product/ProductStock.model";



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

    @HasMany(() => ProductStock)
    stocks: ProductStock[];
}