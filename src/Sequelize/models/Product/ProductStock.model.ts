import { AutoIncrement, Column, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Product } from "./Product.model";
import { Shop } from '../Shop/Shop.model';


@Table({
    tableName: 'product_stock',
    timestamps: false
})
export class ProductStock extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @ForeignKey(() => Shop)
    @Column
    shopId: number;

    
    @Column
    @Default(0)
    amount: number;
    
}