"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRecipeSuggestions, type RecipeState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/lib/data";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ChefHat } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Get Recipes"
      )}
    </Button>
  );
}

export function RecipeSuggestions() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: RecipeState = {};
  const [state, dispatch] = useFormState(getRecipeSuggestions, initialState);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: state.error,
      });
    }
    if (state?.recipes) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                AI Recipe Suggestions
              </CardTitle>
              <CardDescription>
                Select a honey type and let our AI chef suggest delicious recipes for you.
              </CardDescription>
            </CardHeader>
            <form action={dispatch} ref={formRef}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="honeyType">Type of Honey</Label>
                  <Select name="honeyType" required>
                    <SelectTrigger id="honeyType">
                      <SelectValue placeholder="Select a honey" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userPreferences">Dietary Preferences (Optional)</Label>
                  <Textarea
                    id="userPreferences"
                    name="userPreferences"
                    placeholder="e.g., vegetarian, gluten-free, quick and easy"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
          {state?.recipes ? (
            <div className="space-y-6">
              <h3 className="font-headline text-3xl font-bold">Your delicious suggestions:</h3>
              {state.recipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{recipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="ingredients">
                        <AccordionTrigger>Ingredients</AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none whitespace-pre-line">
                            {recipe.ingredients}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="instructions">
                        <AccordionTrigger>Instructions</AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none whitespace-pre-line">
                            {recipe.instructions}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center bg-card p-12 rounded-lg h-full min-h-[400px]">
              <ChefHat className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="font-headline text-2xl font-bold">Recipes will appear here</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">
                Fill out the form to the left to get started and discover your next favorite meal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
