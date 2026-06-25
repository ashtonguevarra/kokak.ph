import { useListLanguages } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: languages, isLoading } = useListLanguages();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground">Choose a Language</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover the rich regional languages of the Philippines, one word at a time.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl bg-muted/50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages?.map((lang) => (
            <Link key={lang.id} href={`/play?lang=${lang.code}`} className="block group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/30 bg-card">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                    {lang.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {lang.code.toUpperCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                    {lang.wordCount} words available
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          {languages?.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No languages available yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
