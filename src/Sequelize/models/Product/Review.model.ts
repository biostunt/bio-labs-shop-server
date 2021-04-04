import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "../User/User.model";
import { Product } from "./Product.model";




@Table({
    tableName: 'product_review',
    timestamps: false
})
export class Review extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;
    
    @Column
    @NotNull
    rating: number;

    @Column(DataType.TEXT)
    @Default("")
    text: string;


}