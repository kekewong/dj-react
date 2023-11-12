import { Icon } from '@iconify/react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import { id } from 'date-fns/locale'
import React, { useState } from 'react'

const AddUserPage = () => {
  const [data, setData] = useState({
    username: '',
    name: '',
    phoneNo: '',
    password: ''
  })
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const [showPassword, setShowPassword] = useState(false)

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onShowPasswordClick = function () {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios
      .post(`${baseApiUrl}/user`, data)
      .then(resp => {
        alert('Success')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Add User' />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth label='Username' name='username' onChange={handleDataChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type='text' label='Name' name='name' onChange={handleDataChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type='text' label='Phone No' name='phoneNo' onChange={handleDataChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='password'>Password</InputLabel>
                      <OutlinedInput
                        label='Password'
                        name='password'
                        id='password'
                        onChange={handleDataChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={onShowPasswordClick}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>Use 8 or more characters with a mix of letters, numbers & symbols</FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Button type='submit' variant='contained' size='large'>
                        Create
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default AddUserPage
