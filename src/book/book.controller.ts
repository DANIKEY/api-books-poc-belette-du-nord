import { Controller,Get ,Post ,Req ,Res ,Param ,Delete ,Put} from '@nestjs/common';
import { BookService } from '././book.service';
import { Request , Response } from 'express';
//import { Book } from '././book.interface';



@Controller('books')

/**
 * Books class controller  
 */

export class BookController {
  /**
   * instanciate books service
   * @param bookService 
   */
  constructor(private readonly bookService: BookService){}

   /**
    * create book
    * @param request book object 
    * @param response return response json 
    * @returns  book object created
    */
   @Post()
   createBooks(@Req() request: Request,@Res() response: Response) {
    //params
    const title = request.body.title;
    const author  = request.body.author;
    const kind_of_book = request.body.kind_of_book;
    const price = request.body.price;

    if(title == null || author == null || kind_of_book == null || price == null){
        return response.status(400).json({'error': 'missing parameters'});
    }
    
    //data book 
    const data = {
      "id" : null,
      "title" : title,
      "author" : author,
      "kind_of_book" : kind_of_book,
      "price" : price
    }
    
    //this.m_book.title = title
    //this.m_book.author = author
    //this.m_book.kind_of_book = kind_of_book
    //this.m_book.price = price

    //request save data to database table book

    this.bookService.createBook(data)
    .then(data => {
      return response.status(200).json(data);
    })
    .catch(e => {
      return response.status(400).json({'error': 'book can not be created...'});
    })
    
  }  
  

  /**
   * update books by id
   * @param params  book id
   * @param request  book object update
   * @param response  return response json 
   * @returns book updated
   */ 
  @Put(':id')
  updataBook(@Param() params, @Req() request: Request,@Res() response: Response){
    
      //console.log(this.bookService.getBookById(params.id))

      const title = request.body.title;
      const author  = request.body.author;
      const kind_of_book = request.body.kind_of_book;
      const price = request.body.price;
  
      if(title == null || author == null || kind_of_book == null || price == null){
        return response.status(400).json({'error': 'missing parameters'});
      }
  
      const data = {
        "id" : params.id,
        "title" : title,
        "author" : author,
        "kind_of_book" : kind_of_book,
        "price" : price
      }
      
      this.bookService.updateBookById(data)
      .then(data => {
        return response.status(200).json(data);
      })
      .catch(e => { 
        return response.status(400).json({'error': 'book can not be update...'});
      })

  }

   /**
    * get books service
    * @returns all books objects
    */
   @Get()
   getBooks() {
     return this.bookService.getAllBooks();
   }

   
   /**
    * get book by id
    * @param params  book id
    * @returns book object
    */
   @Get(':id')
   getOneBookById(@Param() params){
     return this.bookService.getBookById(params.id)
   }
   
   /**
    * delete book data by id
    * @param params  book id
    * @returns 
    */
   @Delete(':id')
   removeBookById(@Param() params){
      return this.bookService.deleteBookById(params.id)
   }
}
