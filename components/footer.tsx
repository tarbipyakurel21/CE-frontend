import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm opacity-90">
              <p>Monday–Friday 8am–6:30pm ET</p>
              <p className="font-semibold">📞 1-800-727-7104</p>
              <p>✉️ cehelp@certus.com</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Student Resources</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Affiliations & Accreditation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contractor Courses in Spanish
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Builders News
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Book Store
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Safety Training
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Reporting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <p className="text-sm opacity-90 mb-4">
              Follow us on social media! Learn about upcoming deadlines and sales.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Cloud Crust Continuing Education. All rights reserved.</p>
        </div>
        {/* </CHANGE> */}
      </div>
    </footer>
  )
}
