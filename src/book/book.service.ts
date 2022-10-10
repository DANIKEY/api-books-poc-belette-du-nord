import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
/**
 * Books class service
 */
export class BookService {
   /**
    * Instanciate book entity
    * @param bookRepository 
    */
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  
  /**
   * service add new book 
   * @param m_book  book object
   * @returns  book created
   */
  async createBook(m_book: Book):Promise<Book>{
    
    const book = new Book();
    book.title = m_book.title;
    book.author = m_book.author;
    book.kind_of_book = m_book.kind_of_book;
    book.price = m_book.price;

    await this.bookRepository.save(book);

    //console.log(book.id)
    //const id = book.id
    //console.log(book);

    return await book;
  }
   

  /**
   * service update book
   * @param m_book  book object
   * @returns  Promise Book updated
   */
  async updateBookById(m_book:Book):Promise<Book>{

    const id = m_book.id
    const book = await this.bookRepository.findOneBy({id : id});

    book.title = m_book.title;
    book.author = m_book.author;
    book.kind_of_book = m_book.kind_of_book;
    book.price = m_book.price;
    
    await this.bookRepository.save(book);
    return await book;
  }

  /**
   * service get all data books 
   * @returns Promise Book data all 
   */
  getAllBooks(): Promise<Book[]>{
    return this.bookRepository.find();
  }
  

  /**
   * service get book by id
   * @param id 
   * @returns Promise Book By Id
   */
  getBookById(id: number): Promise<Book>{
    return this.bookRepository.findOneBy({ id });
  }

  /**
   * service delete book by id
   * @param id 
   * Promise delete book 
   */
  async deleteBookById(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

}
