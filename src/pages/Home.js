import ProductList from "../ProductList";
import { addProductToOrder } from "../api";
const Home = ({ products }) => {
    const orderId = localStorage.getItem('orderId');
    const handleAddProduct = async (product) => {
        addProductToOrder(orderId, product.productId, 1);

    }
    return (
        <ProductList products={products} onAddProduct={handleAddProduct} />
    );
}

export default Home;