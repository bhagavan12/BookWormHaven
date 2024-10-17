// // // import React from 'react'

// // // export default function BookDetails({book}) {
// // //     return (
// // //         <div className='bookcontainer'>
// // //             <div>
// // //                 <img src='' alt=''></img>
// // //             </div>
// // //             <div>
// // //                 <h2>{book.title}</h2>
// // //                 <p>Author: {book.authors}</p>
// // //                 <p>Published Date: {book.publishDate}</p>
// // //                 <p>Languages: {book.languages.join(', ')}</p>
// // //                 <p>Description: {book.description}</p>
// // //                 <a href={book.freeToRead_url}>Read for Free</a>
// // //             </div>
// // //         </div>
// // //     )
// // // }
// // import React from 'react';
// // import { useLocation } from 'react-router-dom';

// // export default function BookDetails() {
// //   const location = useLocation();
// //   const { book } = location.state || {};  // Access the book object from the state
// //     console.log({book})
// //   if (!book) {      
// //     return <div>No book data available.</div>;
// //   }

// //   return (
// //     <div className="book-details">
// //       <h1>{book.title}</h1>
// //       <img src={book.cover_url} alt={book.title} />
// //       <p><strong>Genre:</strong> {book.genre}</p>
// //       <p><strong>Description:</strong> {book.description}</p>
// //       <p><strong>Authors:</strong> {book.authors}</p>
// //       <p><strong>Publishers:</strong> {book.publishers}</p>
// //       <p><strong>Languages:</strong> {book.languages}</p>
// //       <p><strong>Pages:</strong> {book.pages}</p>
// //       <p><strong>Free to Read:</strong> {book.freeToRead ? "Yes" : "No"}</p>
// //       <a href={book.freeToRead_url}>Read for Free</a>
// //     </div>
// //   );
// // }
// // import React from 'react';
// // import { useLocation } from 'react-router-dom';

// // export default function BookDetails() {
// //   const location = useLocation();
// //   const { book } = location.state; // Retrieve the book data from the state

// //   return (
// //     <div>
// //       <h1>{book.title}</h1>
// //       <img src={book.cover_url} alt={book.title} />
// //       <p><strong>Genre:</strong> {book.genre}</p>
// //       <p><strong>Description:</strong> {book.description}</p>
// //       <p><strong>Authors:</strong> {book.authors}</p>
// //       <p><strong>Publishers:</strong> {book.publishers}</p>
// //       <p><strong>Languages:</strong> {book.languages}</p>
// //       <p><strong>Pages:</strong> {book.pages}</p>
// //       <p><strong>Free to Read:</strong> {book.freeToRead ? "Yes" : "No"}</p>
// //       <a href={book.freeToRead_url}>Read for Free</a>
// //       {/* You can display more details about the book here */}
// //     </div>
// //   );
// // }

// import React from 'react';
// import { useLocation } from 'react-router-dom';

// export default function BookDetails() {
//   const location = useLocation();
//   const { book } = location.state || {};  // Access the book object from the state

//   if (!book) {
//     return <div>No book data available.</div>;
//   }

//   return (
//     <div className="book-details">
//       <h1>{book.title}</h1>
//       <img src={book.cover_url} alt={book.title} />
//       <p><strong>Genre:</strong> {book.genre}</p>
//       <p><strong>Description:</strong> {book.description}</p>
//       <p><strong>Authors:</strong> {book.authors}</p>
//       <p><strong>Publishers:</strong> {book.publishers}</p>
//       <p><strong>Languages:</strong> {book.languages}</p>
//       <p><strong>Pages:</strong> {book.pages}</p>
//       <p><strong>Free to Read:</strong> {book.freeToRead ? "Yes" : "No"}</p>
//       <a href={book.freeToRead_url}>Read for Free</a>
//     </div>
//   );
// }
import React, { useContext } from 'react';
import { BookContext } from '../BookProvider'; // Import the context
import './BookDetails.css';
import { Card } from 'primereact/card';
import { Fieldset } from 'primereact/fieldset';
import {Tag} from 'primereact/tag';
import BookData from './BookData';
export default function BookDetails() {
    const { selectedBook } = useContext(BookContext); // Get selected book from context
    const reviews = [
        {
            id: 1,
            reader_id: "12wer",
            book_id: '${selectedBook?.title}',
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        },
        {
            id: 2,
            reader_id: "12wer",
            book_id: '${selectedBook?.title}',
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        },
        {
            id: 3,
            reader_id: "12wer",
            book_id: '${selectedBook?.title}',
            review: "qwertyui ertyuy wertyhgfd ",
            created_at: "2003-05-01"
        }
    ]
    if (!selectedBook) {
        return <div>No book selected</div>;
    }

    return (
        <>
            <div className='bookcstyle'>
                <h1 id='title'>{selectedBook?.title}</h1>
                <div className='bookc'>
                    <img src={selectedBook.cover_url} alt={selectedBook.title} className='bookimg' />
                    <hr />
                    <div className='bookd'>
                        <p id='st'><strong>Genre:</strong> {selectedBook.genre}</p>
                        <p id='st'><strong >Description:</strong> {selectedBook.description}</p>
                        <p id='st'><strong >Authors:</strong> {selectedBook.authors}</p>
                        <p id='st'><strong >Publishers:</strong> {selectedBook.publishers}</p>
                        <p id='st'><strong >Languages:</strong> {selectedBook.languages}</p>
                        <p id='st'> <strong >Pages:</strong> {selectedBook.pages}</p>
                        <p id='st'><strong>Free to Read:</strong> {selectedBook.freeToRead ? "Yes" : "No"}</p>
                        <a href={selectedBook.freeToRead_url}>Read for Free</a> 
                        <BookData url={selectedBook.freeToRead_url}></BookData>
                    </div>
                </div>

            </div>
            <div className='bookcstyle'>
                <Fieldset legend="Ratings">
                    {
                        reviews?.map((robj) => (
                            <div className="bookcstyle" style={{display:'flex'}}>
                                <p>{robj.review}</p>
                                
                                <Tag value={robj.created_at} style={{marginRight:"0px",marginLeft:"auto"}}></Tag>
                            </div>
                        ))
                    }
                </Fieldset>
            </div>
        </>
    );
}
