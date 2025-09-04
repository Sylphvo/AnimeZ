import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MovieCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export function MovieCard({ title, description, imageUrl }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
