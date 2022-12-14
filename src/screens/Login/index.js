import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import styles from "./Login.module.sass";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
export default function Login() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [err, seterr] = useState();
  const[typeAdmin, setTypeAdmin] = useState('Admin');
  const[typeAgent, setTypeAgent] = useState('');
  const [isAdmin, setIsadmin] = useState(true);
  console.log("Type1", typeAdmin);
  console.log("Type2", typeAgent);
  const navigate = useNavigate();
  function loginAdmin(e) {
    e.preventDefault();
    axios
      .post(
        `https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/adminLogin`,
        {
          email: email,
          password: password,
          role: typeAdmin
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log(res);
          localStorage.clear();
          localStorage.setItem("role", res?.data?.adminData[0]?.role);
          localStorage.setItem("token", res?.data?.adminData[1]?.Token);
          navigate("/home");
        } else {
          console.log("wrongggg----");
          seterr("Wrong credentials ", res.msg);
        }
      })
      .catch((err) => {
        console.log(err.message);
        seterr(err.message + " (may be credentials are wrong)");
      });
  }
  function loginAgent(e) {
    e.preventDefault();
    axios
      .post(
        `https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/adminLogin`,
        {
          email: email,
          password: password,
          role: typeAgent
        }
      )
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          // console.log(res.data.userData.findUser.role);
          localStorage.clear();
          localStorage.setItem("role", res?.data?.adminData[0]?.role);
          navigate("/home");
        } else {
          console.log("wrongggg----");
          seterr("Wrong credentials ", res.msg);
        }
      })
      .catch((err) => {
        console.log(err.message);
        seterr(err.message + " (may be credentials are wrong)");
      });
  }

  const getRoleAdmin= () => {
    setTypeAdmin('Admin');
    setTypeAgent();
  }

  const getRoleAgent= () => {
    setTypeAgent('Agent');
    setTypeAdmin();
  }


  return (
    <div className={styles.whole}>
      <div className={styles.container}>
        <h1>Login as {isAdmin ? "Admin" : "Agent"}</h1>
        <div className={styles.btn}>
          <button
            onClick={() => {setIsadmin(true); getRoleAdmin()}}
            style={
              isAdmin ? { backgroundColor: "#468f74", color: "white" } : null
            }
          >
            As Admin
          </button>
          <button
            onClick={() => {setIsadmin(false); getRoleAgent();}}
            style={
              isAdmin ? null : { backgroundColor: "#468f74", color: "white" }
            }
          >
            As Agent
          </button>
        </div>
        <div className={styles.input}>
          {isAdmin ? (
            <>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: "48%" }}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                sx={{ width: "48%" }}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button onClick={loginAdmin}>
                <img src="./right-arrow.png" />
              </button>
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: "48%" }}
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                sx={{ width: "48%" }}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button onClick={loginAgent}>
                <img src="./right-arrow.png" />
              </button>
            </>
          )}
        </div>
        <p style={{ color: "red" }}>{err}</p>
      </div>
    </div>
  );
}
