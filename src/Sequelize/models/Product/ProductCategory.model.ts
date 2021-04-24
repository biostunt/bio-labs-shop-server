import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
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
    @NotNull
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Product)
    @Column
    @NotNull
    productId: number;

    @BelongsTo(() => Product)
    product: Product;
}