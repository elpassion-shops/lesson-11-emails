import { Card, CardContent, TextField, CardActions, Button, Container, Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const[email, setEmail] = useState<string>("")

  return (
    <Container maxWidth="sm" style={{marginTop: '16px'}}>
    <Card sx={{ minWidth: 275 }} >
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      > 
    <CardContent>
    <TextField fullWidth label="e-mail" id="fullWidth" />
    </CardContent>
    </Box>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
    <Button variant="contained" disableElevation>
      Submit
    </Button>
       </Box>
  </Card>
  </Container>

  )
}

export default Home
