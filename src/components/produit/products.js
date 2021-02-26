import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from '../menu/appBar'
import Paper from '@material-ui/core/Paper';
import {  useStaticQuery, graphql } from "gatsby"
import { useForm } from "react-hook-form"
import Box from '@material-ui/core/Box'
import Login from '../auth/login'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 200,
    width: 150, 
    textAlign: 'center',
    backgroundColor: 'gray',
  },
  control: {
    padding: theme.spacing(2),
  },
}));


const email = localStorage.getItem('userEmail');
const authorId =localStorage.getItem('userId');   
const userNiceName = localStorage.getItem('userNiceName')
const token = localStorage.getItem('userToken')

export default function SpacingGrid() {

  const { register, handleSubmit, watch, errors } = useForm();  
  
const onSubmit = data => {
  let formData= {
      post_id: 5,
       author_email: email,
       author_name: userNiceName,
       date : new Date(),
       status: 'publish',
      content : data.content,
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


  const  categories =  useStaticQuery( graphql`
{
    category:   allWpProductCategory {
            nodes {
              databaseId
              name
              image {
                  slug
                  databaseId
                  srcSet
          
              }
            }
        }
    produit:  allWpProduct {
              nodes {
                id
                name
                sku
                averageRating
                reviewCount
                image {
                  altText
                  databaseId
                  sourceUrl
                  srcSet
                }
              }
          }
image:     imageSharp(fluid: {src: {eq: ""}}) {
            id
            fluid {
              ...GatsbyImageSharpFluid
            }
}
}`)


  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
      <>
        <Grid container justify="center" spacing={spacing}>
          {categories.category.nodes.map(node=>
            <Grid key={node.databaseId} item>
              <Paper className={classes.paper} >
              <p>{node.name}</p>
              {node.image !== null &&(
                <img srcset={node.image.srcSet} alt='' width='80%' />)
              }  
              </Paper>
            </Grid>
          )}
        </Grid>
        <Grid container justify="center" spacing={spacing}>
        {categories.produit.nodes.map(node=>{
          return(
            <>
            <p>{node.id}</p>
            <p>{node.name}</p>
            </>
          )}
        )}
        </Grid>
        <p>post commentaires</p>
        <div>
      <Box m ={20}>

        {/* <img src={k.pageContext.k.featuredImage.srcSet} alt=''/> */}
      
        
  {/* ..........FORM.................        */}
        <h1>Laisser un commentaire </h1>
        <Login />
        <h2>Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont indiqués avec *</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input name="nickName"  ref={register} />
        <textarea name="content" ref={register({ required: true })} />
        {errors.content && <span>This field is required</span>}
        {/* {(token && username) !== null &&(<input type="submit" />)} */}
        <input type="submit" />   
        </form>  
      </Box>
    </div>
      </>
        );
}