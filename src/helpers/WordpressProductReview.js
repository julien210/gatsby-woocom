import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
//import im from '../images/gatsby-astronaut.png'
import drawerImage from '../nereus-assets/img/bg/pattern1.png';
import Box from '@material-ui/core/Box';
//import Container from '@material-ui/core/Container';
import  CustomizedRating from '../components/pricing/rating'
import Divider from '@material-ui/core/Divider';
//import {  useStaticQuery, graphql } from "gatsby"
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '1rem',
    margin: 'auto',
    maxWidth: 600,
    backgroundColor:'transparent',
  },
  paperMiddle: {
    padding: '1rem',
    margin: 'auto',
    marginTop: '2rem',
    maxWidth: 600,
    backgroundColor:'white',
  },
  image: {
    width: '128',
    height: '128',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  drawerPaper: {
    backgroundImage: 'url(' + drawerImage + ')',
    marginBottom: '4rem',
  },
  cardHeader: {
    paddingTop: theme.spacing(3),
  },
  form: {
    maxWidth: 500 ,
    margin: '0 auto',
  },
  input: {
    display: 'block',
    boxsizing: 'borderBox',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid pink',
    padding: '10px 15px',
    marginBottom: '10px',
    fontSize: '14px'
  },
  button: {
    background: '#ec5990',
    color: 'white',
    textTransform: 'uppercase',
    border: 'none',
    marginTop: '40px',
    padding: '20px',
    fontSize: '16px',
    fontWeight: '100',
    letterSpacing: '10px'
  }, 
  price: {
    color: 'orange',
    fontSize: '1.8rem',
  }
}));

export default function (k) {

console.log(k);
const { register, handleSubmit, watch, errors } = useForm();  

let  email , userNicename , token      

const handleclickImage=(e)=>{
    console.log(e.currenTarget);
}

const onSubmit = data => {
  if (typeof window !== 'undefined'){
      email = localStorage.getItem('userEmail');  
      userNicename = localStorage.getItem('userNicename')
      token = localStorage.getItem('userToken')
  }

  let formData= {
      post:  k.pageContext.k.databaseId,
      author_email: email,
      author_name: userNicename,
      date : new Date(),
      content : data.content,
      // status: 'publish',  
  }
  console.log(formData)
  const fetchData = async () => {
      const result = await fetch(`https://portaildemo69.000webhostapp.com/wp-json/wp/v2/comments/`, {
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


  const classes = useStyles();

  return (
    <section className={classes.drawerPaper}>
      <Box p={6} textAlign="center">
            <Typography variant="overline" color="textSecondary">gatsby  wordpress woocommerce le Combo gagnant </Typography>
            <Typography variant="h3" component="h2" gutterBottom={true}>
            </Typography>
            <Typography variant="h4" color="primary" paragraph={true}>
            Une Histoire de Chats !
            </Typography>
      </Box>

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image} onClick={handleclickImage}>
              <img className={classes.img} alt="complex" 
              src= {k.pageContext.k.image.guid}
              />
            </ButtonBase>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paperMiddle}>
        <Grid container spacing={2}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                sku : {k.pageContext.k.sku}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: 1030114
              </Typography>
            </Grid>
          </Grid>
          <Typography className={classes.price} variant="subtitle1" color="secondary">
              $19.00
          </Typography>
        </Grid>
        <Divider />
        <Box p={3} textAlign="center">
          <Button variant="contained" color="secondary">
            panier
          </Button>
          <Typography variant="body2" gutterBottom style={{marginTop:'1rem'}}>
            {k.pageContext.k.image.slug}
          </Typography>
          <CustomizedRating />
        </Box>
      </Paper>
    </div>
    <Paper className={classes.paper} style={{marginTop :'1rem'}}>
    <Typography variant="body2" gutterBottom style={{color: 'orange',    fontStyle: 'italic'}}>
     {k.pageContext.name} ... Des Suggestions ?
    </Typography>
    {/* <p>{k.pageContext.reviewCount}</p> */}
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <input className={classes.input}name="nickName"  ref={register} placeholder='email'/>
      <textarea className={classes.input} name="content" ref={register({ required: true })} placeholder='commmentaires'/>
      {errors.content && <span>This field is required</span>}
      {/* {(token && username) !== null &&(<input type="submit" />)} */}
      <input  className={classes.button} type="submit" />   
    </form>  
    </Paper>
  </section>
  );
}


