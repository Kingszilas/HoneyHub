import { ContactForm } from "@/components/contact-form";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have a question or a comment? Drop us a line, we'd love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="font-headline text-2xl font-bold mb-6">Contact Us</h2>
            <ContactForm />
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Email Us</h3>
                <p className="text-muted-foreground">Send us an email for any inquiry.</p>
                <a href="mailto:hello@honeyhub.com" className="text-primary hover:underline">
                  hello@honeyhub.com
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/20 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Call Us</h3>
                <p className="text-muted-foreground">Our team is available Mon-Fri, 9am-5pm.</p>
                <a href="tel:+1234567890" className="text-primary hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
