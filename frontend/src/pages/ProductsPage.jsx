import { useState, useRef, useEffect, useContext } from "react";
import { Search, SlidersHorizontal, X, Flame, ShieldCheck } from "lucide-react";
import  ProductCard from "../features/products/components/ProductCard";
import { ProductCategorySkeleton } from "@/ui/ProductSkeleton";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Slider } from "@/ui/slider";
import { Badge } from "@/ui/badge";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/ui/sheet";
import { Checkbox } from "@/ui/checkbox";
import { Separator } from "@/ui/separator";
import cat from "../constants/categories-constant";
import { ProductContext } from "../store/ProductContext";
const categories = Object.values(cat).map((c) =>  c);
const priceRange = {
  min:0,
  max:10000,
};

const Products = () => {
  const { products } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceFilter, setPriceFilter] = useState([priceRange.min, priceRange.max]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const categoryRefs = useRef({});

   const categoryWiseProducts = categories.map((c)=>{
   return products.filter((p)=>p.category===c) 
  }).filter((group)=>group.length>0);

  
  // Simulate loading for skeleton effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    categoryRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceFilter([priceRange.min, priceRange.max]);
    setActiveCategory(null);
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    priceFilter[0] !== priceRange.min ||
    priceFilter[1] !== priceRange.max;

 

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <ShieldCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground md:text-4xl">
              Safety Equipment
            </h1>
          </div>
          <p className="max-w-lg text-sm text-primary-foreground/60">
            Browse our complete range of certified safety gear — trusted by professionals worldwide.
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-primary-foreground/50">
            <span className="flex items-center gap-1"><Flame className="h-3.5 w-3.5 text-accent" /> {products.length} Products</span>
            <span>•</span>
            <span>{categories.length} Categories</span>
            <span>•</span>
            <span>Free Shipping 50$+</span>
          </div>
        </div>
      </div>

      {/* Search & Category Nav */}
      <div className="sticky top-0 z-30 border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-6 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search safety equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-muted/50 border-border/50 focus:bg-background"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden shrink-0">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FilterContent 
                hasActiveFilters={hasActiveFilters}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                clearFilters={clearFilters}
              />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Category Nav Pills */}
          <div className="mt-3 -mx-4 px-4">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex gap-2 pb-2">
                <Button
                  variant={activeCategory === null ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveCategory(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="shrink-0 font-semibold"
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    size="sm"
                    onClick={() => scrollToCategory(category)}
                    className="shrink-0 font-medium"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Active Filters Badges */}
          {hasActiveFilters && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Filters:</span>
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="cursor-pointer gap-1 bg-primary/10 text-primary hover:bg-primary/20 border-0"
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              {(priceFilter[0] !== priceRange.min || priceFilter[1] !== priceRange.max) && (
                <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                  ${priceFilter[0]} – ${priceFilter[1]}
                </Badge>
              )}
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 bg-primary/10 text-primary hover:bg-primary/20 border-0"
                  onClick={() => setSearchQuery("")}
                >
                  "{searchQuery}"
                  <X className="h-3 w-3" />
                </Badge>
              )}
              <button
                onClick={clearFilters}
                className="text-[10px] font-bold uppercase tracking-wider text-destructive hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-4 px-4 py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters — fixed left frame */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto rounded-xl border border-border/60 bg-card p-5 shadow-lg shadow-foreground/5">
              <div className="mb-5 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Filters</h2>
              </div>
              <FilterContent 
                hasActiveFilters={hasActiveFilters}
                priceFilter={priceFilter}
                setPriceFilter={setPriceFilter}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                clearFilters={clearFilters}
                
              />
            </div>
          </aside>

          {/* Products Grid by Category */}
          <div className="flex-1 min-w-0 space-y-10">
            {isLoading ? (
              <ProductCategorySkeleton />
            )  : (
              categoryWiseProducts.map((group, idx) => {
                const category = categories[idx];
                return (
                  <section key={category} >  
                    <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                      {category}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.map((product) => (
                        <ProductCard key={product._id} productDetails={product} />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
 const FilterContent = ({hasActiveFilters,priceFilter,setPriceFilter,selectedCategories,toggleCategory,clearFilters,products=[]}) => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          Price Range
        </h3>
        <Slider
          min={priceRange.min}
          max={priceRange.max}
          step={1}
          value={priceFilter}
          onValueChange={(val) => setPriceFilter(val )}
          className="mb-2"
        />
        <div className="flex items-center justify-between text-sm font-semibold text-foreground">
          <span className="rounded bg-muted px-2 py-0.5">${priceFilter[0]}</span>
          <span className="text-xs text-muted-foreground">to</span>
          <span className="rounded bg-muted px-2 py-0.5">${priceFilter[1]}</span>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          Categories
        </h3>
        <div className="space-y-1">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-all hover:bg-primary/5 hover:pl-3"
            >
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <span className="text-sm font-medium text-foreground">{category}</span>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {products.filter((p) => p.category === category).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Brand */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          Brand
        </h3>
        <div className="space-y-1">
          {["Amber Safety", "ProShield", "SafeGuard"].map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-all hover:bg-primary/5 hover:pl-3"
            >
              <Checkbox />
              <span className="text-sm font-medium text-foreground">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Certification */}
      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">
          Certification
        </h3>
        <div className="space-y-1">
          {["OSHA Compliant", "ANSI Certified", "NIOSH Approved", "CE Marked"].map((cert) => (
            <label
              key={cert}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-all hover:bg-primary/5 hover:pl-3"
            >
              <Checkbox />
              <span className="text-sm font-medium text-foreground">{cert}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10" onClick={clearFilters}>
          <X className="mr-2 h-4 w-4" />
          Clear All Filters
        </Button>
      )}
    </div>
  );