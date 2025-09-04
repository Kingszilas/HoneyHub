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
import { useLanguage } from "@/contexts/language-context";


function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useLanguage();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('home.recipeSuggestions.generating')}
        </>
      ) : (
        t('home.recipeSuggestions.getRecipes')
      )}
    </Button>
  );
}

export function RecipeSuggestions() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
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
  
  const getProductName = (product: (typeof products)[0]) => {
    if (typeof product.name === 'object') {
      return product.name[language] ?? product.name['en'];
    }
    return product.name;
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                {t('home.recipeSuggestions.title')}
              </CardTitle>
              <CardDescription>
                {t('home.recipeSuggestions.description')}
              </CardDescription>
            </CardHeader>
            <form action={dispatch} ref={formRef}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="honeyType">{t('home.recipeSuggestions.honeyTypeLabel')}</Label>
                  <Select name="honeyType" required>
                    <SelectTrigger id="honeyType">
                      <SelectValue placeholder={t('home.recipeSuggestions.honeyTypePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={getProductName(product)}>
                          {getProductName(product)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="userPreferences">{t('home.recipeSuggestions.preferencesLabel')}</Label>
                  <Textarea
                    id="userPreferences"
                    name="userPreferences"
                    placeholder={t('home.recipeSuggestions.preferencesPlaceholder')}
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
              <h3 className="font-headline text-3xl font-bold">{t('home.recipeSuggestions.suggestionsTitle')}</h3>
              {state.recipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{recipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="ingredients">
                        <AccordionTrigger>{t('home.recipeSuggestions.ingredients')}</AccordionTrigger>
                        <AccordionContent>
                          <div className="prose prose-sm max-w-none whitespace-pre-line">
                            {recipe.ingredients}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="instructions">
                        <AccordionTrigger>{t('home.recipeSuggestions.instructions')}</AccordionTrigger>
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
              <h3 className="font-headline text-2xl font-bold">{t('home.recipeSuggestions.placeholderTitle')}</h3>
              <p className="text-muted-foreground mt-2 max-w-sm">
                {t('home.recipeSuggestions.placeholderText')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
