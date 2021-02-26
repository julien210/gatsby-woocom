import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from '../components/menu/appBar'
import Paper from '@material-ui/core/Paper';
import {  useStaticQuery, graphql } from "gatsby"
import Products from '../components/produit/products'

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

export default function SpacingGrid() {

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
            edges {
              node {
                id
                image {
                  altText
                  databaseId
                  sourceUrl
                  srcSet
                }
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
    <Grid>
    <Products />
    </Grid>
  );
}