import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
  BrainCircuit,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  MonitorOff,
  Pause,
  Play,
  PhoneOff,
  Clock3,
  Code2,
  MessageSquare,
  Circle,
  Square,
} from "lucide-react";

function InterviewRoom() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const recordedVideoUrlRef = useRef(null);
  const recordedBlobRef = useRef(null);
  const screenStreamRef = useRef(null);
  const canvasRef = useRef(null);
const canvasStreamRef = useRef(null);

  const [interview, setInterview] = useState({
    role: "Frontend Developer",
    company: "Any Company",
    topic: "React",
    difficulty: "Medium",
    duration: "30",
  });
  

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [seconds, setSeconds] = useState(30 * 60);

  const [recording, setRecording] = useState(false);
  const [recordingReady, setRecordingReady] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const interviewQuestions = {

  
  "Frontend Developer": {
    React: {
      questions: [
        {
          question: "What is the difference between state and props in React?",
          description: "Explain how state and props work and when you would use each.",
          language: "JavaScript",
        },
        {
          question: "What are React Hooks?",
          description: "Explain useState and useEffect with practical examples.",
          language: "JavaScript",
        },
        {
          question: "How does the Virtual DOM work?",
          description: "Explain how React updates the UI efficiently.",
          language: "JavaScript",
        },
        {
          question: "What is component re-rendering in React?",
          description: "Explain why components re-render and how to optimize unnecessary renders.",
          language: "JavaScript",
        },
        {
          question: "How would you manage API data in a React application?",
          description: "Explain your approach to fetching, storing, and displaying API data.",
          language: "JavaScript",
        },
      ],
    },

    JavaScript: {
      questions: [
        {
          question: "What is the difference between let, const, and var?",
          description: "Explain scope, reassignment, and hoisting.",
          language: "JavaScript",
        },
        {
          question: "What are closures in JavaScript?",
          description: "Explain closures with a practical example.",
          language: "JavaScript",
        },
        {
          question: "What is the difference between == and ===?",
          description: "Explain type coercion and strict equality.",
          language: "JavaScript",
        },
        {
          question: "What are promises and async/await?",
          description: "Explain asynchronous JavaScript and error handling.",
          language: "JavaScript",
        },
        {
          question: "What is event delegation?",
          description: "Explain how event delegation works and when it is useful.",
          language: "JavaScript",
        },
      ],
    },

    "HTML & CSS": {
      questions: [
        {
          question: "What is semantic HTML?",
          description: "Explain semantic elements and why they are important.",
          language: "HTML",
        },
        {
          question: "What is the CSS box model?",
          description: "Explain content, padding, border, and margin.",
          language: "CSS",
        },
        {
          question: "What is the difference between Flexbox and Grid?",
          description: "Explain when you would use each layout system.",
          language: "CSS",
        },
        {
          question: "How do you make a website responsive?",
          description: "Explain media queries and responsive layout techniques.",
          language: "CSS",
        },
        {
          question: "What is CSS specificity?",
          description: "Explain how the browser determines which CSS rule is applied.",
          language: "CSS",
        },
      ],
    },

    "Frontend APIs": {
      questions: [
        {
          question: "What is a REST API?",
          description: "Explain REST principles and HTTP methods.",
          language: "JavaScript",
        },
        {
          question: "How do you make an API request in JavaScript?",
          description: "Explain fetch or Axios with an example.",
          language: "JavaScript",
        },
        {
          question: "What is the difference between GET and POST?",
          description: "Explain their purpose and typical usage.",
          language: "JavaScript",
        },
        {
          question: "How do you handle API errors?",
          description: "Explain status codes and frontend error handling.",
          language: "JavaScript",
        },
        {
          question: "How would you display loading states during API calls?",
          description: "Explain a clean frontend approach.",
          language: "JavaScript",
        },
      ],
    },

    "Data Structures & Algorithms": {
      questions: [
        {
          question: "What is the difference between an array and a linked list?",
          description: "Compare their structure, access time, and use cases.",
          language: "JavaScript",
        },
        {
          question: "What is Big O notation?",
          description: "Explain time and space complexity.",
          language: "JavaScript",
        },
        {
          question: "How does binary search work?",
          description: "Explain the algorithm and its complexity.",
          language: "JavaScript",
        },
        {
          question: "What is a stack and where is it used?",
          description: "Explain LIFO behavior with an example.",
          language: "JavaScript",
        },
        {
          question: "How would you find duplicate elements in an array?",
          description: "Explain an efficient approach.",
          language: "JavaScript",
        },
      ],
    },
  },

  "Backend Developer": {
    "Node.js": {
      questions: [
        {
          question: "What is Node.js?",
          description: "Explain Node.js and why it is useful for backend development.",
          language: "JavaScript",
        },
        {
          question: "What is the Node.js event loop?",
          description: "Explain asynchronous execution in Node.js.",
          language: "JavaScript",
        },
        {
          question: "What is npm?",
          description: "Explain packages, package.json, and dependency management.",
          language: "JavaScript",
        },
        {
          question: "How do you handle errors in Node.js?",
          description: "Explain synchronous and asynchronous error handling.",
          language: "JavaScript",
        },
        {
          question: "What are environment variables?",
          description: "Explain how secrets and configuration are managed.",
          language: "JavaScript",
        },
      ],
    },

    "Express.js": {
      questions: [
        {
          question: "What is Express.js?",
          description: "Explain why Express is commonly used with Node.js.",
          language: "JavaScript",
        },
        {
          question: "What is middleware in Express?",
          description: "Explain middleware with a practical example.",
          language: "JavaScript",
        },
        {
          question: "How do you create routes in Express?",
          description: "Explain GET, POST, PUT, and DELETE routes.",
          language: "JavaScript",
        },
        {
          question: "How do you handle errors in Express?",
          description: "Explain centralized error handling.",
          language: "JavaScript",
        },
        {
          question: "How would you secure an Express API?",
          description: "Explain authentication, validation, and security practices.",
          language: "JavaScript",
        },
      ],
    },

    "REST APIs": {
      questions: [
        {
          question: "What is REST?",
          description: "Explain REST architecture and its principles.",
          language: "JavaScript",
        },
        {
          question: "What are HTTP status codes?",
          description: "Explain common success and error status codes.",
          language: "JavaScript",
        },
        {
          question: "What is the difference between PUT and PATCH?",
          description: "Explain when each method should be used.",
          language: "JavaScript",
        },
        {
          question: "What is authentication in an API?",
          description: "Explain common authentication approaches.",
          language: "JavaScript",
        },
        {
          question: "How do you validate API input?",
          description: "Explain why validation is important and how it can be implemented.",
          language: "JavaScript",
        },
      ],
    },

    Databases: {
      questions: [
        {
          question: "What is a database?",
          description: "Explain why applications need databases.",
          language: "JavaScript",
        },
        {
          question: "What is the difference between SQL and NoSQL?",
          description: "Compare relational and document databases.",
          language: "JavaScript",
        },
        {
          question: "What is an index?",
          description: "Explain how indexes improve query performance.",
          language: "JavaScript",
        },
        {
          question: "What is database normalization?",
          description: "Explain why normalization is used in relational databases.",
          language: "SQL",
        },
        {
          question: "How would you design a users collection/table?",
          description: "Explain important fields and relationships.",
          language: "SQL",
        },
      ],
    },

    "System Design": {
      questions: [
        {
          question: "What is scalability?",
          description: "Explain horizontal and vertical scaling.",
          language: "JavaScript",
        },
        {
          question: "What is load balancing?",
          description: "Explain how load balancers distribute traffic.",
          language: "JavaScript",
        },
        {
          question: "What is caching?",
          description: "Explain why caching improves application performance.",
          language: "JavaScript",
        },
        {
          question: "What is a database replica?",
          description: "Explain replication and its benefits.",
          language: "JavaScript",
        },
        {
          question: "How would you design a scalable chat application?",
          description: "Explain the major backend components you would consider.",
          language: "JavaScript",
        },
      ],
    },
  },

  "Full Stack Developer": {
    "MERN Stack": {
      questions: [
        {
          question: "What is the MERN stack?",
          description: "Explain MongoDB, Express, React, and Node.js.",
          language: "JavaScript",
        },
        {
          question: "How does React communicate with a Node.js backend?",
          description: "Explain API communication between frontend and backend.",
          language: "JavaScript",
        },
        {
          question: "How would you authenticate a MERN application?",
          description: "Explain a basic authentication flow.",
          language: "JavaScript",
        },
        {
          question: "How do you structure a MERN project?",
          description: "Explain a clean frontend and backend structure.",
          language: "JavaScript",
        },
        {
          question: "How would you deploy a MERN application?",
          description: "Explain frontend, backend, and database deployment.",
          language: "JavaScript",
        },
      ],
    },

    React: {
      questions: [
        {
          question: "What are React components?",
          description: "Explain reusable UI components.",
          language: "JavaScript",
        },
        {
          question: "What are props and state?",
          description: "Explain their differences and use cases.",
          language: "JavaScript",
        },
        {
          question: "What is useEffect?",
          description: "Explain side effects in React.",
          language: "JavaScript",
        },
        {
          question: "How does conditional rendering work?",
          description: "Explain common approaches.",
          language: "JavaScript",
        },
        {
          question: "How do you optimize a React application?",
          description: "Explain practical performance techniques.",
          language: "JavaScript",
        },
      ],
    },

    "Node.js": {
      questions: [
        {
          question: "Why is Node.js used for backend development?",
          description: "Explain its event-driven architecture.",
          language: "JavaScript",
        },
        {
          question: "What is asynchronous programming?",
          description: "Explain callbacks, promises, and async/await.",
          language: "JavaScript",
        },
        {
          question: "What is npm?",
          description: "Explain dependency management.",
          language: "JavaScript",
        },
        {
          question: "How do you create an API using Node.js?",
          description: "Explain the basic process.",
          language: "JavaScript",
        },
        {
          question: "How do you handle errors in Node.js?",
          description: "Explain error handling strategies.",
          language: "JavaScript",
        },
      ],
    },

    MongoDB: {
      questions: [
        {
          question: "What is MongoDB?",
          description: "Explain MongoDB and document-based storage.",
          language: "JavaScript",
        },
        {
          question: "What is a collection in MongoDB?",
          description: "Explain collections and documents.",
          language: "JavaScript",
        },
        {
          question: "What is MongoDB Atlas?",
          description: "Explain cloud-hosted MongoDB.",
          language: "JavaScript",
        },
        {
          question: "What are MongoDB indexes?",
          description: "Explain their purpose and benefits.",
          language: "JavaScript",
        },
        {
          question: "How do you connect Node.js to MongoDB?",
          description: "Explain the connection flow.",
          language: "JavaScript",
        },
      ],
    },

    "REST APIs": {
      questions: [
        {
          question: "What is a REST API?",
          description: "Explain REST and HTTP methods.",
          language: "JavaScript",
        },
        {
          question: "What is the difference between GET and POST?",
          description: "Explain their typical use cases.",
          language: "JavaScript",
        },
        {
          question: "What is authentication?",
          description: "Explain how APIs verify users.",
          language: "JavaScript",
        },
        {
          question: "How do you handle API errors?",
          description: "Explain status codes and error responses.",
          language: "JavaScript",
        },
        {
          question: "How do you test an API?",
          description: "Explain API testing approaches.",
          language: "JavaScript",
        },
      ],
    },
  },

  "Software Engineer": {
    "Data Structures & Algorithms": {
      questions: [
        {
          question: "What is Big O notation?",
          description: "Explain time and space complexity.",
          language: "JavaScript",
        },
        {
          question: "What is a linked list?",
          description: "Explain its structure and use cases.",
          language: "JavaScript",
        },
        {
          question: "How does binary search work?",
          description: "Explain the algorithm and complexity.",
          language: "JavaScript",
        },
        {
          question: "What is a stack?",
          description: "Explain LIFO behavior and use cases.",
          language: "JavaScript",
        },
        {
          question: "How would you detect duplicates in an array?",
          description: "Explain an efficient approach.",
          language: "JavaScript",
        },
      ],
    },

    "System Design": {
      questions: [
        {
          question: "What is scalability?",
          description: "Explain horizontal and vertical scaling.",
          language: "JavaScript",
        },
        {
          question: "What is load balancing?",
          description: "Explain how traffic is distributed.",
          language: "JavaScript",
        },
        {
          question: "What is caching?",
          description: "Explain caching and its benefits.",
          language: "JavaScript",
        },
        {
          question: "What is database replication?",
          description: "Explain why replication is useful.",
          language: "JavaScript",
        },
        {
          question: "How would you design a scalable web application?",
          description: "Explain the major components you would consider.",
          language: "JavaScript",
        },
      ],
    },

    "Object Oriented Programming": {
      questions: [
        {
          question: "What are the four pillars of OOP?",
          description: "Explain encapsulation, inheritance, polymorphism, and abstraction.",
          language: "JavaScript",
        },
        {
          question: "What is inheritance?",
          description: "Explain inheritance with an example.",
          language: "JavaScript",
        },
        {
          question: "What is polymorphism?",
          description: "Explain polymorphism with a practical example.",
          language: "JavaScript",
        },
        {
          question: "What is encapsulation?",
          description: "Explain how encapsulation improves code design.",
          language: "JavaScript",
        },
        {
          question: "What is abstraction?",
          description: "Explain abstraction and why it is useful.",
          language: "JavaScript",
        },
      ],
    },

    Databases: {
      questions: [
        {
          question: "What is a relational database?",
          description: "Explain tables, rows, columns, and relationships.",
          language: "SQL",
        },
        {
          question: "What is a primary key?",
          description: "Explain its purpose.",
          language: "SQL",
        },
        {
          question: "What is a foreign key?",
          description: "Explain relationships between tables.",
          language: "SQL",
        },
        {
          question: "What is database indexing?",
          description: "Explain how indexes improve performance.",
          language: "SQL",
        },
        {
          question: "What is normalization?",
          description: "Explain database normalization.",
          language: "SQL",
        },
      ],
    },

    "Problem Solving": {
      questions: [
        {
          question: "How do you approach a new programming problem?",
          description: "Explain your problem-solving process.",
          language: "JavaScript",
        },
        {
          question: "How do you debug a difficult issue?",
          description: "Explain a systematic debugging approach.",
          language: "JavaScript",
        },
        {
          question: "How do you optimize slow code?",
          description: "Explain how you identify and improve bottlenecks.",
          language: "JavaScript",
        },
        {
          question: "How do you handle edge cases?",
          description: "Explain why edge cases matter.",
          language: "JavaScript",
        },
        {
          question: "How do you test your solution?",
          description: "Explain unit testing and practical validation.",
          language: "JavaScript",
        },
      ],
    },
  },

  "Data Analyst": {
    Python: {
      questions: [
        {
          question: "How is Python used in data analysis?",
          description: "Explain common Python libraries used for data analysis.",
          language: "Python",
        },
        {
          question: "What is a Pandas DataFrame?",
          description: "Explain DataFrame structure and usage.",
          language: "Python",
        },
        {
          question: "How do you handle missing values in Python?",
          description: "Explain common approaches.",
          language: "Python",
        },
        {
          question: "How do you filter data using Pandas?",
          description: "Explain filtering with an example.",
          language: "Python",
        },
        {
          question: "How do you group data in Pandas?",
          description: "Explain groupby with an example.",
          language: "Python",
        },
      ],
    },

    SQL: {
      questions: [
        {
          question: "What is SQL?",
          description: "Explain how SQL is used for data analysis.",
          language: "SQL",
        },
        {
          question: "What is the difference between WHERE and HAVING?",
          description: "Explain filtering before and after aggregation.",
          language: "SQL",
        },
        {
          question: "What is a JOIN?",
          description: "Explain common SQL joins.",
          language: "SQL",
        },
        {
          question: "What is GROUP BY?",
          description: "Explain grouping and aggregation.",
          language: "SQL",
        },
        {
          question: "How would you find duplicate records?",
          description: "Explain an SQL approach.",
          language: "SQL",
        },
      ],
    },

    "Power BI": {
      questions: [
        {
          question: "What is Power BI?",
          description: "Explain its purpose in data analytics.",
          language: "DAX",
        },
        {
          question: "What is DAX?",
          description: "Explain how DAX is used in Power BI.",
          language: "DAX",
        },
        {
          question: "What are calculated columns?",
          description: "Explain calculated columns and measures.",
          language: "DAX",
        },
        {
          question: "What is a Power BI dashboard?",
          description: "Explain dashboards and reports.",
          language: "DAX",
        },
        {
          question: "How do you create relationships between tables?",
          description: "Explain data modeling in Power BI.",
          language: "DAX",
        },
      ],
    },

    Excel: {
      questions: [
        {
          question: "What are Pivot Tables?",
          description: "Explain how Pivot Tables help analyze data.",
          language: "Excel",
        },
        {
          question: "What is VLOOKUP?",
          description: "Explain lookup functionality in Excel.",
          language: "Excel",
        },
        {
          question: "What is XLOOKUP?",
          description: "Explain how XLOOKUP works.",
          language: "Excel",
        },
        {
          question: "How do you remove duplicate data?",
          description: "Explain Excel's duplicate removal tools.",
          language: "Excel",
        },
        {
          question: "How do you create charts in Excel?",
          description: "Explain choosing an appropriate chart.",
          language: "Excel",
        },
      ],
    },

    Statistics: {
      questions: [
        {
          question: "What is mean, median, and mode?",
          description: "Explain the three measures of central tendency.",
          language: "Python",
        },
        {
          question: "What is standard deviation?",
          description: "Explain what standard deviation tells us.",
          language: "Python",
        },
        {
          question: "What is correlation?",
          description: "Explain correlation and its interpretation.",
          language: "Python",
        },
        {
          question: "What is probability?",
          description: "Explain basic probability concepts.",
          language: "Python",
        },
        {
          question: "What is hypothesis testing?",
          description: "Explain the basic idea of hypothesis testing.",
          language: "Python",
        },
      ],
    },
  },

  "Data Scientist": {
    Python: {
      questions: [
        {
          question: "How is Python used in data science?",
          description: "Explain common Python libraries for data science.",
          language: "Python",
        },
        {
          question: "What is Pandas?",
          description: "Explain Pandas and DataFrames.",
          language: "Python",
        },
        {
          question: "What is NumPy?",
          description: "Explain NumPy arrays and numerical operations.",
          language: "Python",
        },
        {
          question: "How do you handle missing data?",
          description: "Explain different strategies.",
          language: "Python",
        },
        {
          question: "How do you visualize data in Python?",
          description: "Explain common visualization libraries.",
          language: "Python",
        },
      ],
    },

    Statistics: {
      questions: [
        {
          question: "What is variance?",
          description: "Explain variance and its relationship with standard deviation.",
          language: "Python",
        },
        {
          question: "What is correlation?",
          description: "Explain correlation between variables.",
          language: "Python",
        },
        {
          question: "What is a confidence interval?",
          description: "Explain confidence intervals.",
          language: "Python",
        },
        {
          question: "What is hypothesis testing?",
          description: "Explain null and alternative hypotheses.",
          language: "Python",
        },
        {
          question: "What is a p-value?",
          description: "Explain the meaning of a p-value.",
          language: "Python",
        },
      ],
    },

    "Machine Learning": {
      questions: [
        {
          question: "What is supervised learning?",
          description: "Explain supervised learning with examples.",
          language: "Python",
        },
        {
          question: "What is unsupervised learning?",
          description: "Explain clustering and dimensionality reduction.",
          language: "Python",
        },
        {
          question: "What is overfitting?",
          description: "Explain overfitting and how to reduce it.",
          language: "Python",
        },
        {
          question: "What is cross-validation?",
          description: "Explain why cross-validation is used.",
          language: "Python",
        },
        {
          question: "What is feature engineering?",
          description: "Explain why feature engineering matters.",
          language: "Python",
        },
      ],
    },

    Pandas: {
      questions: [
        {
          question: "What is a Pandas DataFrame?",
          description: "Explain DataFrame structure.",
          language: "Python",
        },
        {
          question: "How do you filter rows in Pandas?",
          description: "Explain filtering techniques.",
          language: "Python",
        },
        {
          question: "What is groupby in Pandas?",
          description: "Explain grouped data analysis.",
          language: "Python",
        },
        {
          question: "How do you merge DataFrames?",
          description: "Explain merge and join operations.",
          language: "Python",
        },
        {
          question: "How do you handle missing values?",
          description: "Explain fillna and dropna.",
          language: "Python",
        },
      ],
    },

    "Data Visualization": {
      questions: [
        {
          question: "Why is data visualization important?",
          description: "Explain how visualizations help communicate insights.",
          language: "Python",
        },
        {
          question: "When would you use a bar chart?",
          description: "Explain suitable use cases.",
          language: "Python",
        },
        {
          question: "When would you use a line chart?",
          description: "Explain time-series visualization.",
          language: "Python",
        },
        {
          question: "What is a scatter plot?",
          description: "Explain relationships between variables.",
          language: "Python",
        },
        {
          question: "How do you choose the right chart?",
          description: "Explain chart selection based on the data.",
          language: "Python",
        },
      ],
    },
  },

  "AI / ML Engineer": {
    "Machine Learning": {
      questions: [
        {
          question: "What is machine learning?",
          description: "Explain the basic idea of machine learning.",
          language: "Python",
        },
        {
          question: "What is supervised learning?",
          description: "Explain supervised learning with examples.",
          language: "Python",
        },
        {
          question: "What is overfitting?",
          description: "Explain overfitting and prevention techniques.",
          language: "Python",
        },
        {
          question: "What is model evaluation?",
          description: "Explain common evaluation metrics.",
          language: "Python",
        },
        {
          question: "What is feature engineering?",
          description: "Explain feature engineering.",
          language: "Python",
        },
      ],
    },

    "Deep Learning": {
      questions: [
        {
          question: "What is deep learning?",
          description: "Explain deep learning and neural networks.",
          language: "Python",
        },
        {
          question: "What is a neural network?",
          description: "Explain neurons, layers, and activation functions.",
          language: "Python",
        },
        {
          question: "What is backpropagation?",
          description: "Explain how neural networks learn.",
          language: "Python",
        },
        {
          question: "What is an activation function?",
          description: "Explain common activation functions.",
          language: "Python",
        },
        {
          question: "What is a CNN?",
          description: "Explain convolutional neural networks.",
          language: "Python",
        },
      ],
    },

    "Natural Language Processing": {
      questions: [
        {
          question: "What is Natural Language Processing?",
          description: "Explain NLP and its applications.",
          language: "Python",
        },
        {
          question: "What is tokenization?",
          description: "Explain how text is split into tokens.",
          language: "Python",
        },
        {
          question: "What are word embeddings?",
          description: "Explain how words are represented numerically.",
          language: "Python",
        },
        {
          question: "What is sentiment analysis?",
          description: "Explain sentiment classification.",
          language: "Python",
        },
        {
          question: "What is a transformer model?",
          description: "Explain the basic idea behind transformer architectures.",
          language: "Python",
        },
      ],
    },

    "Computer Vision": {
      questions: [
        {
          question: "What is computer vision?",
          description: "Explain how computers understand images and video.",
          language: "Python",
        },
        {
          question: "What is image classification?",
          description: "Explain image classification.",
          language: "Python",
        },
        {
          question: "What is object detection?",
          description: "Explain object detection and bounding boxes.",
          language: "Python",
        },
        {
          question: "What is image preprocessing?",
          description: "Explain common preprocessing techniques.",
          language: "Python",
        },
        {
          question: "What is a convolutional neural network?",
          description: "Explain CNNs for image processing.",
          language: "Python",
        },
      ],
    },

    Python: {
      questions: [
        {
          question: "Why is Python popular for AI and ML?",
          description: "Explain Python's ecosystem for AI development.",
          language: "Python",
        },
        {
          question: "What is NumPy?",
          description: "Explain NumPy and numerical computation.",
          language: "Python",
        },
        {
          question: "What is Pandas?",
          description: "Explain Pandas for data manipulation.",
          language: "Python",
        },
        {
          question: "What is scikit-learn?",
          description: "Explain its role in machine learning.",
          language: "Python",
        },
        {
          question: "How do you handle missing data in Python?",
          description: "Explain common approaches.",
          language: "Python",
        },
      ],
    },
  },
};

