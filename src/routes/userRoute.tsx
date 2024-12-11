import Checkout from "@/pages/Checkout";
import Bookings from "@/pages/user/Bookings";
import MyBookings from "@/pages/user/MyBookings";
// import RoomDeatils from "@/pages/user/RoomDeatils";

export const userPaths = [
  {
    path: 'my-bookings',
    element: <MyBookings />,
  },
  // {
  //   path: 'rooms/:id',
  //   element: <RoomDeatils />
  // },
  {
    path: 'bookings/:id',
    element: <Bookings />
  },
  {
    path: 'checkout',
    element: <Checkout />
  }
];