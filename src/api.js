const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/api/products');
    return await response.json();
}

const fetchOrder = async () => {
    const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    return await response.json();
}

const addProductToOrder = async (orderId, productId, quantity) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId + '/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId,
            quantity: quantity
        })
    });
    return await response.json();
}

const deleteProductFromOrder = async (orderId, productId) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId + '/products/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();

}

const updateProductQuantity = async (orderId, productId, quantity) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId +
        '/products/' + productId + '?quantity=' + quantity, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

const fetchOrderProducts = async (orderId) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId + '/products');
    return await response.json();
}

const createCustomer = async (firstName, lastName, email, address) => {
    const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address
        })
    });
    return await response.json();

}

const finishOrder = async (customer, orderId) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            customerId: customer.customerId,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            address: customer.address
        })
    });
    return await response.json();
}

const getOrderById = async (orderId) => {
    const response = await fetch('http://localhost:8080/api/orders/' + orderId);
    if (response.ok) {
        return await response.json();
    }
    else {
        return null;
    }
}


export {
    fetchProducts, fetchOrder, addProductToOrder,
    deleteProductFromOrder, updateProductQuantity,
    fetchOrderProducts, createCustomer, finishOrder,
    getOrderById
};
