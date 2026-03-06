import { Button } from '@/ui/button';
import { Label } from '@/ui/label';
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import { Card, CardContent } from '@/ui/card';
import { Star, Globe, DollarSign } from 'lucide-react';

 function ProductPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="aspect-square w-full overflow-hidden rounded-lg">
            <img
              src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-featured-product-shot.jpg"
              alt="Back of women's Basic Tee in black"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-01.jpg"
                alt="Side profile of women's Basic Tee in black"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-product-shot-02.jpg"
                alt="Front of women's Basic Tee in black"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 lg:mt-0">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Basic Tee</h1>
            <p className="text-3xl font-bold tracking-tight text-gray-900">$35</p>
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-5 w-5 fill-gray-200 text-gray-200" />
                </div>
                <p className="ml-2 text-sm font-medium text-gray-900">
                  3.9 <span className="sr-only">out of 5 stars</span>
                </p>
              </div>
              <div className="text-gray-300">·</div>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                See all 512 reviews
              </a>
            </div>
          </div>

          <form className="mt-8">
            {/* Color picker */}
            <div>
              <h2 className="text-sm font-medium text-gray-900">Color</h2>
              <RadioGroup defaultValue="black" className="mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="black"
                      id="color-black"
                      className="h-8 w-8 rounded-full border-2 border-gray-300 bg-black"
                    />
                    <Label htmlFor="color-black" className="sr-only">Black</Label>
                  </div>
                  <div className="flex items-center">
                    <RadioGroupItem
                      value="heather-grey"
                      id="color-grey"
                      className="h-8 w-8 rounded-full border-2 border-gray-300 bg-gray-400"
                    />
                    <Label htmlFor="color-grey" className="sr-only">Heather Grey</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Size picker */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  See sizing chart
                </a>
              </div>

              <RadioGroup defaultValue="s" className="mt-4">
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size.toLowerCase()}
                        id={`size-${size}`}
                        disabled={size === 'XL'}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-3 text-sm font-medium uppercase hover:bg-gray-50 peer-checked:border-indigo-500 peer-checked:ring-2 peer-checked:ring-indigo-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-25 cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700">
              Add to cart
            </Button>
          </form>

          {/* Product details */}
          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
              <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-sm font-medium text-gray-900">Fabric & Care</h2>
            <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Only the best materials</li>
              <li>Ethically and locally made</li>
              <li>Pre-washed and pre-shrunk</li>
              <li>Machine wash cold with similar colors</li>
            </ul>
          </div>

          {/* Policies */}
          <section className="mt-10">
            <h2 className="sr-only">Our Policies</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card>
                <CardContent className="flex gap-3 pt-6">
                  <Globe className="h-6 w-6 flex-shrink-0 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">International delivery</h3>
                    <p className="mt-1 text-sm text-gray-600">Get your order in 2 years</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex gap-3 pt-6">
                  <DollarSign className="h-6 w-6 flex-shrink-0 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Loyalty rewards</h3>
                    <p className="mt-1 text-sm text-gray-600">Don't look at other tees</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent reviews</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Risako M', date: 'May 16, 2021', rating: 5, title: "Can't say enough good things", review: "I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me! The product quality is amazing, it looks and feel even better than I had anticipated." },
            { name: 'Jackie H', date: 'April 6, 2021', rating: 5, title: 'Very comfy and looks the part', review: "After a quick chat with customer support, I had a good feeling about this shirt and ordered three of them. Less than 48 hours later, my delivery arrived. I haven't worn anything else since that day!" },
            { name: 'Laura G', date: 'February 24, 2021', rating: 4, title: 'The last shirts I may ever need', review: "I bought two of those comfy cotton shirts, and let me tell you: they're amazing! I have been wearing them almost every day. Even after a dozen of washes, that still looks and feel good as new." }
          ].map((review, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-gray-200 text-gray-200" />
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {review.rating} <span className="sr-only">out of 5 stars</span>
                  </p>
                </div>
                <h3 className="mt-4 text-sm font-medium text-gray-900">{review.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{review.review}</p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <span className="text-gray-300">·</span>
                  <time className="text-gray-600">{review.date}</time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Related products */}
      <section className="mt-16 border-t border-gray-200 pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {[
            { src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg', name: 'Basic Tee', color: 'Aspen White' },
            { src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg', name: 'Basic Tee', color: 'Charcoal' },
            { src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg', name: 'Artwork Tee', color: 'Iso Dots' },
            { src: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg', name: 'Basic Tee', color: 'Black' }
          ].map((product, idx) => (
            <div key={idx} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.src}
                  alt={`${product.name} in ${product.color}`}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href="#">
                      <span className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">$35</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductPage;