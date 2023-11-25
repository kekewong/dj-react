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
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { CreateUserRequestDto, userApiService } from 'src/services/api-services/userApiService'

const AddUserPage = () => {
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const [showPassword, setShowPassword] = useState(false)

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      username: '',
      phoneNo: '',
      password: ''
    }
  })

  const onShowPasswordClick = function () {
    setShowPassword(!showPassword)
  }

  const onSubmit = (data: CreateUserRequestDto) => {
    userApiService
      .create(data)
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField fullWidth {...register('username')} label='Username' name='username' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth {...register('name')} type='text' label='Name' name='name' />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth {...register('phoneNo')} type='text' label='Phone No' name='phoneNo' />
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
                    <Box
                      sx={{
                        gap: 5,
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                      }}
                    >
                      <Button type='submit' variant='contained' size='large'>
                        Create
                      </Button>

                      <Button type='button' variant='contained' size='large' onClick={() => reset()}>
                        Reset
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
