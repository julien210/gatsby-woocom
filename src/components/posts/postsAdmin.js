import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { RepeatOneSharp } from '@material-ui/icons';

function Post   () {
    let  token
    if (typeof window !== 'undefined'){
        token = localStorage.getItem('userToken')
     }

    const { register, handleSubmit, watch, errors } = useForm();     
    const onSubmit = data => {
        let formData= {
            title   :   'data.title',
            content :   'data.content'
        }   

        const fetchData = async () => {
            console.log(token)
            const result = await fetch('https://portaildemo69.000webhostapp.com/wp-json/wp/v2/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify( formData)
                })
            .then(res => res.json())
            console.log(result)
            return result
        }

       fetchData();


    }
    return (
        <>
        <h1>New Post Admin</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <textarea name="content" ref={register({ required: true })} />
        {errors.content && <span>This field is required</span>}
        <input type="submit" />
        </form>

        </>
    )
}

export default Post
