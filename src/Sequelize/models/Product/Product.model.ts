import { Table, Model, BelongsToMany, Column, Default, AutoIncrement, PrimaryKey, NotNull, DataType, HasMany } from "sequelize-typescript";
import { Category } from "./Category.model";
import { ProductCategory } from "./ProductCategory.model";
import { ProductStock } from "./ProductStock.model";
import { Review } from "./Review.model";



@Table({
    tableName: 'product',
    timestamps: true
})
export class Product extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column(DataType.BOOLEAN)
    @Default(false)
    isActive: boolean;

    @Column
    @Default('')
    code: string;

    @Column
    @NotNull
    name: string;

    @Column(DataType.FLOAT)
    @Default(0.0)
    price: number;
    
    @BelongsToMany(() => Category, () => ProductCategory)
    categories: Category[];

    @HasMany(() => Review)
    reviews: Review[];

    @HasMany(() => ProductStock)
    stocks: ProductStock[]
}