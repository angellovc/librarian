import './main.css'
import { Col, Row } from "react-materialize";
import BookCard from "../../book/BookCard";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadBooksMiddleware } from '../../../actions/bookActions';
import { useSelector } from 'react-redux';
import { Book } from '../../../types/bookTypes';
import Placeholder from './Placeholder';


const Main = () => {

    const {books} = useSelector((state:any) => state.book);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadBooksMiddleware());
    }, [dispatch]);

    return (
        <main>
            <Row className="z-depth-1 "  style={{"minHeight": "50vh"}} >
                {
                    books.length === 0?
                    <Placeholder />:
                    books.map((book:Book) =>
                        <Col s={12} m={6} l={4}  key={book.id} >
                            <BookCard id={book.id} title={book.title} author={book.author} cover={book.picture} />
                        </Col>
                    )
                }
            </Row>
        </main>
    )
}

export default Main;