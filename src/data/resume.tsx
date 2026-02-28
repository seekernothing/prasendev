import { Icons } from "@/components/icons";
import { Description } from "@radix-ui/react-dialog";
import { url } from "inspector";
import {
  HomeIcon,
  NotebookIcon,
  ThumbsDown,
  VideoIcon,
  FolderIcon,
} from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "Abhishek Biradar",
  initials: "PN",
  url: "https://github.com/seekernothing",
  location: "Pune, India",
  locationLink: "https://www.google.com/maps/place/pune",
  description:
    "A software developer mainly working in the JavaScript, Python & Web3 ecosystem.",
  summary: `Self-taught. Curious. Always building, breaking, and learning.
Freelancing and working across JavaScript, Python, and Web3.
Exploring the intersection of code, philosophy, and human behavior.`,

  // point to the existing image under public/images/products/
  avatarUrl: "/images/products/musashi.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "PostgresSQL",
    "MongoDB",
    "JavaScript",
    "git",
    "AWS",
    "RestAPI",
    "TDD",
    "Docker",
    "AI API",
  ],
  // videos removed — section deprecated
  videos: [],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: FolderIcon, label: "Projects" },
  ],
  contact: {
    email: "abhishekbiradar@hotmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/seekernothing",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/abhishek-biradar-/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/seekernothing",
        icon: Icons.x,

        navbar: true,
      },

      Instagram: {
        name: "Instagram",
        url: "https://instagram.com/seekernothing",
        icon: Icons.instagram ? Icons.instagram : Icons.globe,

        navbar: true,
      },

      email: {
        name: "Send Email",
        url: "mailto:abhishekbiradar@hotmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  // not mine
  // work: [
  //   {
  //     company: "Atomic Finance",
  //     href: "https://atomic.finance",
  //     badges: [],
  //     location: "Remote",
  //     title: "Bitcoin Protocol Engineer",
  //     logoUrl: "/atomic.png",
  //     start: "May 2021",
  //     end: "Oct 2022",
  //     description:
  //       "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
  //   },
  //   {
  //     company: "Shopify",
  //     badges: [],
  //     href: "https://shopify.com",
  //     location: "Remote",
  //     title: "Software Engineer",
  //     logoUrl: "/shopify.svg",
  //     start: "January 2021",
  //     end: "April 2021",
  //     description:
  //       "Implemented a custom Kubernetes controller in Go to automate the deployment of MySQL and ProxySQL custom resources in order to enable 2,000+ internal developers to instantly deploy their app databases to production. Wrote several scripts in Go to automate MySQL database failovers while maintaining master-slave replication topologies and keeping Zookeeper nodes consistent with changes.",
  //   },
  //   {
  //     company: "Nvidia",
  //     href: "https://nvidia.com/",
  //     badges: [],
  //     location: "Santa Clara, CA",
  //     title: "Software Engineer",
  //     logoUrl: "/nvidia.png",
  //     start: "January 2020",
  //     end: "April 2020",
  //     description:
  //       "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
  //   },
  //   {
  //     company: "Splunk",
  //     href: "https://splunk.com",
  //     badges: [],
  //     location: "San Jose, CA",
  //     title: "Software Engineer",
  //     logoUrl: "/splunk.svg",
  //     start: "January 2019",
  //     end: "April 2019",
  //     description:
  //       "Co-developed a prototype iOS app with another intern in Swift for the new Splunk Phantom security orchestration product (later publicly demoed and launched at .conf annual conference in Las Vegas). Implemented a realtime service for the iOS app in Django (Python) and C++; serialized data using protobufs transmitted over gRPC resulting in an approximate 500% increase in data throughput.",
  //   },
  //   {
  //     company: "Lime",
  //     href: "https://li.me/",
  //     badges: [],
  //     location: "San Francisco, CA",
  //     title: "Software Engineer",
  //     logoUrl: "/lime.svg",
  //     start: "January 2018",
  //     end: "April 2018",
  //     description:
  //       "Proposed and implemented an internal ruby API for sending/receiving commands to scooters over LTE networks. Developed a fully automated bike firmware update system to handle asynchronous firmware updates of over 100,000+ scooters worldwide, and provide progress reports in real-time using React, Ruby on Rails, PostgreSQL and AWS EC2 saving hundreds of developer hours.",
  //   },
  //   {
  //     company: "Mitre Media",
  //     href: "https://mitremedia.com/",
  //     badges: [],
  //     location: "Toronto, ON",
  //     title: "Software Engineer",
  //     logoUrl: "/mitremedia.png",
  //     start: "May 2017",
  //     end: "August 2017",
  //     description:
  //       "Designed and implemented a robust password encryption and browser cookie storage system in Ruby on Rails. Leveraged the Yahoo finance API to develop the dividend.com equity screener",
  //   },
  // ],
  education: [
    {
      school: "Trident Academy Of Technology",
      href: "https://tat.ac.in/",
      degree: "B.Tech in Computer Science and Information Technology",
      logoUrl: "/buildspace.webp",
      start: "2020",
      end: "2024",
    },
    {
      school: "Netaji Subhas Memorial City College",
      href: "https://www.nsmcity.ac.in/index.asp",
      degree: "Higher Secondary",
      logoUrl: "/waterloo.webp",
      start: "2019",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "Nevochat",
      href: "https://nevochat-seven.vercel.app/",
      dates: "February 2025",
      active: true,
      description:
        "Chat with all open-source models at one place. Features real-time streaming, 50+ OpenRouter APIs, and secure Better Auth integration.",
      technologies: [
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "Better Auth",
        "Tailwind CSS",
        "AI SDK",
      ],
      links: [
        {
          type: "Website",
          href: "https://nevochat-seven.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/images/products/nevochat.png",
      video: "",
    },
    {
      title: "SwipeStack",
      href: "https://swipestack.shop/",
      dates: "March 2025 - April 2025",
      active: true,
      description:
        "SwipeStack is a real-time developer networking platform featuring instant matching and live chat using Socket.io., designed to facilitate meaningful connections through an engaging user experience. The platform combines secure authentication, real-time communication, and seamless payment processing with a Tinder-inspired interface.",
      technologies: [
        "React",
        "Node",
        "Socket.IO",
        "Razorpay SDK",
        "MongoDB",
        "AWS-EC2",
        "Javascript",
      ],
      links: [
        {
          type: "Website",
          href: "https://swipestack.shop/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/seekernothing/SwipeStack-Backend",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/products/swipestack.jpg",
      video: "",
    },
    {
      title: "Next-Homes",
      href: "https://next-homes-lntd.vercel.app/", 
      dates: "January 2025 - February 2025",
      active: true,
      description:
        "Built Fire Homes, a full-stack real estate app using Next.js 15, TypeScript, Firebase (Auth, Firestore, Storage), and Zod. I implemented role-based authentication, CRUD for property listings, and image uploads. It helps users search, save, and manage homes easily, while giving admins a smooth dashboard to handle listings efficiently.",
      technologies: [
        "Next.js 15",
        "TypeScript",
        "Zod",
        "Firestore Database",
        "Firebase Authentication & Cloud Storage",
        "shadcnUI",
      ],
      links: [
        {
          type: "Website",
          href: "https://next-homes-lntd.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/seekernothing/next-homes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/images/products/nexthomes.jpg",
      video: "",
    },
    // {
    //   title: "3D Carousel Gallery",
    //   href: "https://3dcarousell.vercel.app/",
    //   dates: "December 2024 - January 2025",
    //   active: true,
    //   description:
    //     "A beautiful and interactive 3D carousel gallery built with Next.js, featuring image and video support with an integrated music player.",
    //   technologies: [
    //     "Next.js",
    //     "CSS 3D Transform",
    //     "SoundCloud Widget API",
    //     "Modern-Javascript",
    //     "Vercel",
    //     "Git",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://3dcarousell.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/StarKnightt/3D-Carousel",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://video.gumlet.io/6745e593080b60408ca085f7/67912b93d696a7af3b2e38ef/download.mp4",
    // },
    // {
    //   title: "GitHub Buddy Finder",
    //   href: "https://buddy-find.vercel.app/",
    //   dates: "April 2023 - September 2023",
    //   active: true,
    //   description:
    //     "This innovative web application helps developers connect with like-minded individuals based on their GitHub activity and language preferences.",
    //   technologies: [
    //     "React.js",
    //     "Octokit",
    //     "Rest API",
    //     "TailwindCSS",
    //     "react-icons",
    //     "react-router-dom",
    //     "Vite",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://buddy-find.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/StarKnightt/Buddy-Finder",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://video.gumlet.io/6745e593080b60408ca085f7/6745ec82c84c6b7e105c3ee5/download.mp4",
    // },
    // {
    //   title: "Solar System",
    //   href: "https://solarrsystem.vercel.app/",
    //   dates: "September 2024 - October 2024",
    //   active: true,
    //   description:
    //     "This project is a visually stunning and interactive web application that provides information about the solar system and it's planet with music.",
    //   technologies: [
    //     "React.js",
    //     "font-awesome",
    //     "react-icons",
    //     "react-dom",
    //     "CSS3",
    //     "Vite",
    //     "Git",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://solarrsystem.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://video.gumlet.io/6745e593080b60408ca085f7/6745ef75b79a267f99668bda/download.mp4",
    // },
    // {
    //   title: "Coffee-Website",
    //   href: "https://coffee-websitee.vercel.app/",
    //   dates: "September 2024 - October 2024",
    //   active: true,
    //   description:
    //     "A web app, with the futurisitc yet nostalgic design of a coffee shop, with a menu and blend of retro vibes.",
    //   technologies: [
    //     "React.js",
    //     "Git",
    //     "TailwindCSS",
    //     "Framer-motion",
    //     "React-icons",
    //     "React-router-dom",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://coffee-websitee.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/StarKnightt/Coffee-Website",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://video.gumlet.io/6745e593080b60408ca085f7/6745ea2d080b60408ca0bc08/download.mp4",
    // },
    // {
    //   title: "Resume Builder",
    //   href: "https://resume-builder-ten-opal.vercel.app/",
    //   dates: "May 2023 - Sept 2023",
    //   active: true,
    //   description:
    //     "It was my final year [Project](https://github.com/StarKnightt/ResumeBuilder) in our college, It is a interactive and versatile Dynamic CV Builder, completely build from scratch with backend functionallity .",
    //   technologies: [
    //     "CSS",
    //     "javascript",
    //     "MongoDB",
    //     "Express.js",
    //     "HTML",
    //     "Regex",
    //     "Node.js",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://builddresume.vercel.app/",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/StarKnightt/ResumeBuilder",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],

    //   image: "",
    //   video:
    //     "https://video.gumlet.io/6745e593080b60408ca085f7/6745e5e5080b60408ca08984/download.mp4",
    // },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon",
      dates: "March 23rd - 25th, 2022",
      location: "Bhubaneswar, India",
      description:
        "Developed a learing portal with some free education content with the best paid contents too, the project was called as 'EducationX'.",
      image: "/smart-india-hackathon.webp",
      mlh: "https://github.com/Synchrotek/E-LearningX",
      links: [],
    },
    {
      title: "Smart India Hackathon",
      dates: "December 19th - 23rd, 2023",
      location: "Bhubaneswar, India",
      description:
        "Developed A collaborative coding web platform that enables Multiuser collboration on a coding project in real-time with features of group chat, to-do lists.",
      image: "/logo.webp",
      mlh: "https://nexuslink01v.netlify.app/",
      links: [],
    },
  ],
} as const;
