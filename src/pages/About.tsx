
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { FileText, ArrowDown } from "lucide-react";

export default function About() {
  return (
    <div className="animate-fade-in">
      <section className="pt-16 pb-20">
        <div className="container px-6 max-w-7xl mx-auto">
          <SectionHeading 
            title="About Me" 
            subtitle="Learn more about my background and experience in data science and analytics."
          />
          
          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">My Journey</h2>
              
              <div className="space-y-6 text-muted-foreground">
                <p>
                  I'm a data scientist and analyst with over 5 years of experience working with complex datasets 
                  and building machine learning models. My passion lies in transforming raw data into actionable 
                  insights that help businesses make better decisions.
                </p>
                
                <p>
                  After completing my Master's degree in Data Science from Stanford University, I joined a 
                  health tech startup where I developed predictive models for patient outcomes. This experience 
                  taught me the importance of balancing technical expertise with clear communication of results.
                </p>
                
                <p>
                  Later, I moved to a larger tech company where I led a team of analysts focused on customer 
                  behavior analysis and market trends. We implemented several key initiatives that increased 
                  customer retention by 15% and optimized marketing spend across channels.
                </p>
                
                <p>
                  Currently, I work as a freelance data consultant, helping companies leverage their data 
                  assets through custom analytics solutions and machine learning models. I'm particularly 
                  interested in time series forecasting, customer segmentation, and natural language processing.
                </p>
                
                <p>
                  When I'm not working with data, I enjoy hiking, photography, and contributing to open source 
                  projects. I'm also an avid reader and particularly enjoy books on technology trends, 
                  behavioral economics, and science fiction.
                </p>
              </div>
              
              <div className="mt-8">
                <Button className="flex items-center gap-2" asChild>
                  <a href="/resume.pdf" download>
                    <FileText className="h-4 w-4" />
                    Download Resume
                    <ArrowDown className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium">Stanford University</h3>
                  <p className="text-sm text-muted-foreground">M.S. Data Science, 2018</p>
                </div>
                <div>
                  <h3 className="font-medium">University of California, Berkeley</h3>
                  <p className="text-sm text-muted-foreground">B.S. Computer Science, 2016</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mt-12 mb-6">Skills</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Programming</h3>
                  <p className="text-sm text-muted-foreground">Python, R, SQL, JavaScript</p>
                </div>
                <div>
                  <h3 className="font-medium">Data Visualization</h3>
                  <p className="text-sm text-muted-foreground">Tableau, PowerBI, D3.js, Matplotlib</p>
                </div>
                <div>
                  <h3 className="font-medium">Machine Learning</h3>
                  <p className="text-sm text-muted-foreground">Scikit-learn, TensorFlow, PyTorch</p>
                </div>
                <div>
                  <h3 className="font-medium">Big Data</h3>
                  <p className="text-sm text-muted-foreground">Spark, Hadoop, AWS, Google Cloud</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
