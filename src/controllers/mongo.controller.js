import { response } from "../helpers/response.js";
import { mongoModel } from "../models/mongo.model.js";

const mongoCtrl={}

mongoCtrl.listar=async(req,res)=>{
    try {
        const registros=await mongoModel.find()
        response(res,200,true,registros,"lista de registros")
        
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}

mongoCtrl.crear=async(req,res)=>{
    try {
        const nuevoRegistro=await mongoModel.create(req.body)
        response(res,201,true,nuevoRegistro,"registro creado")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


mongoCtrl.listarPorId=async(req,res)=>{
    try {
        const {id}=req.params
        const registro=await mongoModel.findById(id)
        if(!registro){
            return response(res,404,false,"","registro no encontrado")
        }
        response(res,200,true,registro,"registro encontrado")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


mongoCtrl.eliminar=async(req,res)=>{
    try {
        const {id}=req.params
        const registro=await mongoModel.findById(id)
        if(!registro){
            return response(res,404,false,"","registro no encontrado")
        }
        await registro.deleteOne()
        response(res,200,true,"","registro eliminado")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}


mongoCtrl.actualizar=async(req,res)=>{
    try {
        const {id}=req.params
        const registro=await mongoModel.findById(id)
        if(!registro){
            return response(res,404,false,"","registro no encontrado")
        }
        await registro.updateOne({...req.body, school:{...registro.school, ...req.body.school}})
        response(res,200,true,"","registro actualizado")
    } catch (error) {
        response(res,500,false,"",error.message)
    }
}

export default mongoCtrl