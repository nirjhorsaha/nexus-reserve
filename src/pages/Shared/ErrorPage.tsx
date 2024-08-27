import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Result
                status="404"
                title="404"
                subTitle={<span className="text-lg">Sorry, the page you visited does not exist.!</span>}
                extra={
                    <div className="flex justify-center">
                        <Link to="/">
                            <button className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                                <FaHome className="text-lg" /> {/* Home icon */}
                                Back Home
                            </button>
                        </Link>
                    </div>
                }
            />
        </div>
    );
};

// import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Notfound = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen text-center">
//       <FaExclamationTriangle className="text-6xl text-red-600 mb-4" />
//       <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
//       <p className="mt-4 text-lg">The page you are looking for does not exist.</p>
//       <Link
//         to="/"
//         className="mt-6 inline-flex items-center px-6 py-3 text-lg font-medium text-blue-500 transition duration-300"
//       >
//         <FaHome className="mr-2 text-xl" />
//         Back to Home Page
//       </Link>
//     </div>
//   );
// };

// export default Notfound;

export default ErrorPage;