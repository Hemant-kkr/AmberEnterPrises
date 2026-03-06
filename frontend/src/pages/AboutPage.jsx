import { Shield, Users, Award, Truck, CheckCircle } from "lucide-react";
import { Breadcrumb } from "@/ui/Breadcrumb";
import MainLayout from "../layout/MainLayout";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: "About Us" }]} />

        <section className="mb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">
              About Amber Safety Enterprises
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Your trusted partner in industrial safety since 1995. We're committed to
              protecting workers with OSHA-compliant, premium-quality safety equipment.
            </p>
          </div>
        </section>

        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="mb-3 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide affordable, high-quality safety equipment that protects workers
              across every industry. We believe every person deserves to return home safely
              at the end of every workday.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-8">
            <h2 className="mb-3 text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="text-muted-foreground">
              To become the leading safety equipment provider by continuously innovating
              and raising the standard of workplace safety across the globe.
            </p>
          </div>
        </section>

        <section className="mb-16 rounded-xl bg-primary p-10 text-primary-foreground">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "30+", label: "Years of Experience" },
              { value: "10K+", label: "Products Delivered" },
              { value: "500+", label: "Business Clients" },
              { value: "99%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Why Choose Us
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Certified Quality", desc: "All products meet OSHA and international safety standards." },
              { icon: Truck, title: "Fast Delivery", desc: "Reliable shipping with real-time tracking on every order." },
              { icon: Users, title: "Expert Support", desc: "Dedicated safety consultants to help you choose the right gear." },
              { icon: CheckCircle, title: "Bulk Pricing", desc: "Competitive wholesale rates for businesses of all sizes." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  < Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-muted p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to get started?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Browse our catalog or contact our sales team for a custom quote.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Shop Products
            </a>
            <a
              href="mailto:sales@ambersafety.com"
              className="rounded-md border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              Contact Sales
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;