import { Button } from "../../ui/button";
function BulkOrder() {
  return (
    <section className="bg-muted py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          Need Bulk Orders?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          We offer competitive pricing for wholesale and bulk orders. Contact
          our sales team for custom quotes and volume discounts.
        </p>
        <Button size="lg"  className="mt-2">Contact Sales</Button>
      </div>
    </section>
  );
}
export default BulkOrder;
