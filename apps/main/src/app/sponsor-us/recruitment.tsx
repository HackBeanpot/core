import React from "react";

// const sponsorProps: React.ReactNode = <div className="">
//   <div className="relative grid grid-cols-3 grid-flow-dense ml-5 mt-5">
//     <div className="scale-150 ml-8 mt-1"><img src="/sponsor-images/google_logo.svg" alt="Google logo" /></div>
//     <div className="scale-150 ml-7"><img src="/sponsor-images/datadog_logo.svg" alt="Datadog logo" /></div>
//     <div className="scale-150 mt-2"><img src="/sponsor-images/simplisafe_logo.svg" alt="Simplisafe logo" /></div>
//     <div className="col-span-2 scale-150 ml-10"><img src="/sponsor-images/meta_logo.svg" alt="Meta logo" /></div>
//     <div className="scale-150"><img src="/sponsor-images/woodmack_logo.svg" alt="Wood Mackenzie logo" /></div>
//     <div className="scale-125 mt-2 ml-4"><img src="/sponsor-images/upstate_logo.svg" alt="Upstatement logo" /></div>
//     <div className="scale-125 ml-3"><img src="/sponsor-images/yelp_logo.svg" alt="Yelp logo" /></div>
//     <div className="mt-8 scale-150"><img src="/sponsor-images/vmware_logo.svg" alt="Vmware logo" /></div>
//     <div><img src="/sponsor-images/cargurus_logo.svg" alt="Cargurus logo" /></div>
//     <div className="ml-10 scale-150"><img src="/sponsor-images/toast_logo.svg" alt="Toast logo" /></div>
//   </div>
//   <p className="mt-10 font-medium text-lg" style={{ "fontStyle": "italic"}}>Due to HackBeanpot&apos;s status as a 501c3 nonprofit organization, all sponsorship package purchases are considered tax deductible</p>
// </div>

const RecruitmentBenefits = () => {
  return (
    <div className="bg-[#F9EFDA] w-full flex items-center justify-center">
      <div className="bg-[#0D685F] rounded-2xl p-6 tablet:p-8 text-white w-[866px] h-[584.44px]">
        <h2 className="text-center text-3xl font-GT-Walsheim-Trial font-medium mb-8">
          How can sponsoring HackBeanpot help your company?
        </h2>
        <div className="grid tablet:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-GT-Walsheim-Trial mb-2 font-bold">
              Recruitment
            </h3>
            <p className="font-GT-Walsheim-Trial text-md mb-6">
              Scout the next generation of talent here. Sponsoring HackBeanpot
              is a great way to expand and diversify your company&apos;s
              full-time, internship, co-op program&apos;s applicant pool!
            </p>
            <div className="relative top-6">
              <img src="/image.png" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-GT-Walsheim-Trial mb-2 font-bold">
              Market your company & product
            </h3>
            <p className="font-GT-Walsheim-Trial text-md mb-6">
              Market your product and receive feedback by sponsoring a
              company-specific prize, hosting a workshop, giving a product demo,
              or mentoring hackers that are eager to hear your advice and
              implement your technologies for their projects.
            </p>
            <div className="relative">
              <img src="/image2.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentBenefits;
