import { useEffect, useState } from "react";
import OrderProductList from "../OrderProductList";
import { deleteProductFromOrder, fetchOrderProducts, updateProductQuantity } from "../api";
import MyForm from "../MyForm";
import Modal from "react-modal"

const Cart = (props) => {
    const orderId = localStorage.getItem('orderId');
    const [orderProducts, setOrderProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const getOrderProducts = async () => {
        const data = await fetchOrderProducts(orderId);
        setOrderProducts(data);
    }

    useEffect(() => {
        getOrderProducts();
    }, [])

    const handleModifyQuantity = async (productId, newQuantity) => {
        const updatedOrderProducts = orderProducts.map(
            orderProduct => {
                if (orderProduct.product.productId === productId) {
                    return {
                        ...orderProduct,
                        quantity: newQuantity
                    };
                }
                return orderProduct;
            }
        )
        setOrderProducts(updatedOrderProducts);
        updateProductQuantity(orderId, productId, newQuantity);
    }

    const handleDeleteProduct = async (productId) => {
        const updatedOrderProducts = orderProducts.filter(orderProduct => {
            return orderProduct.product.productId !== productId
        })
        setOrderProducts(updatedOrderProducts);
        deleteProductFromOrder(orderId, productId);
    }

    const handleButtonClick = () => {
        setShowForm(true);
    }

    const handleCloseModal = () => {
        setShowForm(false);
    }

    return (
        <div>
            <OrderProductList orderProducts={orderProducts}
                onModifyQuantity={handleModifyQuantity} onDeleteProduct={handleDeleteProduct} />
            <button className="complete-order" onClick={handleButtonClick}>Complete Order</button>
            <Modal isOpen={showForm} appElement={document.getElementById('root')}>
                <button onClick={handleCloseModal}>X</button>
                <MyForm orderId={orderId} onSubmit={handleCloseModal} onUpdateOrder={props.onUpdateOrder} />
            </Modal>
        </div>
    );
}

export default Cart;