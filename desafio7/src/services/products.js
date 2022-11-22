import fs from "fs";

export class productsServices {
    constructor(filename){
        this.filename= filename;
    }
    
    async save(object){
        try{
            const data = await fs.promises.readFile(this.filename,"utf-8");
            const parsedData = JSON.parse(data);

            const dataIndex = parsedData.products.length;
            const newId = parsedData.products[dataIndex - 1].id;

            const timestamp = Date.now();

            const newObject = {id: newId + 1, timestamp_prod:timestamp, ...object};
            parsedData.products.push(newObject);

            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(parsedData, null, 2)
            );
            console.log("product saved successfully");
        } catch (error) {
            console.error(error);
          }
    }

    async getById(id){
        try{
            const data = await fs.promises.readFile(this.filename,"utf-8");
            const parseData = JSON.parse(data);
            const findData= parseData.products.find(item=>item.id === id);
            return findData;
        }  catch (error) {
            console.error(error);
          }

    }
    
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.filename, "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.products;
        }   catch (error) {
            console.error(error);
          }
    }
    async updateById(id, object){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parsedData = JSON.parse(data);

            const findData = parsedData.products.find(item=>item.id === id);
            const timestamp = Date.now();

            const newObject = {
                id: findData.id,
                timestamp_prod: timestamp,
                ...object,
            };

            parsedData.products.splice(findData.id -1, 1);

            parsedData.products.push(newObject);

            parsedData.products.sort((item_a, item_b)=>item_a.id - item_b.id);
            await fs.promises.writeFile(
                this.filename,
                JSON.stringify(parsedData,null,2)
            );
            console.log("product updated successfully");
        }   catch (error) {
            console.error(error);
          }
    }

    async deleteCartById(id){
        try{
            const data = await fs.promises.readFile(this.fileDir, "utf-8");
            const parseData = JSON.parse(data);

            const newData = parseData.products.filter(item=>item.id !== id);

            await fs.promises.writeFile(
                this.filename,
                `{"products": ${JSON.stringify(newData, null, 2)}}`
            );
            console.log(`product ${id} deleted successfully`);
        }   catch (error) {
            console.error(error);
          }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.filename, `{"products":[]}`)
            console.log("product deleted successufully");
        }   catch (error) {
            console.error(error);
          }
    }
}

export const Products = new productsServices("./src/json/products.json")
