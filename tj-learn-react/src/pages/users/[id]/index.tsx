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
import { Box, getValue } from '@mui/system'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

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
  const { register, reset, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      name: '',
      id: 0,
      username: '',
      phoneNo: '',
      isActive: false,
      password: ''
    }
  })
  const [isActive, setIsActive] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const router = useRouter()

  const onSubmit = (data: FieldValues) => {
    axios
      .put(`${baseApiUrl}/user`, data)
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

    axios.get<UserData>(`${baseApiUrl}/user/${router.query.id}`).then(res => {
      reset(res.data)
      setIsActive(res.data.isActive)
    })
  }, [router, baseApiUrl, reset])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={'Edit User (ID:' + getValues('id') + ')'} />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      {...register('username')}
                      inputProps={{ readOnly: true }}
                      name='username'
                      label='username'
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      {...register('name')}
                      type='text'
                      label='Name'
                      name='name'
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      {...register('phoneNo')}
                      type='text'
                      label='Phone No'
                      name='phoneNo'
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='password'>Password</InputLabel>
                      <OutlinedInput
                        {...register('password')}
                        label='Password'
                        name='password'
                        id='password'
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
                      control={
                        <Checkbox
                          name='isActive'
                          checked={isActive}
                          onChange={e => {
                            setValue('isActive', e.target.checked ? true : false)
                            setIsActive(!isActive)
                          }}
                        />
                      }
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
