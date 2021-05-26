import { Schema, model } from "mongoose";

const ComidaSchema = new Schema({
    nombredelplatillo: {
        type: String
    },
    costo: {
        type: Number
    },
    categoria: {
        type: String
    },
    ingredientes: [{
        type: String
    }],
    image: {
        type: String
    },
    create: { 
        type: Date, 
        default: Date.now
    }
});
export default model("Comida", ComidaSchema);