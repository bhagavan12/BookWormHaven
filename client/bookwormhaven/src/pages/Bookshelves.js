// import axios from 'axios';
// import React,{useEffect, useState} from 'react';
// import { useSelector } from 'react-redux';

// export default function Bookshelves() {
//     const readerId = useSelector((state) => state.user.user.id);
//     const base="http://localhost:3000/api/bookshelves";
//     const [bookshelves,setBookshelves]=useState([]);
//     useEffect(()=>{
//         const bookres=async()=>{
//               await axios.get(`${base}/${readerId}`)
//               .then((res)=>{
//                   if(res.data.length>0){
//                       setBookshelves(res.data);
//                       console.log(res.data);
//                   }
//               }).catch((err)=>{
//                   console.log("err",err);
//               })

//         }
//         bookres();
//     },[]);
//     return (
//         <div>
//             {bookshelves && (
//                 bookshelves?.map((bookshelve)=>{
//                     <li key={bookshelve.id} className='cardd'>
//                         <h2>{bookshelve.name}</h2>
//                     </li>
//                 })
//             )}
//         </div>
//     )
// }

// src/pages/BookshelfPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookshelves, createBookshelf, deleteBookshelf } from '../features/bookshelfSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import '../Styling/Bookshelves.css';
import { useNavigate } from 'react-router-dom';
const BookshelfPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user); // Fetch user info from userSlice
    const { bookshelves } = useSelector((state) => state.bookshelves);
    const [visible, setVisible] = useState(false);
    const [newShelf, setNewShelf] = useState({
        name: '',
        description: '',
    });

    const navigate = useNavigate();
    // Fetch bookshelves when the component mounts
    useEffect(() => {
        if (user.id) {
            dispatch(fetchBookshelves(user.id));
        }
    }, [dispatch, user.id]);

    // Handle form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewShelf({ ...newShelf, [name]: value });
    };

    // Handle creating a new bookshelf
    const handleCreateBookshelf = (e) => {
        e.preventDefault();
        if (newShelf.name) {
            dispatch(createBookshelf({ userId: user.id, ...newShelf }));
            setNewShelf({ name: '', description: '' });
            setVisible(false);
        }
    };

    // Handle deleting a bookshelf
    const handleDeleteBookshelf = (id) => {
        dispatch(deleteBookshelf(id));
    };
    const handleNavigation = (id,shelfname) => {
        navigate(`/shelvesbooks/${id}/${shelfname}`); 
    }
    return (
        <div className="bookshelf-page">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 icon="pi pi-times">{user.username}'s Bookshelves<i className="pi pi-bookmark-fill" style={{ fontSize: '1.5rem' }}></i></h2>

                {/* Button to open modal */}
                <Button label="Create Bookshelf" icon="pi pi-plus" onClick={() => setVisible(true)} />
            </div>
            {/* Display existing bookshelves */}
            <Dialog
                header="Create a New Bookshelf"
                visible={visible}
                style={{ width: '50vw' }}
                onHide={() => setVisible(false)}
            >
                <form onSubmit={handleCreateBookshelf}>
                    <div>
                        <label htmlFor="name">Bookshelf Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newShelf.name}
                            onChange={handleInputChange}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={newShelf.description}
                            onChange={handleInputChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                        />
                    </div>
                    <Button type="submit" label="Create" icon="pi pi-check" className="p-button-success" />
                </form>
            </Dialog>
            <div className="bookshelf-list">
                {bookshelves && bookshelves.length > 0 ? (
                    bookshelves.map((shelf) => (
                        <div key={shelf.id} className="bookshelf-item">
                            <h3 id="bstitle">{shelf.name}<i className="pi pi-bookmark-fill" style={{ fontSize: '1rem' }}></i></h3>
                            <hr />
                            <p>{shelf.description}</p>
                            <Button icon="pi pi-times" size="small" severity="danger" style={{ width: "fit-content", padding: "5px" }} onClick={() => handleDeleteBookshelf(shelf.id)} label='Delete' text ></Button>
                            <Button size="small" style={{ width: "fit-content", padding: "5px", marginLeft: "1px" }} onClick={() => handleNavigation(shelf.id,shelf.name)} label='Open' text></Button>
                        </div>
                    ))
                ) : (
                    <p>No bookshelves created yet.</p>
                )}
            </div>

            {/* Form to create a new bookshelf
            <div className="create-bookshelf-form">
                <h3>Create a New Bookshelf</h3>
                <form onSubmit={handleCreateBookshelf}>
                    <div>
                        <label htmlFor="name">Bookshelf Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={newShelf.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            name="description"
                            value={newShelf.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div> */}
        </div>
    );
};

export default BookshelfPage;
