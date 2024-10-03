
// // import React from 'react';
// // import { Menubar } from 'primereact/menubar';
// // import { InputText } from 'primereact/inputtext';
// // import { Badge } from 'primereact/badge';
// // import { Avatar } from 'primereact/avatar';
// // import Card from '../Home/Card';

// // export default function TemplateDemo() {
// //     const itemRenderer = (item) => (
// //         <a className="flex align-items-center p-menuitem-link">
// //             <span className={item.icon} />
// //             <span className="mx-2">{item.label}</span>
// //             {item.badge && <Badge className="ml-auto" value={item.badge} />}
// //             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
// //         </a>
// //     );
// //     const items = [
// //         {
// //             label: 'Home',
// //             icon: 'pi pi-home'
// //         },
// //         {
// //             label: 'Books',
// //             icon: 'pi pi-star'
// //         },
// //         {
// //             label: 'Author',
// //             icon: 'pi pi-envelope',
// //             // // badge: 3,
// //             // template: itemRenderer
// //         },
// //         {
// //             label: 'My Sheleves',
// //             icon: 'pi pi-search',
// //             items: [
// //                 {
// //                     label: 'Core',
// //                     icon: 'pi pi-bolt',
// //                     shortcut: '⌘+S',
// //                     template: itemRenderer
// //                 },
// //                 {
// //                     label: 'Blocks',
// //                     icon: 'pi pi-server',
// //                     shortcut: '⌘+B',
// //                     template: itemRenderer
// //                 },
// //                 {
// //                     label: 'UI Kit',
// //                     icon: 'pi pi-pencil',
// //                     shortcut: '⌘+U',
// //                     template: itemRenderer
// //                 }

// //             ]
// //         },
// //         {
// //             label: 'Profile',
// //             icon: 'pi pi-star'
// //         },
// //     ];

// // const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
// // const end = (
// //     <div className="flex align-items-center gap-2">
// //         <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
// //         {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
// //     </div>
// // );

// // return (
// //     <div className="card">
// //         <Menubar model={items} start={start} end={end}/>
// //         <Card></Card>
// //     </div>
// // )
// // }
// // import React from 'react';
// // import { Menubar } from 'primereact/menubar';
// // import { InputText } from 'primereact/inputtext';
// // import { Badge } from 'primereact/badge';
// // import { Avatar } from 'primereact/avatar';
// // import Card from '../Home/Card';

// // export default function TemplateDemo() {
// //     const itemRenderer = (item) => (
// //         <a className="flex align-items-center p-menuitem-link">
// //             <span className={item.icon} />
// //             <span className="mx-2">{item.label}</span>
// //             {item.badge && <Badge className="ml-auto" value={item.badge} />}
// //             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
// //         </a>
// //     );

// //     const items = [
// //         {
// //             label: 'Home',
// //             icon: 'pi pi-home'
// //         },
// //         {
// //             label: 'Books',
// //             icon: 'pi pi-star'
// //         },
// //         {
// //             label: 'Author',
// //             icon: 'pi pi-envelope',
// //         },
// //         {
// //             label: 'My Shelves',
// //             icon: 'pi pi-search',
// //             items: [
// //                 {
// //                     label: 'Core',
// //                     icon: 'pi pi-bolt',
// //                     shortcut: '⌘+S',
// //                     template: itemRenderer
// //                 },
// //                 {
// //                     label: 'Blocks',
// //                     icon: 'pi pi-server',
// //                     shortcut: '⌘+B',
// //                     template: itemRenderer
// //                 },
// //                 {
// //                     label: 'UI Kit',
// //                     icon: 'pi pi-pencil',
// //                     shortcut: '⌘+U',
// //                     template: itemRenderer
// //                 }
// //             ]
// //         },
// //         {
// //             label: 'Profile',
// //             icon: 'pi pi-star'
// //         },
// //     ];

// //     const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

// //     // Center Container
// //     const center = (
// //         <div className="flex justify-content-center">
// //             <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
// //         </div>
// //     );

