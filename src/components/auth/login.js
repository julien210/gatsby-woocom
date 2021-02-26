import { navigate } from 'gatsby';
import React ,{useEffect, useState} from 'react'
import { useForm } from "react-hook-form";


const Login = (props) =>{
const [token, setToken] = useState([])
const [loggedIn , setLoggedIn ] = useState(false)


const onSubmit =  (data) => {
   async  function fetchData  () {
      const  result = await fetch('https://teshrd.tk/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: data.name, password: data.password})
            })
      .then(res =>  res.json())
      .then( data=>{ setToken(data)})
      return result
   }
   fetchData()
}

    const { register, handleSubmit, watch, errors } = useForm();

    console.log(watch("password"))
   //  if (loggedIn || localStorage.getItem('token')) {
   //   if(token !== undefined && typeof window !== 'undefined'){                              //? pour passer le  build
   // if (localStorage.getItem('token')) {   
   // console.log(token)
   //       // return <> {navigate('/'+'postsAdmin')}</>                                        //  voila
   //       return<>{console.log('token?')}</>
   //  }else{

    return (
         <>
            {console.log(token)}
            {(token.token !== null && typeof window !== 'undefined') ? (localStorage.setItem('userNiceName', token.user_nicename ) ,
                                     localStorage.setItem('userToken', token.token ),
                                     localStorage.setItem('userEmail', token.user_email))
                                    :'' }
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue="admin" ref={register} />
            <input name="password" ref={register({ required: true })} />
            {errors.password && <span>This field is required</span>}
            <input type="submit" />
         </form>
        
      </>
      );
 //  }
}

export default Login