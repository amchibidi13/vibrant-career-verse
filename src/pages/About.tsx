
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export default function About() {
  return (
    <div className="animate-fade-in">
      <section className="pt-16 pb-12">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="About Me" 
            subtitle="Learn more about my background, skills, and journey as a data scientist and analyst."
          />

          <div className="grid md:grid-cols-3 gap-12 mt-8">
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="bg-secondary/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Connect</h3>
                
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a 
                      href="https://github.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a 
                      href="mailto:example@example.com"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </a>
                  </Button>
                  
                  <Button variant="default" className="w-full justify-start" asChild>
                    <a 
                      href="#"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="prose-custom">
                <h2 className="text-3xl font-semibold mb-6">My Journey</h2>
                
                <p className="mb-4">
                  Hello! I'm a data scientist and analyst with over 7 years of experience turning complex data into actionable insights. 
                  My passion lies in solving real-world problems through data analysis, statistical modeling, and machine learning.
                </p>
                
                <p className="mb-4">
                  I began my journey with a strong foundation in mathematics and statistics, which eventually led me to discover the power 
                  of data science. Throughout my career, I've worked across various industries including finance, healthcare, retail, and 
                  technology, giving me a diverse perspective on how data can drive decisions in different contexts.
                </p>
                
                <p className="mb-8">
                  What excites me most about data science is the combination of technical problem-solving and the creative aspects of 
                  communicating insights effectively. I believe that the best data scientists are also skilled storytellers who can translate 
                  complex findings into clear, actionable recommendations.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4">Education</h2>
                
                <div className="mb-8">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium">Master of Science in Data Science</h3>
                    <p className="text-muted-foreground">University of Data Analytics, 2018</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium">Bachelor of Science in Mathematics</h3>
                    <p className="text-muted-foreground">State University, 2016</p>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Professional Experience</h2>
                
                <div className="mb-4">
                  <h3 className="text-xl font-medium">Senior Data Scientist</h3>
                  <p className="text-muted-foreground">Tech Innovations Inc., 2021 - Present</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Lead data science initiatives focused on customer behavior analysis</li>
                    <li>Developed machine learning models that improved prediction accuracy by 35%</li>
                    <li>Collaborate with cross-functional teams to implement data-driven solutions</li>
                  </ul>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-medium">Data Analyst</h3>
                  <p className="text-muted-foreground">Analytics Partners, 2018 - 2021</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Conducted exploratory data analysis for clients across multiple industries</li>
                    <li>Created interactive dashboards for real-time business monitoring</li>
                    <li>Developed and maintained ETL pipelines for data processing</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium">Research Assistant</h3>
                  <p className="text-muted-foreground">University Research Lab, 2016 - 2018</p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Assisted in research on statistical modeling techniques</li>
                    <li>Published two papers in peer-reviewed journals</li>
                    <li>Developed algorithms for pattern recognition in large datasets</li>
                  </ul>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Skills & Expertise</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-medium mb-2">Technical Skills</h3>
                    <ul className="list-disc pl-6">
                      <li>Python (Pandas, NumPy, Scikit-learn, TensorFlow)</li>
                      <li>SQL & Database Management</li>
                      <li>Data Visualization (Tableau, PowerBI, Matplotlib)</li>
                      <li>Machine Learning & Statistical Modeling</li>
                      <li>Big Data Technologies (Spark, Hadoop)</li>
                      <li>Cloud Platforms (AWS, Google Cloud)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Domain Knowledge</h3>
                    <ul className="list-disc pl-6">
                      <li>Predictive Analytics</li>
                      <li>Customer Segmentation</li>
                      <li>Time Series Analysis</li>
                      <li>Natural Language Processing</li>
                      <li>Recommendation Systems</li>
                      <li>A/B Testing & Experimentation</li>
                    </ul>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mb-4">Interests & Hobbies</h2>
                
                <p className="mb-8">
                  Outside of work, I enjoy hiking, photography, and playing chess. I'm also an avid reader of science fiction and 
                  actively participate in local data science meetups and hackathons. In my free time, I contribute to open-source 
                  data science projects and mentor aspiring data scientists.
                </p>
              </div>
              
              <div className="mt-8">
                <Button asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
