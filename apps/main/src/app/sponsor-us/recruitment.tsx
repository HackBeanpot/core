import React from "react";

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
              is a great way to expand and diversify your company&apos;s full-time,
              internship, co-op program&apos;s applicant pool!
            </p>
            <div className="relative top-6">
              <img src="/image.png" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-GT-Walsheim-Trial mb-2 font-bold">
              Market your company &amp; product
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
