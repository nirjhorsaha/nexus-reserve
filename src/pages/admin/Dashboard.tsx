import { Card, Button, Statistic, Divider, List } from 'antd';
import { CalendarOutlined, ScheduleOutlined, ApartmentOutlined, HomeOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles
import { useGetAllRoomsQuery } from '@/redux/features/room/roomApi';
import { useGetAllSlotsQuery } from '@/redux/features/slot/slotApi';
import { useGetAllBookingsQuery } from '@/redux/features/booking/bookingApi';
import Loading from '@/components/ui/loading';
import ErrorComponent from '@/components/ui/ErrorComponent';

const { Meta } = Card;

const Dashboard = () => {
  const { data: roomData, error, isLoading } = useGetAllRoomsQuery({});
  const { data: slotData } = useGetAllSlotsQuery({});
  const { data: bookingsData } = useGetAllBookingsQuery({});

  if (isLoading) return <Loading />;
  if (error) return <ErrorComponent message='Somthing went wrong' />;

  // Get the total number of rooms
  const totalRooms = roomData?.data?.meta.total || 0;
  const totalSlots = slotData?.data?.length || 0
  const totalBookings = bookingsData?.data?.length || 0


  const recentBookings = [
    { room: 'Room A123', date: '2024-09-15', status: 'Confirmed' },
    { room: 'Room B456', date: '2024-09-18', status: 'Pending' },
    { room: 'Room C789', date: '2024-09-20', status: 'Cancelled' },
  ];

  const titleStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    fontFamily: "Nunito"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Key Metrics */}
        <Card className="shadow-md" title={<span style={titleStyle}>Total Rooms</span>} bordered={false}>
          <Statistic
            value={totalRooms}
            prefix={<HomeOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Card>

        <Card className="shadow-md" title={<span style={titleStyle}>Total Bookings</span>} bordered={false}>
          <Statistic
            value={totalBookings}
            prefix={<CalendarOutlined />}
            valueStyle={{ color: '#cf1322' }}
          />
        </Card>

        <Card className="shadow-md" title={<span style={titleStyle}>Total Slots</span>} bordered={false}>
          <Statistic
            value={totalSlots}
            prefix={<ScheduleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>


      </div>

      <Divider orientation="left">Recent Activities</Divider>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activities */}
        <Card className="shadow-md">
          <Meta
            title="New Room Added"
            description="A new conference room was added to the system."
          />
          <Button type="link" className="mt-4" size="small">
            View Details
          </Button>
        </Card>

        <Card className="shadow-md">
          <Meta
            title="Booking Confirmed"
            description="A booking was confirmed for Room A123."
          />
          <Button type="link" className="mt-4" size="small">
            View Details
          </Button>
        </Card>

        <Card className="shadow-md">
          <Meta
            title="Slot Updated"
            description="The slot availability for Room B456 has been updated."
          />
          <Button type="link" className="mt-4" size="small">
            View Details
          </Button>
        </Card>
      </div>

      <Divider orientation="left">Recent Bookings</Divider>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <List
          size="small"
          header={<div className="text-lg font-semibold">Recent Bookings</div>}
          bordered
          dataSource={recentBookings}
          renderItem={item => (
            <List.Item
              actions={[<Button type="link" key="view">View</Button>]}
            >
              <List.Item.Meta
                title={`Room: ${item.room}`}
                description={`Date: ${item.date} - Status: ${item.status}`}
                avatar={<ApartmentOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Dashboard;