// //     const end = (
// //         <div className="flex align-items-center gap-2">
// //             {/* You can include other components or icons here if needed */}
// //         </div>
// //     );

// //     return (
// //         <div className="card">
// //             <Menubar model={items} start={start} end={end}/>
// //             {center}
// //             <Card />
// //         </div>
// //     );
// // }
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Badge } from 'primereact/badge';
// import { Avatar } from 'primereact/avatar';
// import { Dropdown } from 'primereact/dropdown'; // Import Dropdown
// import Card from '../Home/Card';

// export default function TemplateDemo() {
//     const [selectedCriteria, setSelectedCriteria] = useState(null); // State for selected criteria
//     const criteriaOptions = [
//         { name: 'Genre', value: 'genre' },
//         { name: 'Author', value: 'author' },
//         { name: 'Publication Date', value: 'publicationDate' },
//         { name: 'Keyword', value: 'keyword' },
//     ];

//     const itemRenderer = (item) => (
//         <a className="flex align-items-center p-menuitem-link">
//             <span className={item.icon} />
//             <span className="mx-2">{item.label}</span>
//             {item.badge && <Badge className="ml-auto" value={item.badge} />}
//             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//         </a>
//     );

//     const items = [
//         {
//             label: 'Home',
//             icon: 'pi pi-home'
//         },
//         {
//             label: 'Books',
//             icon: 'pi pi-star'
//         },
//         {
//             label: 'Author',
//             icon: 'pi pi-envelope',
//         },
//         {
//             label: 'My Shelves',
//             icon: 'pi pi-search',
//             items: [
//                 {
//                     label: 'Core',
//                     icon: 'pi pi-bolt',
//                     shortcut: '⌘+S',
//                     template: itemRenderer
//                 },
//                 {
//                     label: 'Blocks',
//                     icon: 'pi pi-server',
//                     shortcut: '⌘+B',
//                     template: itemRenderer
//                 },
//                 {
//                     label: 'UI Kit',
//                     icon: 'pi pi-pencil',
//                     shortcut: '⌘+U',
//                     template: itemRenderer
//                 }
//             ]
//         },
//         {
//             label: 'Profile',
//             icon: 'pi pi-star'
//         },
//     ];

//     const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

//     // Center Container
//     const center = (
//         <div className="flex align-items-center gap-2">
//             {/* Dropdown for selecting criteria */}
//             <Dropdown 
//                 value={selectedCriteria} 
//                 onChange={(e) => setSelectedCriteria(e.value)} 
//                 options={criteriaOptions} 
//                 optionLabel="name" 
//                 placeholder="Select Criteria" 
//                 className="w-full md:w-14rem" 
//             />
//             {/* Search Input */}
//             <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
//         </div>
//     );

//     const end = (
//         <div className="flex align-items-center gap-2">
//             {/* You can include other components or icons here if needed */}
//         </div>
//     );

//     return (
//         <div className="card">
//             <Menubar model={items} start={start} end={end}/>
//             {center}
//             <Card />
//         </div>
//     );
// }
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Badge } from 'primereact/badge';
// import { Avatar } from 'primereact/avatar';
// import { Dropdown } from 'primereact/dropdown'; // Import Dropdown
// import Card from '../Home/Card';
// import axios from 'axios'; // Import axios for API calls

// export default function TemplateDemo() {
//     const [selectedCriteria, setSelectedCriteria] = useState(null); // State for selected criteria
//     const [searchKeyword, setSearchKeyword] = useState(''); // State for search input
//     const [books, setBooks] = useState([]); // State for fetched books
//     const apibase = 'http://localhost:3000';
//     const criteriaOptions = [
//         { name: 'Genre', value: 'genre' },
//         { name: 'Author', value: 'author' },
//         { name: 'Publication Date', value: 'publicationDate' },
//         { name: 'Keyword', value: 'keyword' },
//     ];

//     const fetchBooks = async () => {
//         try {
//             let response;
//             const keyword = encodeURIComponent(searchKeyword); // Encode keyword for URL

