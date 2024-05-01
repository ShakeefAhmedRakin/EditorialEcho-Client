import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
  return (
    <>
      <Helmet>
        <title>StreetWise | Dashboard</title>
      </Helmet>
      <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="500">
        <div
          className="h-full"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="500"
        ></div>
      </div>
    </>
  );
};

export default DashboardHome;
