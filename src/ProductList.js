const ProductList = ({ products, onAddProduct }) => {
    return (
        <div className="productlist">
            {
                products.map((product) => (
                    <div key={product.productId} className="product">
                        <h2>{product.name}</h2>
                        <img src={product.imageUrl} alt={product.imageUrl} />
                        <p>{product.description}</p>
                        <p className="price">{product.price} €</p>
                        <button onClick={() => onAddProduct(product)}>Add Product to order</button>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductList;