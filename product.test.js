const { addProduct, removeProduct, getProducts, getProduct, updateProduct,  resetProducts} = require('./product');

//! * 1 *
//! Test crear producto 
// reiniciaremos los productos para garantizar la independencia de los test. 
beforeEach(() => {
    resetProducts();
});

// debería agregar un producto.
// debería incrementar el id en 1 cada vez que se añada un producto.
// debería lanzar un error si el nombre o el precio no están definidos.
// debería lanzar un error si el producto ya existe. 
//? If it should pass with deep equality, replace "toBe" with "toStrictEqual" (node.js dice esto en el error)
describe('Add product', () => {
    it('should add a product', () => {
        expect(()=>addProduct('bottle', 1)).not.toThrow(); // no debería lanzar error al tener los dos parámetros
        expect(getProducts()).toStrictEqual([{id:0,name: 'bottle', price: 1}]); // el producto va al array con id 0
        addProduct('glass',3); // añadimos un nuevo producto que debería tener id incrementado asignado
        expect(getProducts()).toStrictEqual([{id:0,name: 'bottle', price: 1},{id:1,name: 'glass', price: 3}]); // lo comprobamos
    });
    it('should fail when adding a repeated product', () => {
        addProduct('bottle', 1); // añadimos el mismo producto para comprobar que no deja repetir
        expect(()=>addProduct('bottle', 1)).toThrow('should fail when adding a repeated product '); 
    });
    it('should fail when adding a product with no name', () => { 
        expect(()=>addProduct(null,3)).toThrow('should fail when adding a product with no name or price'); // error al no poner nombre
    });
    it('should fail when adding a product with no price', () => {
        expect(()=>addProduct('dish',null)).toThrow('should fail when adding a product with no name or price'); // error al no poner precio
    });   
});


//! * 2 *
//! Test eliminar producto
// reiniciaremos los productos para garantizar la independencia de los test. 
beforeEach(() => {
    resetProducts();
});

// debería eliminar un producto
// debería lanzar un error si el producto no existe. 
describe('Remove product', () => {
    it('should remove a product', () => {
        addProduct('fork', 2); // añadimos el rpoducto que vamos a eliminar (id 0)
        expect(getProducts()).toStrictEqual([{id:0,name: 'fork', price: 2}]); 
        expect(()=>removeProduct('knife')).toThrow('it seems that the product does not exist'); // comprobamos que lanza error al poner una id que no existe
        expect(()=>removeProduct(0)).not.toThrow(); // no debería lanzar error cuando el producto sí existe
    });
});


//! * 3 *
//! Test obtener producto
// reiniciaremos los productos para garantizar la independencia de los test. 
beforeEach(() => {
    resetProducts();
});

// debería devolver un producto por su id.
// debería lanzar un error si el producto no existe.
describe('Get product by id', () => {
    it('should get a product', () => {
        addProduct('fork', 2); // añadimos el rpoducto que vamos a recuperar (id 0)
        expect(getProducts()).toEqual([{id:0,name: 'fork', price: 2}]); 
        expect(()=>getProduct(1)).toThrow('it seems that the product does not exist'); // comprobamos que lanza error al poner una id que no existe
        expect(()=>getProduct(0)).not.toThrow();// no debería lanzar error cuando el producto sí existe
    });
});


//! * 4 *
//! Test actualizar producto
// reiniciaremos los productos para garantizar la independencia de los test. 
beforeEach(() => {
    resetProducts();
});

// debería actualizar un producto por su id.
// debería lanzar un error si el producto no existe.
describe('Update product', () => {
    it('should update a product', () => {
        addProduct('fork', 2); // añadimos el rpoducto que vamos a actualizar (id 0)
        expect(getProducts()).toEqual([{id:0,name: 'fork', price: 2}]); 
        updateProduct(0,'knife', 3); // a la id 0 le ponemos otros datos
        expect(getProducts()).toEqual([{id:0,name: 'knife', price: 3}]); // array tras actualización
    });
    it('should fail when updating a product that does not exist', () => {
        expect(()=>updateProduct(0,'fork', 3)).toThrow('it seems that the product does not exist'); // comprobamos que lanza error al poner una id que no existe
    });
    it('should only update the price', () => {
        addProduct('fork', 2); // añadimos un producto para poder actualizarlo
        expect(getProducts()).toEqual([{id:0,name: 'fork', price: 2}]); 
        updateProduct(0,null, 3); // actualizamos el producto
        expect(getProducts()).toEqual([{id:0,name: 'fork', price: 3}]); // array tras actualización
    });
    it('should only update the name', () => {
        addProduct('fork', 2); // añadimos un producto para poder actualizarlo
        expect(getProducts()).toEqual([{id:0,name: 'fork', price: 2}]); 
        updateProduct(0,'knife', null); // actualizamos el producto
        expect(getProducts()).toEqual([{id:0,name: 'knife', price: 2}]); // array tras actualización
    });
});