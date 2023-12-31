// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Users',
      icon: 'mdi:account-outline',
      children: [
        {
          title: 'List',
          path: '/users/list'
        },
        {
          title: 'Add',
          path: '/users/add'
        }
      ]
    }
  ]
}

export default navigation
