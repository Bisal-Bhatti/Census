import React ,{Fragment,useState} from 'react'
import  styles from './AddData.module.sass'
import Sidebar from '../../components/Sidebar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios'
export default function AddData() {
    const [fname, setFname] = useState()
    const [lname, setlname] = useState()
    const [cnic, setcnic] = useState()
    const [issueDate, setissueDate] = useState()
    const [expireDate, setexpireDate] = useState()
    const [city, setcity] = useState()
    const [area, setarea] = useState()
    const [address, setaddress] = useState()
    const [guardianNic, setguardianNic] = useState()
    const [guardianRelation, setguardianRelation] = useState()
    const [message, setmessage] = useState()
    var data = [
        {
            Name : fname+" "+lname,
            NIC : cnic,
            Address : address,
            IssueDate : issueDate,
            ExpireDate : expireDate,
            City : city,
            Area : area,
            Guardian_NIC : guardianNic,
            Guardian_Relation : guardianRelation,
            
        }
    ]
    console.log(data[0])
    function addCnic (e) {
      e.preventDefault();
        axios.post(`https://census-app-rehanpardesi2018-gmailcom.vercel.app/api/addNyc`, { 
            Name : fname+" "+lname,
            NIC : cnic,
            Address : address,
            IssueDate : issueDate,
            ExpireDate : expireDate,
            City : city,
            Area : area,
            Guardian_NIC : guardianNic,
            Guardian_Relation : guardianRelation,
         })
      .then(res => {
        if(res.status == 200){
          setmessage("Data successfully added!")
        }else{
          setmessage("There is some error, may be CNIC value is incorrect!")
        }
        console.log(res);
        console.log(res.data);
      })
    }
    return (
      <Fragment>
    <Sidebar>
    <Typography sx={{
        fontSize: '40px',
        fontWeight: 'bolder',
        width: '80%',
        maxWidth: '1500px',
        margin: '20px auto',
        textAlign: 'center'
    }}>
        Add Person's Data to <span sx={{color: '#468f74'}}>NADRA</span> Database
    </Typography>
    <Box
    component="form"
    // sx={{
    //   '& > :not(style)': { m: 1, width: '25ch' },
    // }}
    className={styles.container}
    noValidate
    autoComplete="off"
  >
  <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
  <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{width: '48%'}} onChange={(e)=> setFname(e.target.value)}/>
  <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{width: '48%'}} onChange={(e)=> setlname(e.target.value)}/>
  </Box>
  <TextField id="outlined-basic" label="CNIC" variant="outlined" sx={{width: '100%'}} onChange={(e)=> setcnic(e.target.value)}/>
  <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
  <TextField id="outlined-basic" label="Issue Date" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setissueDate(e.target.value)}/>
  <TextField id="outlined-basic" label="Expiry Date" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setexpireDate(e.target.value)}/>
  </Box>
  <TextField id="outlined-basic" label="Address" variant="outlined"  sx={{width: '100%'}} onChange={(e)=> setaddress(e.target.value)}/>
  <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
  <TextField id="outlined-basic" label="Area" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setarea(e.target.value)}/>
  <TextField id="outlined-basic" label="City" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setcity(e.target.value)}/>
  </Box>
  <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
  <TextField id="outlined-basic" label="Guardian CNIC" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setguardianNic(e.target.value)}/>
  <TextField id="outlined-basic" label="Guardian Relation" variant="outlined"  sx={{width: '48%'}} onChange={(e)=> setguardianRelation(e.target.value)}/>
  </Box>
    <button onClick={addCnic}>Add CNIC</button>
    {
      message ? 
      <p style={{
        color: 'red',
        fontWeight: 'bold'
      }}>{message}</p>
      :
      null
    }
  </Box>
    </Sidebar>
    </Fragment>
  )
}
