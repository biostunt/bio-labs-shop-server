import { AutoIncrement, BelongsTo, BelongsToMany, Column, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { Group } from "./Group.model";
import { ProductCategory } from "./ProductCategory.model";
import { Product } from './Product.model';



@Table({
    tableName: 'product_category',
    timestamps: false
})
export class Category extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Group)
    @Column
    groupId: number;

    @BelongsTo(() => Group)
    group: Group;

    @NotNull
    @Column
    name: string;

    @BelongsToMany(() => Product, () => ProductCategory)
    products: Product[];
}