'use client'
import { useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const LoginPage = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const handleSubmit = async (e) => {
            setLoading(true);
            e.preventDefault();
            try {
                  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
                        email, password
                  },{
                        withCredentials: true
                  });
                  console.log(data);
                  toast.success(data.message);
                  setLoading(false);
            } catch (error) {
                  toast.error(error.response.data);
                  setLoading(false);
            }
      }
      return (
            <main>
                  <h1 className="jumbotron p-5 bg-primary text-center square">
                        Register
                  </h1>
                  <div className="container col-md-4 offset-md-4 pb-5">
                        <form onSubmit={handleSubmit}>
                              <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Email"
                                    className="form-control mb-4 p-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                              />
                              <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    className="form-control mb-4 p-3"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                              />
                              <button type="submit" className="btn btn-block btn-primary p-2 w-100"
                              disabled = { !email ||!password ||loading}
                              >
                                    {loading ? <SyncOutlined spin /> : "Submit"}
                              </button>
                              <p className="text-center p-3">
                                    Didn't have an account? <Link href="/register"><u>Register</u></Link>
                              </p>
                        </form>
                  </div>
            </main>
      )
}

export default LoginPage