//             // Determine API endpoint based on selected criteria
//             if (selectedCriteria === 'genre') {
//                 response = await axios.get(`${apibase}/api/books/genre/fiction`);
//             } else if (selectedCriteria === 'author') {
//                 response = await axios.get(`${apibase}/api/books/author/${keyword}`);
//             } else if (selectedCriteria === 'publicationDate') {
//                 response = await axios.get(`${apibase}/api/books/publication-date/${keyword}`);
//             } else if (selectedCriteria === 'keyword') {
//                 response = await axios.get(`${apibase}/api/books/search?keyword=${keyword}`);
//             }

//             // Update state with fetched books
//             if (response && response.data) {
//                 setBooks(response.data);
//                 console.log("books", books, "response.data", response.data);
//             }
//         } catch (error) {
//             console.error('Error fetching books:', error);
//         }
//     };

//     const itemRenderer = (item) => (
//         <a className="flex align-items-center p-menuitem-link">
//             <span className={item.icon} />
//             <span className="mx-2">{item.label}</span>
//             {item.badge && <Badge className="ml-auto" value={item.badge} />}
//             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//         </a>
//     );

//     const items = [
//         {
//             label: 'Home',
//             icon: 'pi pi-home'
//         },
//         {
//             label: 'Books',
//             icon: 'pi pi-star'
//         },
//         {
//             label: 'Author',
//             icon: 'pi pi-envelope',
//         },
//         {
//             label: 'My Shelves',
//             icon: 'pi pi-search',
//             items: [
//                 {
//                     label: 'Core',
//                     icon: 'pi pi-bolt',
//                     shortcut: '⌘+S',
//                     template: itemRenderer
//                 },
//                 {
//                     label: 'Blocks',
//                     icon: 'pi pi-server',
//                     shortcut: '⌘+B',
//                     template: itemRenderer
//                 },
//                 {
//                     label: 'UI Kit',
//                     icon: 'pi pi-pencil',
//                     shortcut: '⌘+U',
//                     template: itemRenderer
//                 }
//             ]
//         },
//         {
//             label: 'Profile',
//             icon: 'pi pi-star'
//         },
//     ];

//     const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

//     // Center Container
//     const center = (
//         <div className="flex align-items-center gap-2">
//             {/* Dropdown for selecting criteria */}
//             <Dropdown
//                 value={selectedCriteria}
//                 onChange={(e) => setSelectedCriteria(e.value)}
//                 options={criteriaOptions}
//                 optionLabel="name"
//                 placeholder="Select Criteria"
//                 className="w-full md:w-14rem"
//             />
//             {/* Search Input */}
//             <InputText
//                 placeholder="Search"
//                 type="text"
//                 value={searchKeyword}
//                 onChange={(e) => setSearchKeyword(e.target.value)}
//                 className="w-8rem sm:w-auto"
//             />
//             <button onClick={fetchBooks} className="p-button p-component">
//                 <span className="p-button-icon p-c pi pi-search"></span>
//                 <span className="p-button-label">Search</span>
//             </button>
//         </div>
//     );

//     const end = (
//         <div className="flex align-items-center gap-2">
//             {/* You can include other components or icons here if needed */}
//         </div>
//     );

//     return (
//         <div className="card">
//             <Menubar model={items} start={start} end={end} />
//             {center}
//             {/* Pass the fetched books to the Card component */}
//             <div>
//                 {books.map(book => (
//                     <Card key={book.id} books={book} />
//                 ))}
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import SearchBar from '../Home/SearchBar';
export default function TemplateDemo() {
   
   

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Books',
            icon: 'pi pi-star'
        },
        {
            label: 'Author',
            icon: 'pi pi-envelope',
        },
        {
            label: 'My Shelves',
            icon: 'pi pi-search',
        },
        {
            label: 'Profile',
            icon: 'pi pi-star'
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    // Center container: Dropdown + Search input
    // const center = (
        
    // );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={<SearchBar/>}/>
            {/* {center} */}
        </div>
    );
}
