import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { DLT } from "../redux/actions/action";
import { ADD } from "../redux/actions/action";
import { REMOVE } from "../redux/actions/action";
const CardsDetails = () => {
    const [data, setData] = useState([]);
    const getdata = useSelector((state) => state.cartreducer.carts);
    const { id } = useParams();
    const compare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id
        })
        setData(comparedata);
    }
    useEffect(() => {
        compare();
    }, [id])
    const history = useNavigate();
    const dispatch = useDispatch();
    const send = (item)=>{
        dispatch(ADD(item));
    };
    const delOne = (item)=>{
        dispatch(REMOVE(item));
        if(item.qnty === 0){
            history("/")
        }
    };
    const dlt = (id)=>{
        dispatch(DLT(id));
        history("/");
    }
    
    return (<>
        <div className="container mt-2">
            <h2 className="text-center">Items Details Page</h2>
            <section className="container mt-3">
                <div className="iteamsdetails">
                    {
                        data.map((value, key) => {
                            return (<>
                                <div className="items_img">
                                    <img src={value.imgdata} alt="image" />
                                </div>
                                <div className="details">
                                    <Table>
                                        <tr>
                                            <td>
                                                <p><strong>Restaurant</strong> : {value.rname}</p>
                                                <p><strong>Price</strong> : ₹ {value.price}</p>
                                                <p><strong>Dishes</strong> : {value.address}</p>
                                                <p><strong>Total</strong> : ₹ {value.price*value.qnty}</p>
                                                <div className="mt-5 d-flex justify-content-between align-items-center" style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                                                    <span style={{fontSize:24}} onClick={()=>delOne(value)}>-</span>
                                                    <span style={{fontSize:22}}>{value.qnty}</span>
                                                    <span style={{fontSize:24}} onClick={()=>send(value)}>+</span>
                                                </div>
                                            </td>
                                            <td>
                                                <p><strong>Rating : </strong> <span style={{ background: "green", color: "white", padding: "2px 5px", borderRadius: "5px" }}>{value.rating} ★</span></p>
                                                <p><strong>Order Review : </strong> {value.somedata}</p>
                                                <p onClick={()=>dlt(value.id)}><strong>Remove &nbsp;:&nbsp; </strong> <span><i className="fas fa-trash" style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i></span></p>
                                            </td>
                                        </tr>
                                    </Table>
                                </div>
                            </>);
                        })
                    }
                </div>
            </section>
        </div>
    </>);
};
export { CardsDetails };