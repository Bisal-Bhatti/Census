import React, { Fragment, useState } from "react";
import styles from "./RegisterToCensus.module.sass";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import Checkbox from '@mui/material/Checkbox';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RegisterToCensus() {
  const [withFamily, setwithFamily] = useState(false);
  const [cnic, setcnic] = useState();
  const [familyCnic, setfamilyCnic] = useState();
  const [issueDate, setissueDate] = useState();
  const [expireDate, setexpireDate] = useState();
  const [info, setinfo] = useState([]);
  const [infofamily, setinfofamily] = useState([]);
  const [censusmsg, setcensusmsg] = useState();
  const [familyMembers, setfamilyMembers] = useState([]);
  const [id, setId] = useState('');
  console.log('family cnin', infofamily)
  // console.log('cnin',cnic
  // console.log('family info--', infofamily)
  // console.log('infoId--', id)

  // React.useEffect(() => {
  //   infofamily && infofamily?.map((v,i)=>{
  //       console.log("mapInfo",v)
  //   });
  // }, [familyMembers])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userinfo, setUserInfo] = useState({
    languages: [],
    response: [],
  });
  function handleChange(e) {
    const { value, checked } = e.target;
    const { languages } = userinfo;

    // console.log('value--', value, ' checked--', checked);
    if (checked) {
      setfamilyMembers([value, ...familyMembers]);
    } else {
      setfamilyMembers(familyMembers.filter((e) => e !== value));
    }
  }
  function addtoCensus(e) {
    e.preventDefault();
    if (withFamily == true) {
      try {
        axios
          .put(
            `https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/add_to_Census_My_family`,
            {
              NIC: infofamily?.NIC,
              idsAry: familyMembers,
            }
          )
          .then((res) => {
            console.log("checkNic", res);
            if (res.status == 200 && res.data.success == true) {
              setfamilyMembers([]);
              setOpen(true)
            } else {
              setcensusmsg(res.data.msg)
            }
          })
      } catch (error) {
        // setcensusmsg(err.message);
        console.log('error', error)
        setcensusmsg(error)
      }
    } else {
      try {
        axios
          .put(
            `https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/add_to_Census_Myself`,
            {
              NIC: info.NIC,
            }
          )
          .then((res) => {
            console.log("checkResdata", res);
            if (res.status == 200 && res.data.success == true) {
              setOpen(true);
              console.log('census test', res)
            } else {
              setcensusmsg(res.data.msg)
            }
          })
      } catch (error) {
        console.log('error---', error)
        setcensusmsg(error)
      }
    }
  }
  function searchCnic(e) {
    e.preventDefault();
    axios
      .post(
        `https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/get_NIC_Data`,
        {
          NIC: cnic,
          ExpireDate: expireDate,
          IssueDate: issueDate,
        }
      )
      .then((res) => {
        console.log("getNIcData", res);
        // console.log(res.data.personData);
        console.log("familyInfo", infofamily);
        if (withFamily == true) {
          setinfofamily(res?.data?.personData);
          // setId(res.data.personData._id);
          console.log("getNIcData", res.data.personData.familyMembers._id);

        } else {
          setinfo(res.data.personData);
        }
      }).catch((err) => {
        console.log(err.message);
        setcensusmsg(err.message + " (May be CNIC, Issue date or Expiry date are wrong)")
      });
  }
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  console.log("Idinfofamily", infofamily)


  return (
    <Sidebar>
      <div className={styles.register}>
        <h1>Register to Census</h1>
        <div className={styles.btnContainer}>
          <button onClick={() => setwithFamily(false)}>With CNIC</button>
          <button onClick={() => setwithFamily(true)}>Without CNIC</button>
        </div>
        <div className={styles.inputContainer}>
          <TextField
            id="outlined-basic"
            label="Search CNIC"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={(e) => setcnic(e.target.value)}
          />
          <div className={styles.searchInput}>
            <TextField
              id="outlined-basic"
              label="Issue Date"
              variant="outlined"
              sx={{ width: "48%", marginTop: "5px" }}
              onChange={(e) => setissueDate(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Expire Date"
              variant="outlined"
              sx={{ width: "48%", marginTop: "5px" }}
              onChange={(e) => setexpireDate(e.target.value)}
            />
          </div>
          <button onClick={searchCnic} className={styles.searchBtn}>
            Search
          </button>
        </div>
        <div className={styles.container}>
          {withFamily == false ? (
            <Fragment>
              <p>
                <span>Name:</span> {info.Name ? info.Name : "-----"}
              </p>
              <p>
                <span>CNIC:</span> {info.NIC ? info.NIC : "-----"}
              </p>
              <p>
                <span>Issue Date:</span>{" "}
                {info.IssueDate ? info.IssueDate : "-----"}
              </p>
              <p>
                <span>Expiry Date:</span>{" "}
                {info.ExpireDate ? info.ExpireDate : "-----"}
              </p>
              <p>
                <span>Address:</span> {info.Address ? info.Address : "-----"}
                {info.Area ? ", " + info.Area : "-----"}
                {info.City ? ", " + info.City : "-----"}
              </p>
            </Fragment>
          ) : (
            <Fragment>
              <Fragment>
                <p>
                  <span>Name:</span>{" "}
                  {infofamily.Name ? infofamily.Name : "-----"}
                </p>
                <p>
                  <span>CNIC:</span> {infofamily.NIC ? infofamily.NIC : "-----"}
                </p>
                <p>
                  <span>Issue Date:</span>{" "}
                  {infofamily.IssueDate ? infofamily.IssueDate : "-----"}
                </p>
                <p>
                  <span>Expiry Date:</span>{" "}
                  {infofamily.ExpireDate ? infofamily.ExpireDate : "-----"}
                </p>
                <p>
                  <span>Address:</span>{" "}
                  {infofamily.Address ? infofamily.Address : "-----"}{" "}
                  {infofamily.Area ? ", " + infofamily.Area : "-"}{" "}
                  {infofamily.City ? ", " + infofamily.City : "-"}
                </p>
              </Fragment>
              <div className={styles.table}>
                <h3>Dependants</h3>
                <table>
                  <tr>
                    <th>sno</th>
                    <th>Name</th>
                    <th>CNIC</th>
                    <th>Relation</th>
                  </tr>
                  {infofamily?.familyMembers &&
                    infofamily?.familyMembers.map((v, i) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={v._id}
                                id="flexCheckDefault"
                                onChange={handleChange}
                              />
                            </td>
                            <td>{v.Name ? v.Name : "----"}</td>
                            <td>{v.NIC ? v.NIC : "----"}</td>
                            <td>
                              {v.Guardian_Relation
                                ? v.Guardian_Relation
                                : "---"}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </table>
              </div>
            </Fragment>
          )}
          <button onClick={addtoCensus} className={styles.confirmBtn}>
            Confirm
          </button>
        </div>
        <p style={{ color: 'red' }}>{censusmsg}</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welldone !
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Successfully registered in Census
          </Typography>
        </Box>
      </Modal>
    </Sidebar>
  );
}
