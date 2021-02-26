import React from 'react'
import Box from '@material-ui/core/Box'
import Img from 'gatsby-image'
import {  useStaticQuery, graphql } from "gatsby"
import { useForm } from "react-hook-form";


// const email = localStorage.getItem('userEmail');  
// const userNiceName = localStorage.getItem('userNiceName')
// const token = localStorage.getItem('userToken')

let  email , userNiceName , token 


export default function (k) {


const { register, handleSubmit, watch, errors } = useForm();  
const  commentaires =  useStaticQuery( graphql`
{
    com :   allWpComment {
            nodes {
                id
                date
                content
            }
        }
    }
`)

    // console.log(typeof(k.pageContext.k.databaseId));
    console.log(commentaires)
    
const onSubmit = data => {
    if (typeof window !== 'undefined'){
        email = localStorage.getItem('userEmail');  
        userNiceName = localStorage.getItem('userNiceName')
        token = localStorage.getItem('userToken')
    }

    let formData= {
        post:  k.pageContext.k.databaseId,
        author_email: email,
        author_name: userNiceName,
        date : new Date(),
        content : data.content,
        // status: 'publish',
    }
    console.log(formData)
    const fetchData = async () => {
        const result = await fetch(`https:teshrd.tk/wp-json/wp/v2/comments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify( formData)
            })
        .then(res => res.json())
        return result
    }
     fetchData();
  }
  

    return (

      <Box m ={20}>
         <h1>Laisser un commentaire ......... {k.pageContext.name}</h1>
         <p>{k.pageContext.reviewCount}</p>


        <form onSubmit={handleSubmit(onSubmit)}>
        <input name="nickName"  ref={register} />
        <textarea name="content" ref={register({ required: true })} />
        {errors.content && <span>This field is required</span>}
        {/* {(token && username) !== null &&(<input type="submit" />)} */}
        <input type="submit" />   
        </form>  

      </Box>
    )
}
