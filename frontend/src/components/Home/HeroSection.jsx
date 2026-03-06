import { Truck,Shield,Award,ArrowRight, } from "lucide-react";
import {Button} from '../../ui/button'
function HeroSection()
{

    return(
          <section className="relative overflow-hidden bg-gradient-to-br from-foreground to-foreground/90 py-16 md:py-24">
   
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary">
            <Shield className="h-4 w-4" />
            Trusted Safety Partner
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-background md:text-5xl lg:text-6xl">
            Your Safety is Our{" "}
            <span className="text-primary">Priority</span>
          </h1>
          <p className="mt-6 text-lg text-background/80 md:text-xl">
            Premium industrial safety equipment for professionals. OSHA compliant, 
            rigorously tested, and built to protect what matters most.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <div >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>
            <Button size="lg" variant="outline" className="border-background/30  text-primary hover:bg-background/10  hover:text-white" asChild>
              <div >View Catalog</div>
            </Button>
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 rounded-lg bg-background/10 p-4">
            <Award className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-background">OSHA Compliant</p>
              <p className="text-sm text-background/70">All Products Certified</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-lg bg-background/10 p-4">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-background">Fast Shipping</p>
              <p className="text-sm text-background/70">Free on Orders $100+</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-lg bg-background/10 p-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="font-semibold text-background">Quality Guarantee</p>
              <p className="text-sm text-background/70">30-Day Returns</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}
export default HeroSection;