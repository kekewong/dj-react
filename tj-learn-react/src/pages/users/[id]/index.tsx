'use client'
import { Icon } from '@iconify/react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

interface UserData {
  id: number
  username: string
  name: string
  phoneNo: string
  password: string
  isActive: boolean
}

interface Props {
  params: { id: number }
}

const UserDetailPage = () => {
  const [user, setUser] = useState<UserData>({
    name: '',
    id: 0,
    username: '',
    phoneNo: '',
    isActive: false,
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.checked
    })
  }
  const router = useRouter()

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios
      .put(`http://localhost:5000/api/user`, user)
      .then(resp => {
        alert('Success')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onShowPasswordClick = function () {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (!router.isReady) return

    axios.get<UserData>(`http://localhost:5000/api/user/${router.query.id}`).then(res => setUser(res.data))
  }, [router])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Edit User (ID:' + user.id + ')'} />
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      inputProps={{ readOnly: true }}
                      label='Username'
                      name='username'
                      onChange={handleDataChange}
                      value={user.username}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='text'
                      label='Name'
                      name='name'
                      onChange={handleDataChange}
                      value={user.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type='text'
                      label='Phone No'
                      name='phoneNo'
                      onChange={handleDataChange}
                      value={user.phoneNo}
                    />
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
                    <FormControlLabel
                      label='Checked'
                      control={<Checkbox name='isActive' checked={user.isActive} onChange={handleCheckboxChange} />}
                    />
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
                        Modify
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

export default UserDetailPage
