import BrandLogo from "../header/BrandLogo";
import QuickLinks from "./QuickLinks";
import Contact from "./Contact";
import CopyRight from "./CopyRight";
function Footer() {
  return (
    <footer className="border-t border-border bg-card mx-10">
      <div className="container mx-auto px-4 py-12 ">
        <div className="grid gap-8 md:grid-cols-4 min-w-0">
          <div className="md:col-span-2">
            <BrandLogo />
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Your trusted partner for industrial safety equipment. Providing OSHA-compliant products to keep workers safe since 1995.
            </p>
          </div>
          <QuickLinks />
          <Contact />
        </div>
        <CopyRight />
      </div>
    </footer>
  );
}
export default Footer;
