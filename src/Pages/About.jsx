import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Muhammad Qasim",
      role: "Lead 2D Visualization & UI Support",
      // image: "https://avatars.githubusercontent.com/u/123456789?s=200&v=4",
      image: "https://avatars.githubusercontent.com/u/183982891?v=4",
      linkedin: "https://www.linkedin.com/in/muhammad-qasim-gill/",
      github: "https://github.com/Qasim-Gill",
      email: "mq77gill@gmail.com",
      description:
        "Responsible for 2D visualizations, UI enhancements, and ensuring smooth integration with the simulation.",
    },
    {
      name: "Shaurya Tamang",
      role: "Lead 3D Visualization & UI Development",
      image:
        "https://avatars.githubusercontent.com/u/97439041?s=400&u=39d9ec5f7745ceee2583231e7b2f7e49d21f9280&v=4",
      github: "https://github.com/GoTouchGra55",
      email: "shauryatamang2009@gmail.com",
      description:
        "Responsible for creating the interactive 3D simulation, rendering objects, and designing intuitive UI elements.",
    },
    {
      name: "Hafsa Mahmood",
      role: "Documentation & Reporting Specialist",
      image:
        "https://media.discordapp.net/attachments/1250040343773315193/1424355731695472701/safana.png?ex=68e3a625&is=68e254a5&hm=1b97ec5747e382035b9e089b6b895ef2c84828072d4f475b1198bcb5518a834b&=&format=webp&quality=lossless",
      linkedin: "https://www.linkedin.com/in/hafsa-mahmood",
      email: "mahmoodhafsa76@gmail.com",
      description:
        "Responsible for preparing detailed project documentation, summarizing technical aspects, and coordinating reports.",
    },
    {
      name: "Chris Thomas Neel",
      role: "Junior QA & Testing Support",
      image:
        "https://cdn.discordapp.com/attachments/1408471004367294496/1424313199775453224/GetAttachmentThumbnail.jpg?ex=68e37e89&is=68e22d09&hm=8e930a84d8c9004158a8a992ae70a6459cab0b918446ba54619832642e9f8760",
      github: "https://www.github.com/Chris12345-cell",
      email: "christhomasneel@outlook.com",
      description:
        "Responsible for assisting in testing features, identifying issues, and supporting overall project quality.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden bg-gradient-to-b from-[#000011] via-[#0a043c] to-[#120024]">
      {/* 🌌 Animated Stars Background */}
      <div className="absolute inset-0 bg-[url('https://cdn.pixabay.com/photo/2017/08/30/02/05/milky-way-2695569_1280.jpg')] bg-cover bg-center opacity-50 animate-pulse"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>

      {/* Content */}
      <section className="relative z-10 py-20 px-6 md:px-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 drop-shadow-lg">
            Our Team
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mt-4 mb-6">
            Meet the passionate people behind this project — each bringing
            unique skills and creativity to make our vision a reality.
          </p>
          <a
            href="/Team_Intro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-600 px-4 py-2 font-mono rounded-md hover:bg-gray-900"
          >
            Download Team Introduction
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center text-center border border-white/20"
            >
              <div className="relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500 shadow-lg hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse"></div>
              </div>

              <h3 className="text-2xl font-semibold text-indigo-300">
                {member.name}
              </h3>
              <p className="text-cyan-200 text-sm font-medium mt-1 mb-3">
                {member.role}
              </p>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                {member.description}
              </p>

              <div className="flex space-x-4 mt-auto">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xl transition-colors"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-xl transition-colors"
                  >
                    <FaGithub />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-red-400 hover:text-red-300 text-xl transition-colors"
                  >
                    <FaEnvelope />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✨ Floating Star Particles (Simple Animated Dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random(),
            }}
          />
        ))}
      </div>
      <div className="absolute top-5 right-5 z-50">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Back to Main Menu
        </Link>
      </div>
    </div>
  );
};

export default About;
