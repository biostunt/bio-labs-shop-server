import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Category } from "./Category.model";
import { Product } from './Product.model';



@Table({
    tableName: 'product_category_relation',
    timestamps: false
})
export class ProductCategory extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Category)
    @Column
    categoryId: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;
}