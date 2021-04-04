import { AutoIncrement, Column, PrimaryKey, Table, Model, NotNull, BeforeCreate, HasMany } from "sequelize-typescript";
import { Category } from "./Category.model";



@Table({
    tableName: 'product_group',
    timestamps: false
})
export class Group extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number;

    @Column
    @NotNull
    name: string;


    @HasMany(() => Category)
    categories: Category[];


    @BeforeCreate
    static checkName(instance: Group): void {
        instance.name = instance.name.trim().replace(/^./gm, instance.name[0].toLocaleUpperCase());
    }

}
