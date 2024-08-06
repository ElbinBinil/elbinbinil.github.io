import React from "react";
import Head from "next/head";
import {
  Linkedin,
  Dribbble,
  Twitter,
  Instagram,
  Github,
  Mail,
} from "lucide-react";

const PortfolioLayout = () => {
  return (
    <div>
      <Head>
        <title>Elbin Binil</title>
      </Head>
      <div className="w-full h-42 overflow-y-scroll no-scrollbar">
        <div className="bg-gray-900 text-white min-h-screen p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="bg-midnight p-4 rounded-3xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Bringing Your Ideas To Life Through code 🧑🏼‍💻
                  </h1>
                  <a href="mailto:elbinbinil@gmail.com">
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition-colors">
                      Slide a 👋
                    </button>
                  </a>
                </div>
                <div className="grid grid-cols-3 gap-4 my-8">
                  <div className="bg-green-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">2+</p>
                    <p className="text-sm md:text-base">Years Experience</p>
                  </div>
                  <div className="bg-yellow-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">10+</p>
                    <p className="text-sm md:text-base">Handled Projects</p>
                  </div>
                  <div className="bg-red-500 p-4 rounded-lg text-center">
                    <p className="text-2xl md:text-3xl font-bold">2</p>
                    <p className="text-sm md:text-base">On progress</p>
                  </div>
                </div>
              </div>

              {/* Profile section */}
              <div className="bg-purple-700 p-6 rounded-lg">
                <img
                  src="https://github.com/ElbinBinil/elbinbinil.github.io/blob/main/profile.png?raw=true"
                  alt="Profile"
                  className="w-full max-w-[200px] mx-auto rounded-lg mb-4"
                />
                <p className="font-bold text-xl">Name: Elbin Binil</p>
                <p className="mb-4">Based in: Bangalore, India</p>
                <div className="flex justify-center space-x-4">
                  <a target="_blank" href="https://linkedin.com/in/elbinbinil">
                    <Linkedin className="w-6 h-6" />
                  </a>

                  <a target="_blank" href="https://github.com/elbinbinil">
                    <Github className="w-6 h-6" />
                  </a>

                  <a target="_blank" href="https://twitter.com/elbinbinil">
                    <Twitter className="w-6 h-6" />
                  </a>

                  <a target="_blank" href="mailto:elbinbinil@gmail.com">
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Portfolio section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
                <a
                  target="_blank"
                  href="https://github.com/ElbinBinil?tab=repositories"
                >
                  <button className="text-gray-400 hover:text-white transition-colors">
                    See All
                  </button>
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <a
                    target="_blank"
                    href="https://github.com/ElbinBinil/insane-todo"
                  >
                    <img
                      src={
                        "https://plus.unsplash.com/premium_photo-1669904021308-567d085a0ee7?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt="Portfolio item"
                      className="w-full h-auto rounded-lg"
                    />

                    <h1 className="text-sm md:text-base pt-2 font-bold">
                      Insane Todo app
                    </h1>
                  </a>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <a
                    target="_blank"
                    href="https://github.com/ElbinBinil/Learining-Machine-Learning"
                  >
                    <img
                      src={
                        "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt="Portfolio item"
                      className="w-full h-auto rounded-lg"
                    />

                    <h1 className="text-sm md:text-base pt-2 font-bold">
                      ML learning Repo
                    </h1>
                  </a>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <a
                    target="_blank"
                    href="https://github.com/ElbinBinil/DSA-Code"
                  >
                    <img
                      src={
                        "https://img.freepik.com/free-photo/world-population-day-still-life-concept-with-pawns_23-2149409017.jpg?t=st=1721467717~exp=1721471317~hmac=2583fd010e7a910ef3165e8ee3485858cf217599410a0c8cecdf71fbeacfb5a7&w=360"
                      }
                      alt="Portfolio item"
                      className="w-full h-auto rounded-lg"
                    />

                    <h1 className="text-sm md:text-base pt-2 font-bold">
                      DSA code dump
                    </h1>
                  </a>
                </div>
                <div className="bg-gray-800 p-2 rounded-lg">
                  <a
                    target="_blank"
                    href="https://github.com/ElbinBinil/backend-intern"
                  >
                    <img
                      src={
                        "https://images.pexels.com/photos/6424587/pexels-photo-6424587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt="Portfolio item"
                      className="w-full h-auto rounded-lg"
                    />

                    <h1 className="text-sm md:text-base pt-2 font-bold">
                      Secure Backend AUTH
                    </h1>
                  </a>
                </div>
              </div>
            </div>

            {/* About section */}
            <div className="bg-midnight p-4 rounded-3xl mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">About</h2>
                <a
                  target="_blank"
                  href="https://drive.google.com/file/d/1gAiCRQF8qFl1ZlsPtKgBg6bN6CjF_FMP/view?usp=sharing"
                >
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Resume
                  </button>
                </a>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Highly motivated aspiring developer with strong problem-solving
                skills, eager to learn from experienced professionals and make a
                meaningful contribution to a dynamic team. Passionate about
                exploring the field of data analytics and web development
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLayout;
