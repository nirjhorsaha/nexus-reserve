import { useState } from "react";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Loading from "@/components/ui/loading";
import { useDeleteBookingMutation, useGetAllBookingsQuery, useUpdateBookingMutation } from "@/redux/features/booking/bookingApi";
import { TBookings } from "@/types/bookins";
// import ErrorComponent from "@/components/ui/ErrorComponent";
import toast from "react-hot-toast";
import { TError } from "@/types";
import DeleteModal from "@/components/Modal/DeleteModal";
import UpdateBookingModal from "@/components/Modal/BookingDetailsModal";
import { Helmet, HelmetProvider } from "react-helmet-async";


const BookingManagement = () => {
  const { data, isLoading } = useGetAllBookingsQuery({});
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();


  // const [confirmDelete, setConfirmDelete] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TBookings | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


  if (isLoading) return <Loading />;
  // if (isError) {
  //   return <ErrorComponent message="Error fetching bookings.! Please try again later." />;
  // }

  const handleApprove = async (bookingId: string, currentStatus: string | undefined) => {
    if (currentStatus === 'approved') {
      toast.error('Booking is already approved.');
      return;
    }
    try {
      await updateBooking({ id: bookingId, updatedBooking: { status: 'approved' } }).unwrap();
      toast.success('Booking has been approved successfully.');
    } catch (err) {
      toast.error('There was an error approving the booking.');
    }
  };


  const handleReject = async (bookingId: string, currentStatus: string | undefined) => {
    if (currentStatus === 'rejected') {
      toast.error('Booking is already approved.');
      return;
    }
    try {
      await updateBooking({ id: bookingId, updatedBooking: { status: 'rejected' } }).unwrap();
      toast.success('Booking has been rejected.!');
    } catch (err) {
      toast.error('There was an error rejecting the booking.!');
      console.error('Error updating booking:', err);
    }
  };

  // const confirmDeletion = () => {
  //   if (bookingToDelete) {
  //     deleteBooking({ id: bookingToDelete })
  //       .unwrap()
  //       .then(() => console.log(`Deleted booking with ID: ${bookingToDelete}`))
  //       .catch(err => console.error('Error deleting booking:', err));
  //     setBookingToDelete(null);
  //     setConfirmDelete(false);
  //   }
  // };


  const confirmDeletion = async () => {
    if (bookingToDelete) {
      try {
        await deleteBooking(bookingToDelete).unwrap();
        toast.success('Booking has been deleted successfully!');
        setBookingToDelete(null);
        setIsDeleteModalVisible(false);
        // setConfirmDelete(false);
      } catch (err) {
        const error = err as TError;
        const errorMessage = error.data?.errorSources?.[0]?.message || 'There was an error deleting the booking.';
        toast.error(errorMessage);
        console.error('Error deleting booking:', err);
      }
    }
  };



  const handleDetails = (booking: TBookings) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleDelete = (bookingId: string) => {
    setBookingToDelete(bookingId);
    // setConfirmDelete(true);
    setIsDeleteModalVisible(true);

  };

  const cancelDeletion = () => {
    setBookingToDelete(null);
    // setConfirmDelete(false);
    setIsDeleteModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Booking Management - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="p-6 font-Nunito">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Bookings Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Room Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Slot Time</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Confirmation</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data?.data && data.data.length > 0 ? (
                data.data.map((booking: TBookings) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 text-center whitespace-nowrap">{booking.room.name}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">{booking.user.name}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">{booking.date}</td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {booking.slots.map((slot) => (
                        <div key={slot._id} className="mb-1">
                          {slot.startTime} - {slot.endTime}
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-sm font-medium leading-5 rounded border ${booking.isConfirmed === 'confirmed'
                          ? 'bg-green-300 text-black py-1 px-3 rounded'
                          : booking.isConfirmed === 'unconfirmed'
                            ? 'bg-yellow-300 text-black py-1 px-3 rounded'
                            : 'bg-red-300 text-black py-1 px-3 rounded'
                          }`}
                      >
                        {booking.isConfirmed.charAt(0).toUpperCase() + booking.isConfirmed.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      {booking.isDeleted ? (
                        <span className="bg-gray-500 text-white py-1 px-3 rounded">Deleted</span>
                      ) : booking.status === 'approved' ? (
                        <span className="bg-green-500 text-white py-1 px-3 rounded">Accepted</span>
                      ) : booking.status === 'rejected' ? (
                        <span className="bg-red-500 text-white py-1 px-3 rounded">Rejected</span>
                      ) : (
                        <span className="bg-yellow-300 text-black py-1 px-3 rounded">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleDetails(booking)}
                        className="bg-blue-600 text-white py-1 px-3 rounded">
                        <EyeOutlined className="mr-1" />
                        Details
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap space-x-2">
                      {booking.isConfirmed === 'unconfirmed' && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id!, booking.status)}
                            disabled={booking.status === 'rejected'}
                            className={`py-1 px-3 rounded ${booking.status === 'rejected' ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
                          >
                            <CheckOutlined className="mr-1" />
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(booking._id!, booking.status)}
                            disabled={booking.status === 'approved'}
                            className={`py-1 px-3 rounded ${booking.status === 'approved' ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 text-white'}`}>
                            <CloseOutlined className="mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      {booking.isConfirmed !== 'unconfirmed' && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id!, booking.status)}
                            disabled={booking.status === 'approved' || booking.status === 'rejected'}
                            className={`py-1 px-3 rounded ${booking.status === 'approved' || booking.status === 'rejected' ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 text-white'}`}
                          >
                            <CheckOutlined className="mr-1" />
                            Approve
                          </button>

                          <button
                            onClick={() => handleReject(booking._id!, booking.status)}
                            disabled={booking.status === 'rejected' || booking.status === 'approved'}
                            className={`py-1 px-3 rounded ${booking.status === 'rejected' || booking.status === 'approved' ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 text-white'}`}
                          >
                            <CloseOutlined className="mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(booking._id!)}
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                      >
                        <DeleteOutlined className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">No bookings available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* {confirmDelete && (
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
        className="bg-gray-300 py-2 px-4 rounded"
        >
        Cancel
        </button>
        </div>
          </div>
          </div>
      )} */}
        <DeleteModal
          visible={isDeleteModalVisible}
          onConfirm={confirmDeletion}
          onCancel={cancelDeletion}
          title="Delete Booking"
          description="Are you sure you want to delete this booking?"
        />
        {isModalVisible && selectedBooking && (
          <UpdateBookingModal
            visible={isModalVisible}
            onClose={handleCancel}
            booking={selectedBooking}
          />
        )}
      </div>
    </>
  );
};

export default BookingManagement;
