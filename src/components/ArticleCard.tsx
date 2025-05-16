
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  tags: string[];
  url: string;
}

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to={`/articles/${article.id}`} className="group h-full">
      <Card className="overflow-hidden h-full transition-all hover:border-primary/50 hover:shadow-md">
        <div className="aspect-video overflow-hidden">
          <img 
            src={article.image} 
            alt={article.title} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader className="py-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">{article.title}</h3>
            <time className="text-xs text-muted-foreground">
              {article.date}
            </time>
          </div>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-muted-foreground line-clamp-2">{article.summary}</p>
        </CardContent>
        <CardFooter className="pt-2 pb-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="font-normal">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
