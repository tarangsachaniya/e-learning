import User from "../models/users.js"
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/auth.js";
export const register = async (req, res) => {
      try {
            const { name, email, password } = req.body
            if (!name || !password || password.length < 6 || !email) {
                  return res.status(404).send("All fields are required");
            }

            let userExist = await User.findOne({ email }).exec();
            if (userExist) {
                  return res.status(400).send("Email already exist");
            }

            const hashedPassword = await hashPassword(password);
            const user = User.create({
                  name,
                  email,
                  password: hashedPassword
            })

            if (!user) {
                  return res.status(400).send("Failed to create user")
            }

            return res.status(200).json({
                  message: "User created successfully",
            })

      } catch (error) {
            console.error(error)
            return res.status(400).send("error. Try again");
      }
}
export const login = async (req, res) => {
      try {
          const { email, password } = req.body;
  
          if (!email || !password) {
              return res.status(400).send("All fields are required");
          }
  
          const UserData = await User.findOne({ email }).exec();
          
          if (!UserData) {
              return res.status(401).send("Invalid email");
          }
  
          const match = await comparePassword(password, UserData.password);
          
          if (!match) {
              return res.status(401).send("Invalid password");
          }
  
          const token = jwt.sign({ _id: UserData._id }, process.env.JWT_SECRET, {
              expiresIn: "7d"
          });
  
          UserData.password = undefined; // Ensure the password is not returned
  
          res.cookie("token", token, {
              httpOnly: true,
          });
  
          return res.status(200).json({
              data: UserData,
              message: "Logged in successfully"
          });
  
      } catch (error) {
          return res.status(500).send("An error occurred during login");
      }
  };