import User from "../models/users.js"
import { hashPassword , comparePassword } from "../utils/auth.js";
hashPassword
export const register =async (req,res)=>{
      try {
            const {name,email,password} = req.body
            if(!name || !password || password.length < 6 ||!email){
                  return res.status(404).send("All fields are required");
            }

            let userExist = await User.findOne({email}).exec();
            if(userExist){
                  return res.status(400).send("Email already exist");
            }

            const hashedPassword = await hashPassword(password);
            const user = User.create({
                  name,
                  email,
                  password : hashedPassword
            })

            if(!user){
                  return res.status(400).send("Failed to create user")
            }

            return res.status(200).json({
                  message:"User created successfully",
            })

      } catch (error) {
            console.error(error)
            return res.status(400).send("error. Try again");
      }    
}