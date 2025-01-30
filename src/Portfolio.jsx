// Portfolio.jsx
import React, { useState, useEffect } from 'react';

// analytics.js
const trackEvent = async (eventType, details = {}) => {
  try {
      const payload = {
          eventType,
          timestamp: new Date().toISOString(),
          ...details
      };

      await fetch('https://p077w1h6k4.execute-api.us-east-1.amazonaws.com/prod/events', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });
  } catch (error) {
      console.error('Tracking error:', error);
  }
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);


// Custom hook to track section views
const useSectionTracking = (sectionId) => {
    useEffect(() => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        let entryTime = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Section came into view
                    entryTime = Date.now();
                    
                } else if (entryTime) {
                    // Section left view
                    const timeSpent = Date.now() - entryTime;
                    trackEvent('section_view', {
                        sectionName: sectionId,
                        timeSpent: timeSpent
                    });
                    entryTime = null;
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of section is visible

        observer.observe(section);

        return () => observer.disconnect();
    }, [sectionId]);
};

const trackLink = (linkType, details = {}) => {
  trackEvent('link_click', {
      linkType,
      ...details
  });
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.timeline-item').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle scroll for active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titles = [
    "Software Engineer",
    "DevOps Engineer",
    "Site Reliability Engineer",
    "Infrastructure Engineer",
    "Cloud Engineer",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => 
        prevIndex === titles.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Skills data
  const skills = {
    "Languages": "Golang, Java, C++, Python, JavaScript",
    "Cloud & DevOps": "AWS, Docker, Kubernetes, Helm, Terraform, Prometheus",
    "Version Control & CI/CD": "Git, GitHub, Jenkins, ArgoCD, GitHub Actions",
    "Databases": "MySQL, MongoDB, Redis, Elasticsearch, PostgreSQL",
    "API": "REST, GraphQL, gRPC, SOAP",
    "Web Technologies": "React.js, SpringBoot, JUnit, Next.js, HTML, CSS"
    
  };

  // Projects data
  const projects = [
    // {
    //   title: 'Capstone Project - Secure HMI for Penetration Testing',
    //   description: 'Developing a secure Human-Machine Interface (HMI) for penetration testing, which controls a Z-scale train town via a PLC. The React-based frontend communicates with a Python backend over a secure Wi-Fi access point hosted by the server, using TLS with OpenSSL for encrypted communication between the frontend and backend.',
    //   image: './images/HMI_PenetrationTesting.png',
    //   techStack: ['React', 'Python', 'OpenSSL', 'TLS', 'PLC'],
    //   githubLink: '#'
    // },   
    {
      title: 'Distributed Online Marketplace',
      description: 'Developed a scalable marketplace backend with microservices and fault-tolerant data replication using the Raft consensus algorithm and self-designed rotating sequencer protocols.',
      image: './images/Distributed.png',
      techStack: ['Golang', 'MySQL', 'grpc', 'REST', 'SOAP'],
      githubLink: '#'
    },
    {
      title: 'Serverless Insights Dashboard',
      description: 'Designed a solution to collect, process, and visualize real-time data, enabling dynamic monitoring and analytics through interactive dashboards.',
      image: './images/serverless.png',
      techStack: ['Lambda', 'API Gateway', 'DynamoDB', "Grafana"],
      githubLink: '#'
    },
    {
      title: 'Automatic Music Separation Service',
      description: 'Designed and deployed a Kubernetes cluster using Terraform, with containerized microservices providing a REST API for audio track separation, Redis for task management, and Min.io for cloud-based object storage.',
      image: './images/music_separation.png',
      techStack: ['AWS', 'Kubernetes', 'Terraform', 'Python', 'Redis', 'Min.io'],
      githubLink: '#'
    },
    {
      title: 'Distributed File Systems',
      description: 'Designed a distributed file system for reliable storage, a web proxy for caching and content filtering, and a multi-threaded HTTP server capable of handling simultaneous client requests.',
      image: './images/Distributed_file.png',
      techStack: ['C', 'Socket Programming', 'Multi-threading', 'TCP/IP'],
      githubLink: '#'
    },
    {
      title: 'Book Champion - Interactive Word Meaning Device',
      description: 'Prototyped a device that identifies words on media devices using a camera and provides real-time definitions via text-to-speech, enhancing user reading experience. Leveraged OpenCV, OCR, gesture recognition, and speech synthesis, with OpenCV achieving the highest accuracy for fingertip/bookmark detection and word extraction.',
      image: './images/WordDevice.png',
      techStack: ['OpenCV', 'OCR', 'MediaPipe', 'Text-to-Speech', 'Machine Learning'],
      githubLink: 'https://github.com/prithvi081099/Book-Companion'
    },
    
  ];

  // Navigation link component
  const NavLink = ({ href, children }) => (
    <a
      href={href}
      className={`px-4 py-2 transition-colors duration-300 ${
        activeSection === href.slice(1) 
          ? 'text-blue-600 font-semibold' 
          : 'text-gray-600 hover:text-blue-600'
      }`}
    >
      {children}
    </a>
  );

  useSectionTracking('home');
  useSectionTracking('skills');
  useSectionTracking('certificates');
  useSectionTracking('experience');
  useSectionTracking('projects');

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      {/* Header - Fixed but with proper width */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-xl font-bold text-blue-600">
              PM
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="flex space-x-4"> {/* Reduced space-x from 8 to 4 */}
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#skills">Skills</NavLink>
                <NavLink href="#certificates">Certificates</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#projects">Projects</NavLink>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden absolute w-full bg-white border-t ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <nav className="container mx-auto px-4">
            <div className="py-2 space-y-1">
              <a href="#home" className="block px-3 py-2 rounded-lg hover:bg-gray-100">Home</a>
              <a href="#skills" className="block px-3 py-2 rounded-lg hover:bg-gray-100">Skills</a>
              <a href="#certificates" className="block px-3 py-2 rounded-lg hover:bg-gray-100">Certificates</a>
              <a href="#experience" className="block px-3 py-2 rounded-lg hover:bg-gray-100">Experience</a>
              <a href="#projects" className="block px-3 py-2 rounded-lg hover:bg-gray-100">Projects</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full py-20 bg-white flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-xl mb-8">
              <img 
                src="./images/Prithvi-Image.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Prithvi Harish Malhotra
            </h1>

            {/* Rotating Titles */}
            <div className="h-8 mb-6">
              <p className="text-xl md:text-2xl text-blue-600 transition-all duration-500 ease-in-out">
                {titles[currentTitleIndex]}
              </p>
            </div>

            {/* About Text */}
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Hi, I’m Prithvi! I’m a software engineer pursuing an M.S. in Computer Science at the University of Colorado Boulder. 
            With experience in Software Engineering, DevOps, distributed systems, and Open Source Development, 
            I enjoy building scalable solutions and solving complex problems. 
            Passionate about learning emerging tech and contributing to impactful projects, 
            I’m always looking to grow and innovate.
            </p>

            {/* Social Links */}
            <div className="flex gap-6">
              {/* GitHub */}
              <a 
                href="https://github.com/prithvi081099" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={() => trackLink('github', { sectionName: 'home' })}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center 
                            group-hover:bg-gray-200 transition-all duration-300">
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                  </svg>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/prithvimalhotra/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
                onClick={() => trackLink('linkedIn', { sectionName: 'home' })}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center 
                            group-hover:bg-gray-200 transition-all duration-300">
                  <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </a>

              {/* Resume */}
              <a 
                href="./images/RESUME.pdf" 
                target="_blank" 
                className="group"
                onClick={() => trackLink('resume', { sectionName: 'home' })}
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center 
                            group-hover:bg-gray-200 transition-all duration-300">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {Object.entries(skills).map(([category, techs]) => (
              <div 
                key={category} 
                className=" bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Category with Icon */}
                  <div className="flex items-center gap-3 w-48">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-600">
                      {category}
                    </h3>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 flex-1">
                    {techs.split(", ").map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-50 rounded-full text-gray-700 text-lg font-semibold
                                hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
    <section id="certificates" className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Certificates</h2>
        
        <div className="flex flex-col items-center "> {/* Main centering container */}
          <div className="flex flex-wrap justify-center gap-8"> {/* Flex container for cards */}
            {/* Certificate Card */}
            <a 
              href="https://www.credly.com/badges/0fb24746-2193-4032-bbac-0b37a1395188/public_url" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-sm flex-shrink-0" // Added flex-shrink-0 to maintain card width
              onClick={() => trackLink('certificate', { certificateName: 'aws', sectionName: 'certificates' })}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img 
                  src="./images/aws-certified-developer-associate.png" 
                  alt="AWS Certificate" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">AWS Cloud Practitioner</h3>
                  <p className="text-gray-600">Amazon Web Services</p>
                  <div className="mt-4 text-blue-600 flex items-center">
                    View Certificate 
                    <span className="ml-2">↗</span>
                  </div>
                </div>
              </div>
            </a>

            {/* When you add more certificates, just copy the card component above */}
          </div>
        </div>
      </div>
    </section>
      
      {/* Experience & Education Section */}
      <section id="experience" className="w-full py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Experience & Education</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Experience Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Professional Experience</h3>
              </div>

              

              <div className="space-y-8">
                {/* Timeline Item 1 */}

                <div 
                  id="exp-1"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-1'] ? 1 : 0,
                    transform: isVisible['exp-1'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Research Assistant</h4>
                    <p className="text-gray-600 mb-2">University Of Colorado Boulder • Oct 2024 - Prsent</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Developed a service to process and store daily Wi-Fi usage data in AWS S3, enabling efficient querying with AWS Athena and visualizing trends using Grafana.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Designing and implementing a custom interpreter to analyze CSV data and simulate user browsing behavior based on historical website visit patterns.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div 
                  id="exp-2"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-2'] ? 1 : 0,
                    transform: isVisible['exp-2'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Open Source Contributor</h4>
                    <p className="text-gray-600 mb-2">Ray (Anyscale) • June 2024 - Aug 2024</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Enhanced Subscriber by adding support for multiple callbacks when subscribing to the same publisher_address and key_id, improving callback invocation accuracy.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fixed a critical issue where S3 URLs with spaces in job submissions caused tasks to hang in the Pending state by expanding the disallowed character set in URL parsing logic, enhancing the robustness of the system.</span>
                      </li>
                      
                    </ul>
                  </div>
                </div>

                <div 
                  id="exp-3"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-3'] ? 1 : 0,
                    transform: isVisible['exp-3'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Software Engineer</h4>
                    <p className="text-gray-600 mb-2">LTIMINDTREE LIMITED • July 2021 - July 2023</p>
                    <ul className="list-disc list-inside text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Engineered a custom real-time parser in Java to efficiently handle large volumes of 
                        transactional data, optimizing the Electronic Data Interchange process in an Agile environment.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Reduced data processing errors by 6% through the development and deployment of file-level validations with overlays across diverse file formats.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Implemented and maintained CI/CD pipelines using GitHub and Jenkins to automate deployment.</span>
                      </li>
                      
                    </ul>
                  </div>
                </div>

                <div 
                  id="exp-4"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-4'] ? 1 : 0,
                    transform: isVisible['exp-4'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Software Engineering Intern</h4>
                    <p className="text-gray-600 mb-2">Space Up Technologies LLP • March 2020 - July 2020</p>
                    <ul className="list-disc list-inside text-gray-600">
                    <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Enhanced system performance by 18% by integrating the existing data layer of 
                        SpaceCloud with Elasticsearch, replacing traditional databases for more efficient 
                        full-text search queries.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Optimized Kubernetes deployment by adding a scale-down-to-zero feature with a 
                        3-second cold start and integrated Prometheus for real-time metrics monitoring.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Improved feature integration, deployment, and testing efficiency by designing a 
                        CI/CD pipeline with automated deployment, testing, PR monitoring, and environment 
                          cleanup using GitOps principles and ArgoCD.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>

              <div className="space-y-8">
                {/* Timeline Item 1 */}
                <div 
                  id="exp-5"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-5'] ? 1 : 0,
                    transform: isVisible['exp-5'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Master of Science in Computer Science</h4>
                    <p className="text-gray-600 mb-2">University Of Colorado Boulder • Aug 2023 - May 2025</p>
                    <p className="text-gray-600">Course Manager of Computer Systems and Research Assistant</p>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div 
                  id="exp-6"
                  className="timeline-item relative pl-8 border-l-2 border-blue-600 opacity-0 translate-y-8 transition-all duration-700 ease-out"
                  style={{
                    opacity: isVisible['exp-6'] ? 1 : 0,
                    transform: isVisible['exp-6'] ? 'translateY(0)' : 'translateY(2rem)',
                    transitionDelay: '200ms'
                  }}
                >
                  <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full -translate-x-1/2"></div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold text-blue-600">Bachelors of Technology in Electronics Engineering</h4>
                    <p className="text-gray-600 mb-2">VJTI (Mumbai University) • Aug 2017 - May 2021</p>
                    <p className="text-gray-600">Relevant courses: Computer Programming, Database Management Systems, Computer Architecture.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                 { /*
                  <div className="flex space-x-4">
                    <a href={project.githubLink} className="text-blue-600 hover:text-blue-800" onClick={() => trackLink('project_repo', { sectionName: 'projects', projectName: project.title })}>
                      GitHub ↗
                    </a>
                  </div>
                  */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section
      <section id="contact" className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact Me</h2>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 h-32"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/prithvi081099" className="hover:text-gray-300" target="_blank" onClick={() => trackLink('github', { sectionName: 'footer' })} >GitHub</a>
            <a href="https://www.linkedin.com/in/prithvimalhotra/" className="hover:text-gray-300" target="_blank" onClick={() => trackLink('linkedIn', { sectionName: 'footer' })} >LinkedIn</a>
           
          </div>
          <p>&copy; 2025 Prithvi Malhotra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;