import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Cardsdata } from './CardsData.js';
import './style.css';
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action.js";
// import { useState } from "react";
const Cards = () => {
    // const [data, setData] = useState(Cardsdata);
    const dispatch = useDispatch();
    const send = (value)=>{
        dispatch(ADD(value))
    };
    return (<>
        <div className="container mt-3">
            <h2 className="text-center">Add To Cart Project</h2>
            <div className="row d-flex justify-content-center align-items-center">
                {
                    Cardsdata.map((value, id) => {
                        return (<>
                            <Card style={{ width: '22rem', border: "none" }} className='mx-2 mt-4 card_style'>
                                <Card.Img variant="top" src={value.imgdata} style={{ height: "16rem" }} className="mt-3" />
                                <Card.Body>
                                    <Card.Title>{value.rname}</Card.Title>
                                    <Card.Text>
                                        Price : ₹ {value.price}
                                    </Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button variant="primary" className="col-lg-12" onClick={()=>send(value)}>Add to Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>);
                    })
                }
            </div>
        </div>
    </>)
};
export { Cards };