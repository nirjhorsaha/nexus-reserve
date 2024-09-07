import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBookings } from "@/types/bookins";
import { CheckOutlined, CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const BookingManagement = () => {
  const { data, isLoading, isError } = useGetAllBookingsQuery({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [bookingToUpdate, setBookingToUpdate] = useState(null);
  const [updateAction, setUpdateAction] = useState('');

  const handleApprove = (bookingId) => {
    // Add logic for approving the booking, e.g., making an API call
    console.log(`Approved booking with ID: ${bookingId}`);
    // Optionally, update the state to reflect the change
    setBookingToUpdate(bookingId);
    setUpdateAction('approve');
  };

  const handleReject = (bookingId) => {
    // Add logic for rejecting the booking, e.g., making an API call
    console.log(`Rejected booking with ID: ${bookingId}`);
    // Optionally, update the state to reflect the change
    setBookingToUpdate(bookingId);
    setUpdateAction('reject');
  };

  const handleDelete = (bookingId) => {
    setBookingToDelete(bookingId);
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    if (bookingToDelete) {
      console.log(`Deleted booking with ID: ${bookingToDelete}`);
      setBookingToDelete(null);
      setConfirmDelete(false);
    }
  };

  const cancelDeletion = () => {
    setBookingToDelete(null);
    setConfirmDelete(false);
  };

  if (isLoading) {
    return <div className="p-6 font-Nunito">Loading...</div>;
  }

  if (isError) {
    return <div className="p-6 font-Nunito">An error occurred while fetching bookings.</div>;
  }

  return (
    <div className="p-6 font-Nunito">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Bookings Management</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data && data.data.length > 0 ? (
              data.data.map((booking: TBookings) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.room.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(booking.date).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium leading-5 rounded border ${booking.isConfirmed === 'confirmed'
                        ? ' bg-green-300 text-black'
                        : booking.isConfirmed === 'unconfirmed'
                          ? ' bg-yellow-300 text-black'
                          : ' bg-red-300 text-black'
                        }`}
                    >
                      {booking.isConfirmed.charAt(0).toUpperCase() + booking.isConfirmed.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {booking.isConfirmed === 'unconfirmed' && (
                      <>
                        <button
                          onClick={() => handleApprove(booking._id)}
                          className="bg-green-500 text-white py-1 px-3 rounded">
                          <CheckOutlined />
                        </button>
                        <button
                          onClick={() => handleReject(booking?._id)}
                          className="bg-red-500 text-white py-1 px-3 rounded"
                        >
                          <CloseOutlined />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="bg-gray-500 text-white py-1 px-3 rounded"
                    >
                      <DeleteOutlined />

                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">No bookings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this booking?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDeletion}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
              <button
                onClick={cancelDeletion}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
