import Comida from "../models/Comida";
import fs from "fs";
import path from "path"

export const createComida = async (req, res) => {
    try {
        const json = req.body;
        const nuevaReceta = new Comida(json);
        await nuevaReceta.save((error, receta) => {
            if (error) {
                return res
                    .status(404)
                    .send({ mensaje: "hay un problema al agregar el platillo" + error});
            }

            return res.status(200).send({ data: receta });
        });
    } catch (error) {
        console.error(error);
    }
};

export const getComida = async (req, res) => {
    try {
        await Comida.find({})
            .exec()
            .then(data => {
                return res.status(200).send({ res: data });
            })
            .catch(error => {
                return res.status(404).send({ error: "No has podido acceder a la informacion" + error });
            });
    } catch (error) {
        console.error(error);
    }
};

export const savedImage = async (req, res) => {
    try {
        let id = req.params.id;
        let image = req.files.image;
        let pathImage = image.path;

        var pathTemp = pathImage.split("/");
        let nombreImage = pathTemp[1];
        // return res.send({ message: nombreimg });
        await Comida.findByIdAndUpdate({ _id: id }, { image: nombreImage }, { new: true }, (err, projectUpdated) => {
            if (err)
                return res.status(500).send({ message: "No se pudo subir la imagen" });
            if (!projectUpdated)
                return res.status(404).send({ message: "No se pudo encontrar la imagen" });
            return res
                .status(200)
                .send({ message: "La imagen del platillo fue cargada con exito" });
        }
        );
    } catch (error) {
        console.error(error);
    }
};

export const getImage = async (req, res) => {
    try {
        const archivoImg = req.params.nomimage;

        const pathFile = "./uploads/" + archivoImg;

        fs.access(pathFile, fs.F_OK, err => {
            if (err) {
                return res.status(500).send({ message: "La imagen que intentas buscar no se encuentra" });
            } else {
                return res.sendFile(path.resolve(pathFile));
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const deleteComida = async (req, res) => {
    try {
        let id = req.params.id;

        await Comida.findByIdAndDelete({ _id: id }, (err, comida) => {
            const pathFile = "./uploads/" + comida.image;

            fs.access(pathFile, fs.F_OK, err => {
                if (err) {
                    console.log("no encontre la imagen");
                    return res.status(203).send({ message: comida  + "El platillo se borro pero no encontro la imagen para eliminarla"});
                } else {
                    console.log("la encontre");
                    fs.unlink(pathFile, (err) => {
                        console.log("lo elimine");
                    });
                    return res.status(202).send({ message: comida + "El platillo de borro con exito" });
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
};