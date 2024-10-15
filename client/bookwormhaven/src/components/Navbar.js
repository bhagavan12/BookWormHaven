import React from 'react';
import { Menubar } from 'primereact/menubar';
import SearchBar from './SearchBar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch } from 'react-redux'; // Import useDispatch
import { logout } from '../features/userSlice';
export default function TemplateDemo() {
    const navigate = useNavigate(); // Initialize useNavigate
    const dispatch = useDispatch();
    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => navigate('/home') // Navigate to Home
        },
        {
            label: 'Books',
            icon: 'pi pi-book',
            command: () => navigate('/books') // Navigate to Books
        },
        {
            label: 'Author',
            icon: 'pi pi-pencil',
            command: () => navigate('/author') // Navigate to Author
        },
        {
            label: 'My Shelves',
            // icon: 'pi pi-search',
            command: () => navigate('/my-shelves') // Navigate to My Shelves
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => navigate('/profile') // Navigate to Profile
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
                dispatch(logout()); // Dispatch the logout action
                navigate('/login'); // Navigate to login page after logout
            }
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;

    return (
        <div className="card">
            <Menubar model={items} start={start} end={<SearchBar />} />
        </div>
    );
}
