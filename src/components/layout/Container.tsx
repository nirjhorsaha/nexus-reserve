import { ReactNode } from "react";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto max-w-[2520px] xl:px-20 md:px-10 sm:px-2 p-4 ${className}`}>
      {children}
    </div>
  );
}

// import React, { ReactNode } from 'react';

// interface ContainerProps {
//   children: ReactNode;
// }

// const Container: React.FC<ContainerProps> = ({ children }) => {
//   return (
//     <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
//       {children}
//     </div>
//   );
// };

// export default Container;