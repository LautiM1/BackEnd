
import fs from"fs";
import path from"path";

export class cartServices{
    constructor(filename){
        this.filename= filename;
    }

    async create(){
        try{
            const data = await fs.promises.readFile(this.filename, "utf-8");
            //parseo json
            const parsedData = JSON.parse(data);
            
            //obtengo id ultimo array
            const dataIndex = parsedData.cart.length;
            const newId = parsedData.cart[dataIndex - 1].id;

            //agrego timestamp
            const timestamp = Date.now();

            //agrego el nuevo objeto con array de producto vacio
            const newObject = {
                id: newId + 1,
                timestamp_prod: timestamp,
                products:[],
            };
            parsedData.cart.push(newObject);

            //sobrescribo archivo con nueva data
            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(parsedData, null, 2)
            );
            console.log("cart saved successfully");
            return newObject;
        } catch(error){
            return console.error(error);
        }
    }

    async getCartById(id){
        try{
            const data = await fs.promises.readFile(this.filename,"utf-8");
            const parsedData = JSON.parse(data)

            const findData = parsedData.cart.find(item=>item.id === id);
            return findData;
        } catch(error){
            console.error(error);
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.cart;
        } catch(error){
            console.error(error);
        }
    }
    async addProductById(id, object){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parsedData = JSON.parse(data);
            console.log(parsedData);

            //encuentro por id
            const findData = parsedData.cart.find(item=>item.id === id);
            //agrego la data al array de productos del cart
            findData.products.push(object);
            console.log(parsedData);

            //sobreescribo archivo con nueva data que incluye al objeto
            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(parsedData,null,2)
            );
            console.log("product added to cart successufully");
        } catch (error){
            console.error(error);
        }
    }

    async deleteCartById(id){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parsedData = JSON.parse(data);
            //filtro por id
            const newData = parsedData.cart.filter(item=>item.id !== id);

            //re escribo el archivo con nuevo array
            await fs.promises.writeFile(
                this.filename,
                `{"cart": ${JSON.stringify(newData, null, 2)}}`   
            );
            console.log(`id ${id} deleted successfully`);
        } catch(error){
            console.log(error);
        }
    }

    async deleteProductById(idCart, idProd){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parseData = JSON.parse(data);
            const findData = parseData.cart.find(item=>item.id=== idCart);
            const findDataId =parseData.cart.findIdex(
                item=>item.id === findData.id
            );

            const findProdId = findData.products.findIdex(
                item=>item.id === idProd
            );
            if (findProdId !== -1){
                findData.products.splice(findProdId, 1);
            }
            //elimino data vieja
            parseData.cart.splice(findDataId, 1);
            //agrego data modificada
            parseData.cart.push(findData);
            console.log(parseData)

            //reescribo el archivo con la nueva data
            await fs.promises.writeFile(
                this.filename,
                `${JSON.stringify(parseData, null, 2)}`
            );
            console.log(`product ${idProd} deleted successfully from cart ${idCart}`);
        } catch(error){
            console.error(error);
        }
    }

}
export const Cart = new cartServices("./src/json/cart.json");