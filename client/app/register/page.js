'use client'
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "@/context";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      const { state } = useContext(Context);
      const router = useRouter()
      useEffect(() => {
            if (state.user) {
                  router.push('/');
            }
      }, [state.user]);
      const handleSubmit = async (e) => {
            setLoading(true);
            e.preventDefault();

            try {

                  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
                        name, email, password
                  });
                  toast.success(data.message);
                  toast.success("Now go to Login");
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
                                    type="text"
                                    name="name"
                                    placeholder="Enter username"
                                    className="form-control mb-4 p-3"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                              />
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
                                    disabled={!name || !email || !password || loading}
                              >
                                    {loading ? <SyncOutlined spin /> : "Submit"}
                              </button>
                              <p className="text-center p-3">
                                    Already have an account? <Link href="/login"><u>Login</u></Link>
                              </p>
                        </form>
                  </div>
            </main>
      )
}

export default RegisterPage