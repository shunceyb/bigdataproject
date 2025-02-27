import { Facebook, Instagram, Mail } from "lucide-react";

const Footer = () => {
    return (
        <section  id="contact" className="flex flex-col items-center justify-center bg-black text-gray-400 py-6 space-y-3">
            <div className="text-center">
                <p className="text-green-500 font-semibold">© {new Date().getFullYear()} Razer Inc.</p>
                <p className="text-sm">All Rights Reserved.</p>
            </div>

           
            <div className="flex space-x-6">
                <a 
                    href="https://www.instagram.com/razer/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-green-400"
                >
                    <Instagram size={20} />
                </a>
                <a 
                    href="https://www.facebook.com/razer" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-green-400"
                >
                    <Facebook size={20} />
                </a>
                <a 
                    href="mailto:support@razer.com" 
                    className="hover:text-green-400"
                >
                    <Mail size={20} />
                </a>
            </div>
        </section>
    );
}

export default Footer
