import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL || 'https://fullstack-final-300362878-backend.vercel.app/api/v1/book' || 'http://localhost:5000/api/v1/book';

console.log("BACKEND_URL >> ", import.meta.env.VITE_BACKEND_API_URL);

const Book = (props) => (
    <div className="card-container">
        <img
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
            alt="Books"
            height="200"
        />
        <div className="desc">
            <h2>{ props.bookTitle }</h2>
            <h3>{ props.bookAuthor }</h3>
            <div>
                <p className="float-left">{ props.description }</p>
                <input className="float-right"
                    type="button"
                    value="X"
                    onClick={() => {
                        props.deleteBook(props.keyt);
                    }}
                />
            </div>
            
        </div>
    </div>
);

export default function BooksList() {

    const [books, setBookList] = useState([]);
    useEffect(() => {
        axios.get(BACKEND_URL)
            .then((response) => {
                setBookList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
  
    const deleteBook = (id) => {
        axios.delete(BACKEND_URL + "/" + id)
            .then((response) => {
                setBookList(books.filter((el) => el._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };
  
    return (
        <div className='BookList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Books List</h2>
                    </div>
        
                    <div className='col-md-11'>
                        <Link
                            to='/create'
                            className='btn btn-info float-right'
                        >
                        + Add New Book
                        </Link>
                        <br />
                        <br />
                        <br />
                        <hr />
                    </div>
                </div>       
                <div className="list">
                    {books.map((book) => {
                        return (
                            <Book
                                bookTitle={ book.bookTitle }
                                bookAuthor={ book.bookAuthor }
                                description={ book.description }
                                key={ book._id }
                                keyt={ book._id }
                                deleteBook={ deleteBook }
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
  