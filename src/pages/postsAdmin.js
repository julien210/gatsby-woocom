import React from 'react'
import { useForm } from "react-hook-form";

const userNiceName = localStorage.getItem('userNiceName')
const token = localStorage.getItem('userToken')

function Post   () {
    const { register, handleSubmit, watch, errors } = useForm();     
    const onSubmit = data => {
        let formData= {
            title:data.title,
            content : data.content,
            status: "publish"
        }

        const fetchData = async () => {
            const result = await fetch('https://teshrd.tk/wp-json/wp/v2/posts/', {
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
        <input name="title"  ref={register} />
        <textarea name="content" ref={register({ required: true })} />
        {errors.content && <span>This field is required</span>}
        <input type="submit" />
        </form>

        </>
    )
}

export default Post