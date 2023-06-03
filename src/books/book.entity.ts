import { ApiProperty } from "@nestjs/swagger"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity()
export class Book {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'becoming', description: 'The title of the book' })
    @Column()
    name: string

    @ApiProperty({ example: 'michelle', description: 'the name of the author'})
    @Column()
    author: string

    @ApiProperty()
    @Column()
    isPresent: boolean
}