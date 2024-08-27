import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

interface BreadcrumbsProps {
  breadcrumbs: { name: string; path: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav className=" text-sm font-medium mb-4">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <Link to={crumb.path} className={`hover:text-blue-600 transition-colors duration-300 ${
                index == breadcrumbs.length - 1 ?
                'bg-zinc-200 inline-block p-1 rounded-lg' : ''
              }`}>
                {crumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <FaChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
