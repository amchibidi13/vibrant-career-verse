
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

// Sample data - would come from a database in a real app
const articles = [
  {
    id: "machine-learning-fundamentals",
    title: "Machine Learning Fundamentals for Data Scientists",
    summary: "An in-depth guide to the core concepts of machine learning that every data scientist should understand.",
    date: "June 15, 2023",
    content: `
      # Machine Learning Fundamentals for Data Scientists

      Machine learning is a rapidly evolving field at the intersection of statistics, computer science, and domain expertise. Whether you're just starting out or looking to refresh your knowledge, understanding the fundamental concepts is essential for building effective models and solutions.

      ## Types of Machine Learning

      Machine learning can be broadly categorized into three main types:

      ### Supervised Learning

      In supervised learning, the algorithm learns from labeled training data. The goal is to learn a mapping function that can predict the output for new, unseen inputs.

      Common supervised learning algorithms include:
      - Linear Regression
      - Logistic Regression
      - Decision Trees
      - Random Forests
      - Support Vector Machines (SVM)
      - Neural Networks

      ### Unsupervised Learning

      Unsupervised learning deals with unlabeled data. The algorithm tries to find patterns or structures in the data without explicit guidance.

      Popular unsupervised learning algorithms include:
      - K-means Clustering
      - Hierarchical Clustering
      - Principal Component Analysis (PCA)
      - t-SNE
      - Autoencoders

      ### Reinforcement Learning

      In reinforcement learning, an agent learns to make decisions by interacting with an environment. The agent receives rewards or penalties for its actions and learns to maximize cumulative rewards.

      Examples of reinforcement learning algorithms:
      - Q-Learning
      - Deep Q Networks (DQN)
      - Policy Gradient Methods
      - Proximal Policy Optimization (PPO)

      ## The Machine Learning Process

      A typical machine learning project follows these steps:

      1. **Problem Definition**: Clearly define what you're trying to solve and how machine learning can help.
      
      2. **Data Collection**: Gather relevant data from various sources.
      
      3. **Data Preprocessing**: Clean and prepare your data for modeling.
         - Handle missing values
         - Encode categorical variables
         - Scale or normalize features
         - Split into training and testing sets
      
      4. **Feature Engineering**: Create new features or transform existing ones to improve model performance.
      
      5. **Model Selection**: Choose appropriate algorithms based on your problem and data.
      
      6. **Model Training**: Fit the model to your training data.
      
      7. **Model Evaluation**: Assess model performance on a held-out test set.
      
      8. **Model Tuning**: Optimize hyperparameters to improve performance.
      
      9. **Model Deployment**: Put your model into production.
      
      10. **Monitoring and Maintenance**: Continuously monitor and update your model as needed.

      ## Evaluation Metrics

      Choosing the right evaluation metrics is crucial for assessing model performance. Common metrics include:

      ### For Regression Problems
      - Mean Absolute Error (MAE)
      - Mean Squared Error (MSE)
      - Root Mean Squared Error (RMSE)
      - R-squared

      ### For Classification Problems
      - Accuracy
      - Precision
      - Recall
      - F1-Score
      - Area Under the ROC Curve (AUC-ROC)
      - Confusion Matrix

      ## Common Challenges in Machine Learning

      ### Overfitting
      
      Overfitting occurs when a model learns the training data too well, including its noise and outliers. This leads to poor generalization on new, unseen data.

      Techniques to prevent overfitting:
      - Cross-validation
      - Regularization (L1, L2)
      - Dropout (for neural networks)
      - Early stopping
      - Ensemble methods

      ### Underfitting
      
      Underfitting happens when a model is too simple to capture the underlying pattern in the data.

      Ways to address underfitting:
      - Use more complex models
      - Add more features
      - Reduce regularization
      - Feature engineering

      ### Class Imbalance
      
      When the distribution of classes in your dataset is skewed, models tend to favor the majority class.

      Techniques to handle class imbalance:
      - Resampling (oversampling minority class or undersampling majority class)
      - SMOTE (Synthetic Minority Over-sampling Technique)
      - Class weights
      - Use appropriate evaluation metrics (not just accuracy)

      ## Conclusion

      Understanding these machine learning fundamentals will provide you with a solid foundation for tackling real-world data science problems. As you progress, you'll develop intuition about which algorithms and techniques are appropriate for different scenarios.

      Remember that machine learning is as much an art as it is a science. While theoretical knowledge is important, practical experience and experimentation are invaluable for developing expertise in this field.
    `,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    tags: ["Machine Learning", "Data Science", "Tutorial"],
    authorName: "John Doe",
    authorImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    authorTitle: "Senior Data Scientist"
  },
  {
    id: "data-visualization-best-practices",
    title: "Data Visualization Best Practices",
    summary: "How to create effective data visualizations that communicate insights clearly and avoid common pitfalls.",
    date: "May 22, 2023",
    content: `
      # Data Visualization Best Practices

      Effective data visualization is essential for communicating insights and helping stakeholders make informed decisions. This article covers key principles and best practices to create clear, accurate, and impactful data visualizations.

      ## Core Principles of Data Visualization

      ### 1. Know Your Audience

      Different audiences have different needs, expectations, and levels of familiarity with data. Consider:
      
      - Technical expertise
      - Familiarity with the subject matter
      - How they'll use the information
      - Time constraints
      
      A visualization for data scientists might include technical details and statistical measures, while one for executives should focus on high-level insights and business implications.

      ### 2. Choose the Right Chart Type

      Selecting the appropriate chart type is crucial for effectively communicating your data:

      - **Bar charts**: Best for comparing categories
      - **Line charts**: Ideal for showing trends over time
      - **Scatter plots**: Perfect for showing relationships between variables
      - **Pie charts**: Use sparingly, only for showing parts of a whole when there are few categories
      - **Heatmaps**: Excellent for showing patterns across two dimensions
      - **Histograms**: Best for showing distributions
      - **Box plots**: Great for showing statistical summaries and outliers

      ### 3. Simplify

      Remove unnecessary elements that don't contribute to understanding:

      - Eliminate chart junk (decorative elements)
      - Reduce the ink-to-data ratio
      - Use a clean, minimal design
      - Focus attention on the data, not the design

      ### 4. Use Color Effectively

      Color is powerful but can be misused:

      - Use color purposefully to highlight important information
      - Ensure sufficient contrast
      - Consider color blindness (about 8% of men have some form of color blindness)
      - Use a consistent color palette throughout related visualizations
      - Avoid using too many colors in one visualization

      ### 5. Label Appropriately

      Clear labeling helps viewers understand the data without having to decode it:

      - Use descriptive titles and subtitles
      - Label axes clearly
      - Include units of measurement
      - Add data labels where appropriate
      - Include a legend if needed

      ## Common Pitfalls to Avoid

      ### Truncated Axes

      Starting a numerical axis at a value other than zero can exaggerate differences and mislead viewers. While there are legitimate reasons to use a non-zero baseline in some cases (like when showing small changes in large values), always make it clear when you're doing so.

      ### 3D Charts

      3D effects often distort data and make it harder to accurately interpret values. Avoid 3D charts unless you're actually plotting three-dimensional data.

      ### Overloading with Information

      Trying to show too much in a single visualization can overwhelm viewers. Consider breaking complex information into multiple, simpler visualizations or using interactive features to allow users to explore the data.

      ### Using Pie Charts for Many Categories

      Pie charts become difficult to interpret when they contain more than a few categories. Consider using a bar chart instead when dealing with more than 5-7 categories.

      ### Ignoring Accessibility

      Make sure your visualizations are accessible to all users:

      - Use high contrast colors
      - Avoid relying solely on color to convey information
      - Add alt text for digital visualizations
      - Include data tables alongside complex visualizations

      ## Advanced Tips

      ### Use Consistent Scales

      When presenting multiple visualizations side-by-side, use consistent scales to allow for accurate comparison.

      ### Consider Context

      Provide context to help viewers understand the significance of the data:

      - Include benchmarks or averages
      - Show historical trends
      - Add annotations for important events or outliers

      ### Design for the Medium

      Consider how and where your visualization will be viewed:

      - Presentations need simpler, more impactful visuals
      - Dashboards should enable quick insights
      - Print materials may need higher resolution and different color considerations
      - Mobile devices require responsive design

      ### Tell a Story

      The most effective data visualizations tell a compelling story:

      - Have a clear narrative
      - Guide viewers through the data
      - Highlight key insights
      - Connect data points to real-world implications

      ## Tools for Data Visualization

      There are many excellent tools available for creating visualizations:

      - **Python**: Matplotlib, Seaborn, Plotly
      - **R**: ggplot2
      - **Business Intelligence**: Tableau, PowerBI, Looker
      - **JavaScript**: D3.js, Chart.js
      - **General Purpose**: Excel, Google Sheets

      ## Conclusion

      Effective data visualization is both an art and a science. By following these best practices, you can create visualizations that not only accurately represent your data but also engage your audience and drive understanding.

      Remember that the ultimate goal of data visualization is not to create something pretty, but to effectively communicate insights that lead to better decisions.
    `,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Data Visualization", "Design", "Tutorial"],
    authorName: "Jane Smith",
    authorImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    authorTitle: "Data Visualization Specialist"
  },
  {
    id: "sql-for-data-analysis",
    title: "Advanced SQL Techniques for Data Analysis",
    summary: "Take your SQL skills to the next level with these advanced techniques specifically for data analysis tasks.",
    date: "April 10, 2023",
    content: `
      # Advanced SQL Techniques for Data Analysis

      SQL is a powerful tool for data analysis that goes far beyond simple SELECT statements. This article explores advanced SQL techniques that can help you extract deeper insights from your data more efficiently.

      ## Window Functions

      Window functions perform calculations across a set of table rows related to the current row. They're incredibly powerful for analytical tasks.

      ### RANK, DENSE_RANK, and ROW_NUMBER

      These functions assign ranks to rows based on specified values:

      \`\`\`sql
      SELECT 
        employee_name,
        department,
        salary,
        RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dense_salary_rank,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as row_num
      FROM employees;
      \`\`\`

      - **RANK**: Assigns ranks with gaps for ties
      - **DENSE_RANK**: Assigns ranks without gaps
      - **ROW_NUMBER**: Assigns unique sequential integers

      ### Running Totals and Moving Averages

      Calculate cumulative sums and moving averages:

      \`\`\`sql
      -- Running total of sales
      SELECT 
        sale_date,
        amount,
        SUM(amount) OVER (ORDER BY sale_date) as running_total
      FROM sales;

      -- 7-day moving average
      SELECT 
        sale_date,
        amount,
        AVG(amount) OVER (
          ORDER BY sale_date 
          ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) as moving_avg_7day
      FROM daily_sales;
      \`\`\`

      ### LAG and LEAD

      Access data from previous or subsequent rows:

      \`\`\`sql
      SELECT 
        sale_date,
        amount,
        LAG(amount) OVER (ORDER BY sale_date) as previous_day_amount,
        LEAD(amount) OVER (ORDER BY sale_date) as next_day_amount,
        amount - LAG(amount) OVER (ORDER BY sale_date) as day_over_day_change
      FROM daily_sales;
      \`\`\`

      ## Common Table Expressions (CTEs)

      CTEs create named temporary result sets that you can reference within a SELECT, INSERT, UPDATE, or DELETE statement.

      ### Basic CTE

      \`\`\`sql
      WITH high_value_customers AS (
        SELECT customer_id, SUM(purchase_amount) as total_purchases
        FROM orders
        GROUP BY customer_id
        HAVING SUM(purchase_amount) > 10000
      )
      SELECT c.customer_name, h.total_purchases
      FROM high_value_customers h
      JOIN customers c ON h.customer_id = c.id;
      \`\`\`

      ### Recursive CTEs

      Recursive CTEs are particularly useful for hierarchical or graph-structured data:

      \`\`\`sql
      WITH RECURSIVE employee_hierarchy AS (
        -- Base case: top-level employees (no manager)
        SELECT id, name, manager_id, 1 as level
        FROM employees
        WHERE manager_id IS NULL
        
        UNION ALL
        
        -- Recursive case: employees with managers
        SELECT e.id, e.name, e.manager_id, eh.level + 1
        FROM employees e
        JOIN employee_hierarchy eh ON e.manager_id = eh.id
      )
      SELECT * FROM employee_hierarchy
      ORDER BY level, id;
      \`\`\`

      ## Advanced Aggregations

      ### GROUPING SETS, ROLLUP, and CUBE

      Generate multiple grouping combinations in a single query:

      \`\`\`sql
      -- GROUPING SETS: specific combinations
      SELECT 
        COALESCE(category, 'All Categories') as category,
        COALESCE(region, 'All Regions') as region,
        SUM(sales) as total_sales
      FROM sales_data
      GROUP BY GROUPING SETS (
        (category, region),
        (category),
        (region),
        ()
      );

      -- ROLLUP: hierarchical subtotals
      SELECT 
        COALESCE(year, 'All Years') as year,
        COALESCE(quarter, 'All Quarters') as quarter,
        COALESCE(month, 'All Months') as month,
        SUM(sales) as total_sales
      FROM sales_data
      GROUP BY ROLLUP (year, quarter, month);

      -- CUBE: all possible combinations
      SELECT 
        COALESCE(category, 'All Categories') as category,
        COALESCE(region, 'All Regions') as region,
        COALESCE(product, 'All Products') as product,
        SUM(sales) as total_sales
      FROM sales_data
      GROUP BY CUBE (category, region, product);
      \`\`\`

      ### Conditional Aggregations

      Use CASE statements within aggregations for more complex analyses:

      \`\`\`sql
      SELECT 
        product_category,
        SUM(CASE WHEN customer_age < 25 THEN sales_amount ELSE 0 END) as under_25_sales,
        SUM(CASE WHEN customer_age BETWEEN 25 AND 40 THEN sales_amount ELSE 0 END) as mid_age_sales,
        SUM(CASE WHEN customer_age > 40 THEN sales_amount ELSE 0 END) as older_sales
      FROM sales
      GROUP BY product_category;
      \`\`\`

      ## Advanced Joins and Set Operations

      ### Self Joins

      Join a table to itself to find relationships within the data:

      \`\`\`sql
      -- Find employees who have the same manager
      SELECT 
        e1.employee_name,
        e2.employee_name as colleague
      FROM employees e1
      JOIN employees e2 
        ON e1.manager_id = e2.manager_id
        AND e1.employee_id < e2.employee_id;
      \`\`\`

      ### INTERSECT, EXCEPT, and UNION

      Combine or compare results from multiple queries:

      \`\`\`sql
      -- Customers who bought both Product A and Product B
      SELECT customer_id
      FROM orders
      WHERE product_id = 'A'
      INTERSECT
      SELECT customer_id
      FROM orders
      WHERE product_id = 'B';

      -- Customers who bought Product A but not Product B
      SELECT customer_id
      FROM orders
      WHERE product_id = 'A'
      EXCEPT
      SELECT customer_id
      FROM orders
      WHERE product_id = 'B';
      \`\`\`

      ## Pivoting and Unpivoting Data

      ### Dynamic PIVOT

      Transform rows into columns:

      \`\`\`sql
      -- Example for SQL Server
      DECLARE @columns NVARCHAR(MAX) = '';
      DECLARE @sql NVARCHAR(MAX) = '';

      -- Generate the column names dynamically
      SELECT @columns = @columns + QUOTENAME(quarter_name) + ','
      FROM (SELECT DISTINCT quarter_name FROM quarterly_sales) as quarters
      ORDER BY quarter_name;

      SET @columns = LEFT(@columns, LEN(@columns) - 1);

      -- Construct the pivot query
      SET @sql = '
      SELECT product, ' + @columns + '
      FROM (
          SELECT product, quarter_name, sales_amount
          FROM quarterly_sales
      ) as source
      PIVOT (
          SUM(sales_amount)
          FOR quarter_name IN (' + @columns + ')
      ) as pivot_table;';

      EXEC sp_executesql @sql;
      \`\`\`

      ## Performance Optimization

      ### Indexing Strategies

      Understanding index usage is critical for query performance:

      1. **Covering indexes**: Include all columns needed by a query
      2. **Filtered indexes**: Create indexes on a subset of rows
      3. **Composite indexes**: Index multiple columns together
      4. **Index order**: Put highly selective columns first

      ### Query Optimization

      Tips for writing efficient queries:

      1. Be specific in SELECT statements (avoid SELECT *)
      2. Filter early to reduce processing load
      3. Use JOINs properly (understand execution plans)
      4. Consider using temporary tables for complex multi-step analyses
      5. Use EXPLAIN or equivalent to understand query execution

      ## Conclusion

      Mastering these advanced SQL techniques can significantly enhance your data analysis capabilities. They allow you to express complex analytical logic directly in your database queries, often eliminating the need to export data for processing in other tools.

      Remember that different database systems may have varying syntax for these features. Always consult your specific database's documentation for precise implementation details.

      As you incorporate these techniques into your analytical toolkit, you'll find yourself able to answer increasingly sophisticated questions with your data, all while leveraging the performance benefits of modern database engines.
    `,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    tags: ["SQL", "Data Analysis", "Database"],
    authorName: "Michael Brown",
    authorImage: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    authorTitle: "Database Specialist"
  }
];

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  
  const article = articles.find(article => article.id === id);
  
  if (!article) {
    return (
      <div className="container px-6 max-w-7xl mx-auto py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/articles">Back to Articles</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Convert markdown-like content to JSX
  const renderContent = () => {
    const lines = article.content.split('\n');
    return lines.map((line, index) => {
      line = line.trim();
      if (!line) return <div key={index} className="my-4"></div>;
      
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-8 mb-6">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-medium mt-6 mb-3">{line.substring(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
      } else if (line.startsWith('```')) {
        return (
          <pre key={index} className="bg-secondary p-4 rounded-lg overflow-x-auto my-4">
            <code>{lines[index + 1]}</code>
          </pre>
        );
      } else if (line.includes('```')) {
        return null; // Skip code block closing tags
      } else {
        return <p key={index} className="mb-4">{line}</p>;
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="container px-6 max-w-7xl mx-auto pt-8 pb-20">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/articles" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img 
                  src={article.authorImage} 
                  alt={article.authorName}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <p className="font-medium">{article.authorName}</p>
                <p className="text-sm text-muted-foreground">{article.authorTitle}</p>
              </div>
              <div className="ml-auto text-sm text-muted-foreground">{article.date}</div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-auto object-cover" 
            />
          </div>
          
          <div className="prose-custom">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
