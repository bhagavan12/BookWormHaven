import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../Styling/BookDetails.css';
const BookReader = () => {
  const { bookId } = useParams(); // Get bookId from route params
  const readerId = useSelector((state) => state.user.user.id); // Get readerId from user slice
  const [progress, setProgress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page for pagination
  const [bookContent, setBookContent] = useState(''); // Track book content for the current page
  const [totalPages, setTotalPages] = useState(0); // Track total pages for pagination
  const [bookTotalcontent,setTc]=useState('');
  const THRESHOLD = 3000; // Number of characters per page (set threshold value)

  // Fetch the entire content from the book API
  const fetchBookContent = async () => {
    try {
    //   const response = await axios.get(`https://www.gutenberg.org/cache/epub/345/pg345.txt`);
      const response = await axios.get(`http://localhost:3000/api/book-content/${bookId}`);
      const content = response.data;
        console.log("content",content)
      // Calculate the total number of pages
      const totalPageCount = Math.ceil(content.length / THRESHOLD);
      console.log(totalPageCount)
      setTotalPages(totalPageCount); // Set the total number of pages
    
      // Slice the content to display the first page initially
    //   setBookContent(content.slice(0, THRESHOLD));

      // Return the entire content so it can be used later
      return content;
    } catch (error) {
      console.error('Error fetching book content:', error);
    }
  };

  // Fetch progress and initialize if needed
  const fetchProgressAndInitialize = async (bookContentAll) => {
    try {
      // Check if progress exists for this reader and book
      const progressResponse = await axios.get(
        `http://localhost:3000/api/progress/progress/${readerId}/${bookId}`
      );

      if (progressResponse.data) {
        // If progress exists, set it in the state
        setProgress(progressResponse.data);
        setCurrentPage(progressResponse.data.current_page);
        const start = (progressResponse.data.current_page - 1) * THRESHOLD;
      const end = start + THRESHOLD;
        setBookContent(bookContentAll.slice(start,end));
      } else {
        // If no progress exists, initialize it
        await axios.post(`http://localhost:3000/api/progress/update`, {
          readerId,
          bookId,
          currentPage: 1, // Start from the first page
          totalPages, // Save total pages in the table
          statusOfBook: 'in_progress',
        });
        setCurrentPage(1); // Set to the first page
        
      }
    } catch (error) {
      console.error('Error fetching or initializing progress:', error);
    }
  };

  // Trigger the API call to check or create progress and fetch the current page content
  useEffect(() => {
    const initBookReader = async () => {
      const bookContentAll = await fetchBookContent(); // Fetch book content
      setTc(bookContentAll);
      await fetchProgressAndInitialize(bookContentAll); // Fetch progress and initialize if needed
    };

    initBookReader();
  }, [readerId, bookId]);

  // Handle going to the next or previous page
  const handlePageChange = async (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);

      // Update the reading progress
      await axios.post(`http://localhost:3000/api/progress/update`, {
        readerId,
        bookId,
        currentPage: newPage,
        totalPages,
        statusOfBook: newPage === totalPages ? 'completed' : 'in_progress',
      });

      // Slice and set the content for the new page
      const start = (newPage - 1) * THRESHOLD;
      const end = start + THRESHOLD;
      const contentForNewPage = bookTotalcontent.slice(start, end);
      setBookContent(contentForNewPage);
    }
  };

  return (
    <div>
      <h1>Reading Book ID: {bookId}</h1>
      <p className='booktext'>{bookContent}</p>

      {/* Pagination controls */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default BookReader;
