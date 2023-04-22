import "./index.css"
import { updateProductQuantity, deleteProductFromOrder } from "./api";
import React, { useState } from 'react';

const OrderProductList = ({ orderProducts, onModifyQuantity, onDeleteProduct }) => {
    return (
        <div className="orderproductlist">
            {
                orderProducts.map((orderProduct) => (
                    <div key={orderProduct.product.productId} className="orderproduct">
                        <img src={orderProduct.product.imageUrl} alt={orderProduct.product.name} />
                        <h2>{orderProduct.product.name}</h2>
                        <p>{orderProduct.product.description}</p>
                        <h2>{orderProduct.product.price}</h2>
                        <select value={orderProduct.quantity} onChange={(event) =>
                            onModifyQuantity(orderProduct.product.productId, event.target.value)}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                        </select>
                        <button onClick={() => onDeleteProduct(orderProduct.product.productId)}>Delete</button>
                    </div>
                ))
            }
        </div>
    );
}

export default OrderProductList;