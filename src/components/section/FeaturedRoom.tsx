import Section from "@/pages/Shared/Section";
import { TbBrandFeedly } from "react-icons/tb";


const FeaturedRoom = () => {
    return (
        <div className="bg-white py-12 max-w-7xl mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Section
                    icon={TbBrandFeedly}
                    title="Featured Rooms"
                    subtitle="Explore our top-rated meeting rooms that offer exceptional comfort and facilities for your next event.!"
                />
            </div>
        </div>
    );
};

export default FeaturedRoom;