import axios from 'axios';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_DB_HOST}/api/authors`);
                setAuthors(response.data);
            } catch (error) {
                console.error("Error fetching the authors:", error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div style={{marginTop:"80px"}}>
            <h1 className='heading'>Authors<i className='pi pi-pencil'></i></h1>
            <div className='alist'>
                {authors && authors.length > 0 ? (
                    authors.map(author => (
                        <Card key={author.id} className='acard'>
                            <h2>{author.name}</h2>
                            <p><strong>Birth Date:</strong> {new Date(author.birth_date).toLocaleDateString()}</p>
                            <p>{author.bio}</p>
                            <Link to={author.wikipedia} className='p-button'>
                                <i className='pi pi-search-plus'></i>
                                Read more
                            </Link>
                        </Card>
                    ))
                ) : (
                    <>
                        <div style={{margin:"10px"}}>
                            <Skeleton height='15em'></Skeleton>
                        </div>
                        <div style={{margin:"10px"}}>
                            <Skeleton height='15em'></Skeleton>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthorsList;
