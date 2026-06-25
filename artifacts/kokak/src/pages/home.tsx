import { useListLanguages } from "@workspace/api-client-react";
import { Link } from "wouter";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data, isLoading, error } = useListLanguages();

  // Support both:
  // 1. Array response
  // 2. { languages: [...] } response
  const languages = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.languages)
      ? (data as any).languages
      : [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Failed to load languages
        </h2>

        <p className="text-muted-foreground mt-2">
          Please make sure your backend is running.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif">
          Choose a Language
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover the rich regional languages of the Philippines,
          one word at a time.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="h-40 rounded-xl bg-muted/50"
            />
          ))}
        </div>
      ) : languages.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">
            No languages available
          </h2>

          <p className="text-muted-foreground mt-2">
            Add languages to your database to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((lang: any) => (
            <Link
              key={lang.id}
              href={`/play?lang=${lang.code}`}
              className="block group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl hover:border-primary hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                    {lang.name}
                  </CardTitle>

                  <CardDescription>
                    {lang.code.toUpperCase()}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {lang.wordCount ?? 0} words
                    </span>

                    <span className="text-primary font-semibold">
                      →
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}