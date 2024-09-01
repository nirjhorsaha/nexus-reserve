import AdminDashboard from "@/pages/admin/AdminDashboard";
import BookingManagement from "@/pages/admin/BookingManagement";
import RoomManagement from "@/pages/admin/RoomManagement";
import SlotManagement from "@/pages/admin/SlotManagement";


export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Mangement',
        children: [
            {
                name: 'Booking Management',
                path: 'booking-management',
                element: <BookingManagement/>
            },
            {
                name: 'Room Management',
                path: 'room-management',
                element: <RoomManagement />
            },
            {
                name: 'Slot Management',
                path: 'slot-management',
                element: <SlotManagement />
            }
        ]
    }
]