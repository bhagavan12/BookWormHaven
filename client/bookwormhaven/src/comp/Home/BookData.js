import React, { useEffect, useState } from 'react';

function BookData({ cover_url }) {
    const [scrollPercentage, setScrollPercentage] = useState(1);

    useEffect(() => {
        function handleScroll() {
            console.log('Scroll event triggered'); // Check if scroll event is firing
            const newScrollPercentage = getScrollPercentage();
            console.log('Raw scroll percentage:', newScrollPercentage); // Log raw value
            setScrollPercentage(newScrollPercentage);
        }

        window.addEventListener('scroll', handleScroll);
        console.log('Scroll listener added'); // Confirm listener is added

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function getScrollPercentage() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return Math.min(Math.round((scrollTop / scrollHeight) * 100) + 1, 100);
    }

    // Render some content to make the page scrollable
    return (
        <>
            <h1>Scroll Percentage: {scrollPercentage}%</h1>
            <div style={{ height: '400vh' }}>
                Popular Book Reviews Books

                Goodreads
                https://www.goodreads.com › shelf › show › book-reviews
                Popular Book Reviews Books. The Hunger Games Suzanne Collins. The Hunger Games (The Hunger Games, #1). Want to Read. Catching Fire Suzanne Collins.
                People also ask
                How can I write a book review?
                What books are good for book reviews?
                What is a book review and example?
                What is the best site for book reviews?
                Feedback

                The Book Review, Monthly Review of Important Books

                thebookreviewindia.org
                https://www.thebookreviewindia.org
                Under the Bakul Tree is a heartwarming coming-of-age tale. It celebrates friendship, hope and determination as it unravels the devastating effects of poverty ...
                ‎Current Issue · ‎Contact Us · ‎About Us · ‎Archives

                Book Reviews by Kinjal parekh || Indian Book Blogger and ...

                kinjalparekh.in
                https://kinjalparekh.in › book-reviews
                Samsara by Saksham Garg. Samsara is more than just a mystical or a magical adventure. It talks about something greater. It makes one question the idea of God, ...

                Book Review - The New York Times International

                The New York Times
                https://www.nytimes.com › ... › Books
                Reviews, essays, best sellers and children's books coverage from The New York Times Book Review.

                Book Reviews of the Best & the Latest Books

                bookGeeks
                https://www.bookgeeks.in › book-reviews
                bookGeeks has one of the largest collection of Book Reviews across fiction and non-fiction genres like romance, sci-fi, historical fiction, thriller, mystery ...

                Goodreads | Meet your next favorite book

                Goodreads
                https://www.goodreads.com
                Find and read more books you'll love, and keep track of the books you want to read. Be part of the world's largest community of book lovers on Goodreads.
                ‎Childrens Books · ‎Ebook Books · ‎Best Books 2023 · ‎Best Books of the 20th Century

                Book Marks: The book review aggregator Book Marks

                Book Marks
                https://bookmarks.reviews
                Literary Hub's Bookmarks is the definitive source for book reviews and critical conversations about contemporary writing.

                17 Book Review Examples to Help You Write the Perfect ...

                Reedsy
                https://reedsy.com › discovery › blog › book-review-exa...
                29 Mar 2024 — We've scoured the literary realms and compiled 17 good book review examples to give you a headstart as you're writing your own book review.

                Book Reviews & Recommendations
                Kirkus Reviews
                https://www.kirkusreviews.com › discover-books
                At Kirkus Reviews, discover the hottest new books, from bestsellers you love to writers you didn't know you'd love. Be the first to be in the know!
                ‎Fiction · ‎Romance · ‎History · ‎It starts with us

                Book Reviews - The US Review of Books: Professional Book ...

                The US Review of Books
                https://www.theusreview.com
                The US Review of Books is dedicated to fair and honest coverage for all books. We are a leading book review site, often visited for professional book reviews ...
                ‎Book Reviews · ‎Connect · ‎Agent Without a Name · ‎Here's
                People also search for
                Book review of famous books PDF
                Book reviews examples
                Book reviews on novels
                Best book review for students
                Short book review for students
                Book Review of famous Indian books
                Book review format
                Book review of any book in 300 words
                1
                2
                3
                4
                5
                6
                7
                8
                9
                10
                Next

            </div>
        </>
    );
}

export default BookData;

