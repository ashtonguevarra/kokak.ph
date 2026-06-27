import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useListLanguages, useSubmitContribution, useListContributions, getListContributionsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  word: z.string().min(1, "Word is required"),
  languageCode: z.string().min(1, "Language is required"),
  meaning: z.string().min(1, "Meaning is required"),
  filipinoEquivalent: z.string().optional(),
});

export default function Contribute() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: languages } = useListLanguages();
  const { data: contributions, isLoading: isLoadingContributions } = useListContributions();
  const submitMutation = useSubmitContribution();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      word: "",
      languageCode: "",
      meaning: "",
      filipinoEquivalent: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitMutation.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Contribution submitted",
          description: "Thank you for expanding our dictionary!",
        });
        form.reset();
        queryClient.invalidateQueries({ queryKey: getListContributionsQueryKey() });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to submit contribution. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif mb-4">Contribute a Word</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Help us build the most comprehensive catalog of Philippine regional languages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card className="border-border/50 shadow-md bg-card">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">New Entry</CardTitle>
              <CardDescription>Add a new word to our growing collection.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="languageCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages?.map((lang) => (
                              <SelectItem key={lang.id} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="word"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Word</FormLabel>
                        <FormControl>
                          <Input className="bg-background font-mono text-lg" placeholder="e.g. balay" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meaning"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meaning in English</FormLabel>
                        <FormControl>
                          <Textarea className="bg-background resize-none" placeholder="e.g. house" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="filipinoEquivalent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Filipino Equivalent (Optional)</FormLabel>
                        <FormControl>
                          <Input className="bg-background" placeholder="e.g. bahay" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full font-bold tracking-wide" disabled={submitMutation.isPending}>
                    {submitMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Press to Record
                  </Button>

                  <Button type="submit" className="w-full font-bold tracking-wide" disabled={submitMutation.isPending}>
                    {submitMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Word
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>


        <div>
          <h2 className="text-2xl font-serif mb-6 text-foreground">Recent Contributions</h2>
          <div className="space-y-4">
            {isLoadingContributions ? (
              [1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl bg-muted/50" />)
            ) : Array.isArray(contributions) && contributions.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No contributions yet. Be the first!</p>
              </div>
            ) : (
              Array.isArray(contributions) && contributions.slice(0, 5).map(contribution => (
                <Card key={contribution.id} className="bg-card hover:border-primary/30 transition-colors shadow-sm">
                  <CardContent className="p-5 flex justify-between items-center">
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-lg font-serif">{contribution.word}</span>
                        <span className="text-xs text-primary font-bold uppercase tracking-widest">{contribution.languageCode}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{contribution.meaning}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        contribution.status === 'approved' ? 'default' :
                        contribution.status === 'rejected' ? 'destructive' : 'secondary'
                      } className="capitalize px-2 py-0.5">
                        {contribution.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-2 font-mono">
                        {format(new Date(contribution.submittedAt), 'MMM d')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
