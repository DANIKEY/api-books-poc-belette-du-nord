import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
  
  @Column()
  author: string;

  @Column()
  kind_of_book: string;

  @Column()
  price: string;
}