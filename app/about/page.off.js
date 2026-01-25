import React from 'react';

const About = () => {
    return (
        <div className="w-full text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
                <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">About Get Me a Coffee</h1>
                <p className="text-base sm:text-lg mb-4 sm:mb-6">
                    Get Me a Coffee is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It&apos;s a space where your fans can directly contribute to your creative endeavors by buying you a Coffee. Unlock the potential of your fanbase and bring your projects to life.
                </p>

                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                        <img className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0" src="/member.gif" alt="Fans Want to Collaborate" />
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Fans Want to Collaborate</h3>
                            <p className="text-sm sm:text-base">Your fans are enthusiastic about collaborating with you on your projects.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                        <img className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shrink-0" src="/dollar.gif" alt="Support Through Coffee" />
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Support Through Coffee</h3>
                            <p className="text-sm sm:text-base">Receive support from your fans in the form of Coffee purchases, directly contributing to your project funding.</p>
                        </div>
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Benefits for Creators</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Direct financial support from your fanbase</li>
                    <li className="text-sm sm:text-base">Engage with your fans on a more personal level</li>
                    <li className="text-sm sm:text-base">Access to a platform tailored for creative projects</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Benefits for Fans</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Directly contribute to the success of your favorite creators</li>
                    <li className="text-sm sm:text-base">Exclusive rewards and perks for supporting creators</li>
                    <li className="text-sm sm:text-base">Be part of the creative process and connect with creators</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Benefits of Collaboration</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Unlock new opportunities through collaboration with fellow creators</li>
                    <li className="text-sm sm:text-base">Expand your network and reach a wider audience</li>
                    <li className="text-sm sm:text-base">Combine skills and resources to create innovative projects</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Community Engagement</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Interact with a supportive community of like-minded individuals</li>
                    <li className="text-sm sm:text-base">Receive valuable feedback and encouragement from peers</li>
                    <li className="text-sm sm:text-base">Participate in discussions and events centered around your interests</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Access to Resources</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Gain access to resources such as tutorials, templates, and tools</li>
                    <li className="text-sm sm:text-base">Receive guidance and mentorship from experienced creators</li>
                    <li className="text-sm sm:text-base">Stay updated on industry trends and best practices</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Recognition and Exposure</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Showcase your work to a global audience and gain recognition</li>
                    <li className="text-sm sm:text-base">Feature in promotional materials and campaigns</li>
                    <li className="text-sm sm:text-base">Build your portfolio and increase your credibility as a creator</li>
                </ul>

                <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8">Supportive Community</h2>
                <ul className="list-disc pl-5 sm:pl-6 mb-6 sm:mb-8 space-y-1 sm:space-y-2">
                    <li className="text-sm sm:text-base">Join a community that values creativity, diversity, and inclusivity</li>
                    <li className="text-sm sm:text-base">Find encouragement and inspiration from fellow members</li>
                    <li className="text-sm sm:text-base">Collaborate on projects and share resources for mutual growth</li>
                </ul>
            </div>
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - Get Me A Coffee",
};