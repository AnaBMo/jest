//! products: array de productos. Por defecto, estará vacío.
let products = []; // declaramos una variable products vacía

//! id: id del producto. Cada vez que se añada un producto, se incrementará en 1.
let id = 0; // declaramos una variable id con valor 0

//! * 0 *
//! resetProducts(): reinicia la lista de productos y el id.
function resetProducts()  {
    products = [];
    id = 0
};

//! * 1 *
//! addProduct(name, price): agrega un producto a la lista de productos.
// Esta función recibe dos parámetros: el nombre del producto y el precio. 
// Si alguno de los dos parámetros no está definido, la función lanzará un error. 
// Si el producto ya existe, la función también lanzará un error.
function addProduct(name, price) {
    if (!name || !price) throw new Error('should fail when adding a product with no name or price');
    if (products.find((product) => product.name === name)) {
        throw new Error('should fail when adding a repeated product ');
    }
    const product = { name, price, id: id++ };
    products.push(product);
    return products;
};

//! * 2 *
//! removeProduct(id): elimina un producto de la lista de productos.
// Esta función recibe un parámetro: el id del producto. 
// Si el producto no existe, la función lanzará un error.
function removeProduct(id) {
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error('it seems that the product does not exist');
    };
    products = products.filter((product) => product.id !== id);
    return products;
};

//! * 3 *
//! getProducts(): devuelve todos los productos.
function getProducts() {
    return products;
};

//! * 4 *
//! getProduct(id): devuelve un producto por su id.   
// Esta función recibe un parámetro: el id del producto. 
// Devuelve un objeto con los datos del producto. 
// Si el producto no existe, la función lanzará un error.
function getProduct(id)  {
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error('it seems that the product does not exist');
    }
    return product;
};


//! * 5 *
//! updateProduct(id, name, price): actualiza un producto por su id.
// Esta función recibe tres parámetros: el id del producto, el nombre del producto y el precio del producto. 
// Si el producto no existe, la función lanzará un error. 
// Si el nombre o el precio no están definidos, la función actualizará el producto con los datos que sí estén definidos.
function updateProduct(id, name, price)  {
    const product = products.find((product) => product.id === id);
    if (!product) {
        throw new Error('it seems that the product does not exist');
    }
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    return product;
};


module.exports = {
    resetProducts,
    addProduct,
    removeProduct,
    getProducts,
    getProduct,
    updateProduct
};