import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Form() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    subject: '',
    message: '',
    mode: '',
    address: '', 
  });
const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (userData.name.length < 2) {
      alert('Name must be at least 2 characters long.');
      return;
    }
else if (! userData.name.match(/^[A-Za-z ]+$/)){
		alert("Name must not contain special characters");
		return;
	}
    try{
      Axios.post('https://contact-form-fmomqe7cp-2021niyatigaonkar-vesacin.vercel.app/sendmail',{
        email:userData.email,
        subject:userData.subject,
        message:{
          name:`${userData.name}`,
          gender:`${userData.gender}`,
          phone:`${userData.phone}`,
          message:`${userData.message}`
        }
      }).then((response)=>{
        setUserData({
            name: '',
            email: '',
            phone: '',
            dob: '',
            gender: '',
            subject: '',
            message: '',
            mode: '',
            address: '', 
          });
        navigate('/')
    }).catch((err)=>console.log(err));
      alert("Meesage Sent");
    }
    catch(err){
      console.log(err);
    }
  }

  

  
  

  return (
    <>
      <center>
        <h2 style={{ fontSize: '40px', color: '#362e40' }}>Contact Us</h2>
      </center>
      <div className="container"><br />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required /><br /><br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} /><br /><br />

          <label htmlFor="phone">Phone number:</label>
          <div>
            <select id="countryCode" name="countryCode" required>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            &nbsp;<input type='tel' id="phone" name="phone" value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} required />
          </div><br />

          <label htmlFor="gender">Gender:</label>
          <div className="sizee">
            <input type="radio" id="male" name="gender" onClick={(e) => setUserData({ ...userData, gender: 'Male' })} required />
            <label htmlFor="male">Male</label>&nbsp;&nbsp;
            <input type="radio" id="female" name="gender" onClick={(e) => setUserData({ ...userData, gender: 'Female' })} />
            <label htmlFor="female">Female</label>&nbsp;&nbsp;
            <input type="radio" id="other" name="gender" onClick={(e) => setUserData({ ...userData, gender: 'Other' })} /><label htmlFor="other">Other</label>
            &nbsp;&nbsp;
          </div><br />

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" required value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} /><br /><br />

          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} /><br /><br />

          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" required value={userData.subject} onChange={(e) => setUserData({ ...userData, subject: e.target.value })} /><br /><br />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" className='inp' value={userData.message} onChange={(e) => setUserData({ ...userData, message: e.target.value })} required /><br /><br />

          <center>
            <ul className="boxs-container">
              <h4 style={{ textIndent: '0px' }}>How can we contact you?</h4>
              <li><input type="checkbox" id="lc" checked value={userData.lc} onChange={(e) => setUserData({ ...userData, lc: e.target.checked })} /><label style={{ fontSize: '15px' }} htmlFor="lc">Phone</label></li>
              <li><input type="checkbox" id="uc" value={userData.ul} onChange={(e) => setUserData({ ...userData, ul: e.target.checked })} /><label style={{ fontSize: '13px' }} htmlFor="uc">Email</label></li>
              <li><input type="checkbox" id="di" value={userData.di} onChange={(e) => setUserData({ ...userData, di: e.target.checked })} /><label style={{ fontSize: '13px' }} htmlFor="di">Post</label></li>
            </ul><br /><br />
            <button type='submit' id="submit">Submit</button>
          </center>
        </form>
        <br /><br />
      </div>
      <br /><br />
    </>
  );
}

export default Form;
