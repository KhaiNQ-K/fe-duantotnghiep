import CustomerFeature from 'components/Admin/Customers';
import DentistFeature from 'components/Admin/Dentists';
import Dashboard from 'components/Dashboard';
import Account from 'views/Account';
import Comments from 'views/Comments';
import Post from 'views/Post';
import Service from 'views/Service';
import Voucher from 'views/Voucher';

let routerAdmin = [
  // {
  //   path: "/homepage",
  //   name: "Trang chủ",
  //   icon: "shopping_shop",
  //   component: HomePage,
  //   layout: "/admin",
  // },
  {
    path: '/account',
    name: 'Quản lý tài khoản',
    icon: 'users_circle-08',
    component: Account,
    layout: '/admin',
  },
  {
    path: '/dentist',
    name: 'Quản lý nha sỹ',
    icon: 'location_map-big',
    component: DentistFeature,
    layout: '/admin',
  },
  {
    path: '/customer',
    name: 'Quản lý khách hàng',
    icon: 'users_single-02',
    component: CustomerFeature,
    layout: '/admin',
  },
  {
    path: '/service',
    name: 'Quản lý dịch vụ',
    icon: 'objects_globe',
    component: Service,
    layout: '/admin',
  },
  {
    path: '/voucher',
    name: 'Quản lý voucher',
    icon: 'files_paper',
    component: Voucher,
    layout: '/admin',
  },
  // {
  //   path: "/booking",
  //   name: "Quản lý đặt lịch",
  //   icon: "ui-1_calendar-60",
  //   component: Booking,
  //   layout: "/admin",
  // },
  {
    path: '/post',
    name: 'Quản lý bài viết',
    icon: 'design-2_ruler-pencil',
    component: Post,
    layout: '/admin',
  },
  {
    path: '/comment',
    name: 'Quản lý bình luận',
    icon: 'design-2_ruler-pencil',
    component: Comments,
    layout: '/admin',
  },
  {
    path: '/dashboard',
    name: 'Thống kê',
    icon: 'business_chart-bar-32',
    component: Dashboard,
    layout: '/admin',
  },
  // {
  //   path: "/setting",
  //   name: "Cài đặt",
  //   icon: "loader_gear",
  //   component: Post,
  //   layout: "/admin",
  // }
];

export default routerAdmin;
