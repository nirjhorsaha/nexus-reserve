import { useAppSelector } from "@/redux/hooks"
import { RootState } from "@/redux/store"
import { useEffect } from "react";

const useBookingWarning = () => {
    const bookings = useAppSelector((state: RootState) => state.booking.selectedTimes);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (bookings?.length > 0) {
                event.preventDefault();
                return 'You have unsaved booking selections! Are you sure you want to leave without confirming?';
            }
        }
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    },[bookings])
}

export default useBookingWarning; 