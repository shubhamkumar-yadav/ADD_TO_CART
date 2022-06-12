import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Badge, Menu } from '@material-ui/core';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/esm/Table";
import {DLT} from '../redux/actions/action.js';
import { useState } from "react";
import { useEffect } from "react";
const Header = () => {
    const getdata = useSelector((state) => state.cartreducer.carts);
    console.log(getdata);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch();
    const dlt = (id)=>{
        dispatch(DLT(id))
    };
    const [price,setPrice] = useState(0);
    const total = ()=>{
        let price = 0;
        getdata.map((value)=>{
            price = (price + value.price*value.qnty)
        })
        setPrice(price);
    };
    useEffect(()=>{
        total()
    },[total]);
    return (<>
        <Navbar bg="dark" variant="dark" style={{ height: "65px" }}>
            <Container>
                <Link to='/' className="text-decoration-none text-light mx-3">Add to Cart</Link>
                <Nav className="me-auto">
                    <Link to='/' className="text-decoration-none text-light">Home</Link>
                </Nav>
                <Badge badgeContent={getdata.length} color="primary"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                </Badge>
            </Container>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                    style: {
                        left: '50%',
                        marginTop: 40,
                    }
                }}
            >
                {
                    getdata.length ?
                        <div className="card_details" style={{ width: "24rem", padding: 10 }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((value, key) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <Link to={`/cart/${value.id}`} onClick={handleClose}>
                                                                <img src={value.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            <p>{value.rname}</p>
                                                            <p>Price : ₹ {value.price}</p>
                                                            <p>Quantity :  {value.qnty}</p>
                                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(value.id)}>
                                                                <i className="fas fa-trash smalltrash"></i>
                                                            </p>
                                                        </td>
                                                        <td className="mt-5">
                                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={()=>dlt(value.id)}><i className="fas fa-trash largetrash"></i></p>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className="text-center">Total : ₹ {price} </p>
                                </tbody>
                            </Table>
                        </div>
                        :
                        <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
                            <i className="fas fa-close smallclose" style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}
                                onClick={handleClose}
                            ></i>
                            <p style={{ fontSize: 22 }}>Your Cart Is Empty</p>
                            <img src="./cart.gif" alt="gif" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
                        </div>

                }
            </Menu>
        </Navbar>
    </>)
};
export { Header };