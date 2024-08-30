// import { useAppSelector } from "@/redux/hooks"
// import { RootState } from "@/redux/store"
// import { useEffect } from "react";

// const useCartWarning = () => {
//     const cart = useAppSelector((state: RootState) => state.cart.items);

//     useEffect(() => {
//         const handleBeforeUnload = (event: BeforeUnloadEvent) => {
//             if (cart.length > 0) {
//                 event.preventDefault();
//                 return 'You have items in your cart! Are you sure you want to leave?';
//             }
//         }
//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         }
//     },[cart])
// }

// export default useCartWarning;