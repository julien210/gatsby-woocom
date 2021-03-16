import React from "react"
import { Link } from "gatsby"
import Login from '../components/auth/login'
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    Login de Admin
    < Login />
  
  </Layout>
)

export default IndexPage
