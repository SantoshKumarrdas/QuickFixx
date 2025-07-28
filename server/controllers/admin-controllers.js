const User = require("../models/user-models");
const Contact = require("../models/contact-models")
const getAllUser = async(req,res)=>{
    try {
        const users = await User.find({},{password:0});
        console.log(users);
        if(!users || users.length ===0){
            return res.status(404).json({message:"No Users Found"})
        }
        return res.status(200).json(users)
    res
    } catch (error) {
        next(error)
    }
}

// Contact
const getAllContact = async(req,res)=>{
    try {
        const contact = await Contact.find();
        console.log(contact);
        if(!contact || contact.length ===0){
            return res.status(404).json({message:"No Contact Found"})
        }
        return res.status(200).json(contact)
    res
    } catch (error) {
        next(error)
    }
}

// Delete User By Id
const deleteUserById=async(req,res)=>{
try {
    const id=req.params.id;
    await User.deleteOne({_id:id});
    return res.status(200).json({message:"User delete successfully"})
} catch (error) {
    next(error)
}
}

// Get User By Id
const getUserById=async(req,res)=>{
try {
    const id=req.params.id;
    const data=await User.findOne({_id:id},{password:0});
    return res.status(200).json(data)
} catch (error) {
    next(error)
}
}

// UpdateUserById
const UpdateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUserData=req.body;
        const UpdateData = await User.updateOne({ _id: id }, {$set:updateUserData});
        return res.status(200).json(UpdateData )
    } catch (error) {
        next(error)
    }
}

// DeleteContactById
const deleteContactById=async(req,res)=>{
try {
    const id=req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({message:"Contact delete successfully"})
} catch (error) {
    next(error)
}
}


module.exports={getAllUser,getAllContact,deleteUserById ,getUserById,UpdateUserById,deleteContactById}