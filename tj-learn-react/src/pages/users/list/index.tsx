import { Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import axios from 'axios'

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'username',
    headerName: 'Username'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Name'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'phoneNo',
    headerName: 'Phone No'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'createDate',
    headerName: 'Create Date'
  }
]

interface UserData {
  id: number
  username: string
  name: string
}

const UserListPage = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })

  useEffect(() => {
    axios.get<UserData[]>(`http://localhost:5000/api/user`).then(res => setUsers(res.data))
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filter'></CardHeader>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    label='Search User'
                    sx={{ mr: 6 }}
                    placeholder='Search User'
                    size='medium'
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12} style={{ display: 'flex' }}>
                <Button variant='contained'>Search</Button>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <DataGrid
            autoHeight
            rows={users}
            columns={columns}
            getRowId={row => row.id}
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserListPage
