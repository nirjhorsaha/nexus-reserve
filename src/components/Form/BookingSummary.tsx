import { RootState } from '@/redux/store';
import React from 'react';
import { useSelector } from 'react-redux';

interface InformationRowProps {
  label: string;
  value: string;
}

const InformationRow: React.FC<InformationRowProps> = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between">
    <span className="font-medium text-lg">{label}:</span>
    <span className="text-sm sm:text-base">{value}</span>
  </div>
);

const BookingSummary: React.FC = () => {
  const bookingDetails = useSelector((state: RootState) => state.booking);
  const { room, date, selectedTimes, user, totalAmount } = bookingDetails;

  const formatTimes = (times: string[]): string => {
    if (times.length === 0) return 'N/A';

    const sortedTimes = [...times].sort((a, b) => {
      const startA = a.split(' - ')[0];
      const startB = b.split(' - ')[0];
      return startA.localeCompare(startB);
    });

    const startTime = sortedTimes[0].split(' - ')[0];
    const endTime = sortedTimes[sortedTimes.length - 1].split(' - ')[1];

    return `${startTime} - ${endTime}`;
  };

  const formattedTimes = selectedTimes ? formatTimes(selectedTimes) : 'N/A';
  const roomName = room?.name || 'N/A';
  const selectedDate = date || 'N/A';
  const cost = totalAmount !== undefined ? `$${totalAmount}` : 'N/A';
  const userName = user?.name || 'N/A';
  const userPhone = user?.phone || 'N/A';
  const userEmail = user?.email || 'N/A';

  return (
    <div className="">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Booking Summary</h2>
      <div className="space-y-3 sm:space-y-4">
        <InformationRow label="Room Name" value={roomName} />
        <InformationRow label="Date" value={selectedDate} />
        <InformationRow label="Time" value={formattedTimes} />
        <InformationRow label="Cost" value={cost} />

        <h3 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8">User Information</h3>
        <div className="space-y-3 sm:space-y-4">
          <InformationRow label="Name" value={userName} />
          <InformationRow label="Phone Number" value={userPhone} />
          <InformationRow label="Email" value={userEmail} />
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
