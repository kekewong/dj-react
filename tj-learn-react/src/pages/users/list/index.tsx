import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import axios from 'axios'
import { Icon } from '@iconify/react'

interface UserData {
  id: number
  username: string
  name: string
}

interface UserListCellType {
  row: UserData
}

const UserListPage = () => {
  const [users, setUsers] = useState<UserData[]>([])
  const [filters, setFilters] = useState({
    username: ''
  })
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 100 })

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }
  const baseApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  useEffect(() => {
    axios.get<UserData[]>(`${baseApiUrl}/users`).then(res => setUsers(res.data))
  }, [baseApiUrl])

  const onDelete = function (id: number) {
    axios
      .delete(`${baseApiUrl}/users`, { data: { id: id } })
      .then(resp => {
        setUsers(users.filter(m => m.id != id))
      })
      .catch(error => {
        console.error(error)
      })
  }

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
    },
    {
      flex: 0.2,
      minWidth: 230,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: UserListCellType) => <RowOptions onDelete={onDelete} id={row.id} />
    }
  ]

  const RowOptions = ({ id, onDelete }: { id: number; onDelete(id: number): void }) => {
    return (
      <>
        <Button variant='contained' onClick={e => onDelete(id)}>
          Delete
        </Button>
      </>
    )
  }

  async function handleSearch(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    await axios
      .get<UserData[]>(`${baseApiUrl}/users?username=${filters.username}`)
      .then(res => setUsers(res.data))
      .catch(error => {
        console.error(error)
      })
  }

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
                    name='username'
                    onChange={handleFilterChange}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12} style={{ display: 'flex' }}>
                <Button onClick={handleSearch} variant='contained'>
                  Search
                </Button>
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
