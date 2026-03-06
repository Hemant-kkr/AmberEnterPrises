import {Phone,Mail,MapPin} from 'lucide-react'
function Contact()
{
    return(
                  <div>
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>1-800-SAFETY-1</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@ambersafety.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Industrial Ave<br />Safety City, SC 12345</span>
              </li>
            </ul>
          </div>
    )
}
export default Contact;