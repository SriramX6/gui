import './App.css';
import axios from "axios"
import {useState , useEffect } from "react"



function App() {

const [ state  , setState]  = useState();

// status after entering DB & Collection name 
const [status , setStatus] = useState(null)

// creating DB and Collection
const [formData , setformData] = useState(  
  {DBname : '' ,
collectionName : ''});



// const fetch =  async ()=>{
//   const res = await axios.get("http://127.0.0.1:8080/api/users")
//   // console.log(res.data.users);
//   setState(res.data.users)
// }



// useEffect( () =>{
//   fetch()
// } ,[] )



// const DBname =  async () => {
//   const res = await axios.post("http://127.0.0.1:8080/api/db")
  
// }
const Onsubmit = (e)=>{
e.preventDefault();

if(formData.DBname.trim() === '' || formData.collectionName.trim() === ''){
  alert(' HEYY YO FILL UP ALL FIELDS')
  return;
}

else{

fetch('http://127.0.0.1:8080/api/db' , {
  method : 'POST' ,
  headers :{
    'Content-Type' : 'application/json'
  },
  body : JSON.stringify(formData)
}) 
.then(response => response.json())
.then(data => {
  console.log('success : ' ,  formData);
  setStatus(true)

})
.catch(error =>{
  console.log('error : ' , formData)
});

}
};




const handleChange = (event) => {
  setformData({
    ...formData,
    [event.target.name]: event.target.value
  });
};

  return (
    <div className="App">
      
    {/* {
        state?.map((opt) =>(
      <h1>{opt}</h1>
        )

          )
    } */}

      <div>
      <form  onSubmit={Onsubmit} >
      <label>
          Enter Database-name:
          <input type="text" name="DBname" value={formData.DBname} onChange={handleChange}  />
        </label>
        <label >
        Enter Collection-name:
          <input type="text" name="collectionName" value={formData.collectionName} onChange={handleChange}  />
        </label>
       
      {status &&  <p>{formData.DBname} database created with collection {formData.collectionName} </p> }
    <button type="submit"  >Submit</button>
</form>
      </div>
    </div>
  );
}

export default App;