const questionSet =
  interviewQuestions[interview.role]?.[interview.topic] || {
    questions: [
      {
        question: `Tell me about your experience with ${interview.topic}.`,
        description: `Explain the important concepts of ${interview.topic} and describe how you would use them in a real-world project.`,
        language: "JavaScript",
      },
      {
        question: `What are the important concepts of ${interview.topic}?`,
        description: `Explain the concepts and give a practical example.`,
        language: "JavaScript",
      },
      {
        question: `How would you use ${interview.topic} in a real-world project?`,
        description: `Explain your approach with a suitable example.`,
        language: "JavaScript",
      },
    ],
  };

useEffect(() => {
  setQuestionNumber(0);
}, [interview.role, interview.topic]);

const currentQuestion =
  questionSet.questions[questionNumber] ||
  questionSet.questions[0];

// LOAD INTERVIEW SETTINGS
  
  // LOAD INTERVIEW SETTINGS
  useEffect(() => {
    const savedInterview = localStorage.getItem("interviewSetup");

    if (savedInterview) {
      try {
        const data = JSON.parse(savedInterview);

        setInterview(data);
        setSeconds(Number(data.duration || 30) * 60);
      } catch (error) {
        console.log("Invalid interview setup data");
      }
    }
  }, []);

  
// CAMERA + MICROPHONE
useEffect(() => {
  const startMedia = async () => {
    try {
      setCameraError("");

      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera/Microphone API is not supported");
      }

      const devices = await navigator.mediaDevices.enumerateDevices();

      const hasCamera = devices.some(
        (device) => device.kind === "videoinput"
      );

      const hasMicrophone = devices.some(
        (device) => device.kind === "audioinput"
      );

      console.log("Available devices:", devices);
      console.log("Camera available:", hasCamera);
      console.log("Microphone available:", hasMicrophone);

      if (!hasCamera) {
        setCameraError("No camera device detected by the browser.");
        return;
      }

      if (!hasMicrophone) {
        setCameraError("No microphone device detected by the browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Camera/Microphone error:", error);

      setCameraError(
        `Camera/Microphone error: ${error.name} - ${error.message}`
      );
    }
  };

  startMedia();

  return () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());
    }

    if (recordedVideoUrlRef.current) {
      URL.revokeObjectURL(recordedVideoUrlRef.current);
    }
  };
}, []);



  // TIMER
  useEffect(() => {
    if (paused || seconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, seconds]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(
    2,
    "0"
  )}:${String(remainingSeconds).padStart(2, "0")}`;

  // MICROPHONE
  const toggleMic = () => {
    if (!streamRef.current) return;

    const audioTracks =
      streamRef.current.getAudioTracks();

    audioTracks.forEach((track) => {
      track.enabled = !micOn;
    });

    setMicOn(!micOn);
  };

  // CAMERA
  const toggleCamera = () => {
    if (!streamRef.current) return;

    const videoTracks =
      streamRef.current.getVideoTracks();

    videoTracks.forEach((track) => {
      track.enabled = !cameraOn;
    });

    setCameraOn(!cameraOn);
  };

  // SCREEN SHARE

const toggleScreenShare = async () => {
  try {
    if (!screenSharing) {
      const screenStream =
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });

      const screenTrack =
        screenStream.getVideoTracks()[0];

      screenStreamRef.current = screenStream;

      // Camera preview ko wapas rakho
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject =
          streamRef.current;
      }

      screenTrack.onended = () => {
        setScreenSharing(false);

        if (screenStreamRef.current) {
          screenStreamRef.current
            .getTracks()
            .forEach((track) => track.stop());

          screenStreamRef.current = null;
        }

        if (
          videoRef.current &&
          streamRef.current
        ) {
          videoRef.current.srcObject =
            streamRef.current;
        }
      };

      setScreenSharing(true);

      console.log("Screen sharing started");
    } else {
      if (screenStreamRef.current) {
        screenStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());

        screenStreamRef.current = null;
      }

      setScreenSharing(false);

      if (
        videoRef.current &&
        streamRef.current
      ) {
        videoRef.current.srcObject =
          streamRef.current;
      }

      console.log("Screen sharing stopped");
    }
  } catch (error) {
    console.log("Screen sharing cancelled");
  }
};
const createCombinedStream = async () => {

      

  if (!streamRef.current) {
    throw new Error("Camera stream not available");
  }

  const cameraVideo = document.createElement("video");

  cameraVideo.srcObject = streamRef.current;
  cameraVideo.muted = true;
  cameraVideo.playsInline = true;

  await cameraVideo.play();

  const canvas = document.createElement("canvas");

  canvas.width = 1280;
  canvas.height = 720;

  canvasRef.current = canvas;

  const ctx = canvas.getContext("2d");

  let screenVideo = null;

  if (
    screenSharing &&
    screenStreamRef.current
  ) {
    screenVideo =
      document.createElement("video");

    screenVideo.srcObject =
      screenStreamRef.current;

    screenVideo.muted = true;
    screenVideo.playsInline = true;

    await screenVideo.play();
  }

  const drawFrame = () => {
    if (!ctx) return;

    ctx.fillStyle = "#000";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (screenVideo) {
      ctx.drawImage(
        screenVideo,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const cameraWidth = 260;
      const cameraHeight = 180;

      ctx.drawImage(
        cameraVideo,
        canvas.width -
          cameraWidth -
          20,
        canvas.height -
          cameraHeight -
          20,
        cameraWidth,
        cameraHeight
      );
    } else {
      ctx.drawImage(
        cameraVideo,
        0,
        0,
        canvas.width,
        canvas.height
      );
    }

    requestAnimationFrame(drawFrame);
  };

  drawFrame();

  const canvasStream =
    canvas.captureStream(30);

  canvasStreamRef.current =
    canvasStream;

  const audioTracks =
    streamRef.current.getAudioTracks();

  if (audioTracks.length > 0) {
    canvasStream.addTrack(
      audioTracks[0]
    );
  }

  return canvasStream;
};
   // START RECORDING
const startRecording = async () => {
  try {
    if (!streamRef.current) {
      alert("Camera and microphone are not available.");
      return;
    }

    if (!window.MediaRecorder) {
      alert("Your browser does not support video recording.");
      return;
    }

    const audioTracks =
      streamRef.current.getAudioTracks();

    console.log("Audio tracks:", audioTracks);

    console.log("MIC STATUS:", {
      enabled: audioTracks[0]?.enabled,
      muted: audioTracks[0]?.muted,
      readyState: audioTracks[0]?.readyState,
      label: audioTracks[0]?.label,
    });

    if (audioTracks.length === 0) {
      alert(
        "Microphone audio track is not available. Please allow microphone access."
      );
      return;
    }

    if (!audioTracks[0].enabled) {
      alert("Microphone is muted. Please turn Mic ON first.");
      return;
    }

    console.log("Creating combined recording stream...");

    const recordingStream =
      await createCombinedStream();

    console.log(
      "Recording tracks:",
      recordingStream.getTracks()
    );

    recordedChunksRef.current = [];

    const recorder =
      new MediaRecorder(recordingStream);

    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (event) => {
      console.log(
        "DATA:",
        event.data?.size,
        event.data?.type
      );

      if (
        event.data &&
        event.data.size > 0
      ) {
        recordedChunksRef.current.push(
          event.data
        );
      }
    };

    recorder.onstop = () => {
      console.log(
        "TOTAL CHUNKS:",
        recordedChunksRef.current.length
      );

      const blob = new Blob(
        recordedChunksRef.current,
        {
          type: recorder.mimeType,
        }
      );

      console.log(
        "BLOB TYPE:",
        blob.type
      );

      console.log(
        "BLOB SIZE:",
        blob.size
      );

      console.log(
        "BLOB IS VALID:",
        blob instanceof Blob
      );

      recordedBlobRef.current = blob;

      if (recordedVideoUrlRef.current) {
        URL.revokeObjectURL(
          recordedVideoUrlRef.current
        );
      }

      recordedVideoUrlRef.current =
        URL.createObjectURL(blob);

      setRecordedVideoUrl(
        recordedVideoUrlRef.current
      );

      setRecordingReady(true);

      console.log(
        "Interview recording ready"
      );

      console.log(
        "FINAL MIME TYPE:",
        blob.type
      );

      console.log(
        "Recording size:",
        blob.size
      );

      console.log(
        "Recording URL:",
        recordedVideoUrlRef.current
      );
    };

    recorder.onerror = (event) => {
      console.error(
        "MEDIA RECORDER ERROR:",
        event
      );
    };

    recorder.start();

    setRecording(true);
    setRecordingReady(false);

    console.log(
      screenSharing
        ? "Recording started: CAMERA + SCREEN + MICROPHONE"
        : "Recording started: CAMERA + MICROPHONE"
    );

  } catch (error) {
    console.error(
      "START RECORDING ERROR:",
      error
    );

    alert(
      "Could not start recording."
    );
  }
};


const downloadRecording = async () => {
  const blob = recordedBlobRef.current;

  console.log("RECORDING BLOB:", blob);
  console.log("RECORDING SIZE:", blob?.size);

  if (!blob || blob.size === 0) {
    alert("No recording available.");
    return;
  }

  try {
    const file = new File(
      [blob],
      `HireMind-AI-Interview-${Date.now()}.webm`,
      {
        type: "video/webm",
      }
    );

    if (window.showSaveFilePicker) {
      const handle = await window.showSaveFilePicker({
        suggestedName: file.name,
        types: [
          {
            description: "WebM Video",
            accept: {
              "video/webm": [".webm"],
            },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(file);
      await writable.close();

      console.log("Recording saved successfully!");
      return;
    }

    // Fallback
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 5000);

  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);

    if (error.name !== "AbortError") {
      alert("Could not save recording.");
    }
  }
};
const retakeInterview = () => {
  const recorder = mediaRecorderRef.current;

  if (recorder && recorder.state !== "inactive") {
    recorder.stop();
  }

  if (recordedVideoUrlRef.current) {
    URL.revokeObjectURL(recordedVideoUrlRef.current);
  }

  recordedVideoUrlRef.current = null;
  recordedBlobRef.current = null;
  recordedChunksRef.current = [];

  setRecordedVideoUrl("");
  setRecordingReady(false);
  setRecording(false);

  if (videoRef.current && streamRef.current) {
    videoRef.current.srcObject = streamRef.current;
  }

  console.log("Retake: old recording cleared");
};

  // STOP RECORDING
    const stopRecording = () => {
  const recorder = mediaRecorderRef.current;

  if (!recorder) {
    return;
  }

  if (recorder.state !== "inactive") {
    recorder.requestData();

    setTimeout(() => {
      if (recorder.state !== "inactive") {
        recorder.stop();
      }
    }, 200);
  }

  setRecording(false);
};
  // END INTERVIEW
const handleEndInterview = () => {
  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    alert("User information not found.");
    return;
  }

  let userData;

  try {
    userData = JSON.parse(savedUser);
  } catch (error) {
    console.log("Invalid user data");
    return;
  }

  if (!userData.email) {
    alert("User email not found.");
    return;
  }

  const historyKey = `interviewHistory_${userData.email}`;

  // Sirf CURRENT USER ki history read karo
  let interviews = [];

  try {
    const savedInterviews =
      localStorage.getItem(historyKey);

    if (savedInterviews) {
      interviews = JSON.parse(savedInterviews);
    }
  } catch (error) {
    console.log("Invalid interview history");
    interviews = [];
  }

  const newInterview = {
    id: Date.now(),
    role: interview.role,
    company: interview.company,
    topic: interview.topic,
    difficulty: interview.difficulty,
    duration: interview.duration,
    date: new Date().toLocaleDateString(),
    status: "Completed",
  };

  // Current interview ko sirf EK baar add karo
  interviews.unshift(newInterview);

  // Current user ki history mein save karo
  localStorage.setItem(
    historyKey,
    JSON.stringify(interviews)
  );

  // Stop recording
  if (
    mediaRecorderRef.current &&
    mediaRecorderRef.current.state !== "inactive"
  ) {
    mediaRecorderRef.current.stop();
  }

  // Stop camera + microphone
  if (streamRef.current) {
    streamRef.current
      .getTracks()
      .forEach((track) => track.stop());
  }

  // Stop screen sharing
  if (screenStreamRef.current) {
    screenStreamRef.current
      .getTracks()
      .forEach((track) => track.stop());

    screenStreamRef.current = null;
  }

  navigate("/dashboard");
};

  return (
    <div className="interview-room">

      {/* TOP BAR */}
      {/* TOP BAR */}

      <header className="interview-topbar">

        <div className="interview-brand">

          <div className="interview-logo">
            <BrainCircuit size={21} />
          </div>

          <div>
            <strong>HireMind AI</strong>
            <span>Mock Interview</span>
          </div>

        </div>

        <div className="interview-info">

          <div className="interview-role">
            <span>{interview.role}</span>

            <small>
              {interview.topic} ·{" "}
              {interview.difficulty}
            </small>
          </div>

          <div className="timer-box">
            <Clock3 size={17} />
            <span>{formattedTime}</span>
          </div>

        </div>

      </header>

      {/* MAIN */}

      <main className="interview-main">

        {/* LEFT SIDE */}

        <section className="interview-left">

          {/* QUESTION */}

         <div className="question-panel">

  <div className="question-header">

    <div>
      <span className="question-label">
  QUESTION {String(questionNumber + 1).padStart(2, "0")}
</span>
      <h1>{currentQuestion.question}</h1>
    </div>

    <div className="question-icon">
      <MessageSquare size={20} />
    </div>

  </div>

  <p>{currentQuestion.description}</p>

</div>
<div className="question-navigation">
  <button
    className="previous-question-btn"
    onClick={() => {
      if (questionNumber > 0) {
        setQuestionNumber((prev) => prev - 1);
      }
    }}
    disabled={questionNumber === 0}
  >
    ← Previous
  </button>

  <button
    className="next-question-btn"
    onClick={() => {
      if (questionNumber < questionSet.questions.length - 1) {
        setQuestionNumber((prev) => prev + 1);
      }
    }}
    disabled={
      questionNumber === questionSet.questions.length - 1
    }
  >
    {questionNumber === questionSet.questions.length - 1
      ? "Last Question"
      : "Next Question →"}
  </button>
</div>
          {/* MONACO CODE EDITOR */}

          <div className="code-panel">

            <div className="code-header">

              <div className="code-title">
                <Code2 size={17} />
                <span>Code Editor</span>
              </div>

              <span className="language-badge">
  {currentQuestion.language}
</span>

            </div>

            <div className="monaco-wrapper">

              <Editor
              key={`${interview.role}-${interview.topic}-${questionNumber}`}
                height="360px"
                defaultLanguage={
  currentQuestion.language === "Python"
    ? "python"
    : currentQuestion.language === "SQL"
    ? "sql"
    : currentQuestion.language === "CSS"
    ? "css"
    : "javascript"
}
                defaultValue={`function example() {
  // Write your solution here

  const message = "Hello HireMind AI";

  return message;
}`}
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: {
                    top: 15,
                  },
                }}
              />

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <aside className="interview-right">

          {/* CAMERA */}

          <div className="camera-card">

            <div className="camera-header">

              <span>
                <span className="live-dot"></span>
                Camera
              </span>

              <span
                className={
                  recording
                    ? "recording-text recording-active"
                    : "recording-text"
                }
              >
                {recording ? (
                  <>
                    <Circle
                      size={9}
                      fill="currentColor"
                    />
                    Recording
                  </>
                ) : (
                  "Ready"
                )}
              </span>

            </div>

            <div className="camera-preview">

              {cameraError ? (

                <div className="camera-off">

                  <VideoOff size={30} />

                  <span>
                    {cameraError}
                  </span>

                  <small>
                    Allow camera and microphone
                    access in your browser.
                  </small>

                </div>

              ) : (

                <video
  ref={videoRef}
  autoPlay
  muted
  playsInline
/>
              )}

            </div>

          </div>

          {/* CONTROLS */}

          <div className="controls-card">

            <div className="controls-title">
              Interview Controls
            </div>

            <div className="control-buttons">

              {/* MIC */}

              <button
                className={
                  micOn
                    ? "control-btn active"
                    : "control-btn"
                }
                onClick={toggleMic}
              >

                {micOn ? (
                  <Mic size={19} />
                ) : (
                  <MicOff size={19} />
                )}

                <span>
                  {micOn
                    ? "Mic"
                    : "Muted"}
                </span>

              </button>

              {/* CAMERA */}

              <button
                className={
                  cameraOn
                    ? "control-btn active"
                    : "control-btn"
                }
                onClick={toggleCamera}
              >

                {cameraOn ? (
                  <Video size={19} />
                ) : (
                  <VideoOff size={19} />
                )}

                <span>
                  {cameraOn
                    ? "Camera"
                    : "Off"}
                </span>

              </button>

              {/* SCREEN */}

              <button
                className={
                  screenSharing
                    ? "control-btn active"
                    : "control-btn"
                }
                onClick={toggleScreenShare}
              >

                {screenSharing ? (
                  <MonitorUp size={19} />
                ) : (
                  <MonitorOff size={19} />
                )}

                <span>
                  {screenSharing
                    ? "Sharing"
                    : "Screen"}
                </span>

              </button>

            </div>

            {/* RECORDING */}

            {!recording ? (

              <button
                className="record-interview-btn"
                onClick={startRecording}
              >
                <Circle
                  size={17}
                  fill="currentColor"
                />

                Start Recording
              </button>

            ) : (

              <button
                className="stop-recording-btn"
                onClick={stopRecording}
              >
                <Square
                  size={16}
                  fill="currentColor"
                />

                Stop Recording
              </button>

            )}

           {recordingReady && (
  <>
    <video
      key={recordedVideoUrl}
      src={recordedVideoUrl}
      controls
      playsInline
      style={{
        width: "100%",
        height: "220px",
        marginTop: "12px",
        borderRadius: "10px",
        background: "#000",
      }}
    />

    <button
      className="download-recording-btn"
      onClick={downloadRecording}
    >
      Download Recording
    </button>

    <button
      className="retake-interview-btn"
      onClick={retakeInterview}
    >
      Retake Interview
    </button>
  </>
)}
    



            {/* PAUSE */}

            <button
              className="pause-btn"
              onClick={() =>
                setPaused(!paused)
              }
            >

              {paused ? (
                <Play size={18} />
              ) : (
                <Pause size={18} />
              )}

              {paused
                ? "Resume Interview"
                : "Pause Interview"}

            </button>

            {/* END */}

            <button
              className="end-interview-btn"
              onClick={handleEndInterview}
            >

              <PhoneOff size={18} />

              End Interview

            </button>

          </div>

          {/* DETAILS */}

          <div className="details-card">

            <h3>Interview Details</h3>

            <div>
              <span>Role</span>
              <strong>
                {interview.role}
              </strong>
            </div>

            <div>
              <span>Company</span>
              <strong>
                {interview.company}
              </strong>
            </div>

            <div>
              <span>Topic</span>
              <strong>
                {interview.topic}
              </strong>
            </div>

            <div>
              <span>Difficulty</span>
              <strong>
                {interview.difficulty}
              </strong>
            </div>

          </div>

        </aside>

      </main>

    </div>
  );
}


export default InterviewRoom;