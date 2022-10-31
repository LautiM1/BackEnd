
class Customers {
    constructor() {
        this.customers = [
            {   
                id: 1,
                name: "Lautaro",
                age: "21",
                picture: "https://image.shutterstock.com/image-vector/user-icon-man-person-people-260nw-1935032822.jpg"
            },
            {
                id: 2,
                name: "Julia",
                age: "21",
                picture: "https://image.shutterstock.com/image-vector/user-icon-man-person-people-260nw-1935032822.jpg"
            },
            {
                id: 3,
                name: "Lara",
                age: "21",
                picture: "https://image.shutterstock.com/image-vector/user-icon-man-person-people-260nw-1935032822.jpg"
            }
        ]

        this.numeroDeClientes = this.customers.length
    }
    addId = (client) => {
        const ultimoItem = this.customers[this.numeroDeClientes - 1]
        const ultimoID= ultimoItem.id
        const siguienteID = ultimoID + 1 
        client.id = siguienteID
        this.customers.push(client)
        this.numeroDeClientes++
    }
    save = async (product) => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                const contenido = await fs.promises.readFile(this.nombreArchivo, "utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    const lastIdAdded = productos.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0);
                    const nuevoProducto = {
                        id: lastIdAdded + 1,
                        ...product
                    }
                    productos.push(nuevoProducto);
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
                } else {
                    const nuevoProducto = {
                        id: 1,
                        ...product
                    }
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([nuevoProducto], null, 2));
                }
            } else {
                const nuevoProducto = {
                    id: 1,
                    ...product
                }
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([nuevoProducto], null, 2));
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById = async (id) => {
        try {
            if (fs.existsSync(this.nombreArchivo)) {
                const contenido = await fs.promises.readFile(this.nombreArchivo)
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item => item.id === id);
                    return producto;
                } else {
                    return "Archivo vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAll = () => {
        return this.customers
    }

    deleteById = async (id) => {
        try {
            const contenido = await fs.promises.readFile(this.nombreArchivo, "utf8");
            const productos = JSON.parse(contenido);
            const nuevoProducto = productos.filter(item => item.id !== id);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(nuevoProducto, null, 2));
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }
    updateById = async (id, body) => {
        try {
            const productos = await this.getAll();
            const productPos = productos.findIndex(elm => elm.id === id);
            productos[productPos] = {
                id: id,
                ...body
            };
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2))
            return productos;
        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = {Customers};