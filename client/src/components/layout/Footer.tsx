import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="ri-shield-keyhole-line text-primary text-3xl mr-2"></i>
              <span className="font-inter font-bold text-lg">CyberSafe</span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Interactive cybersecurity education for everyone. Learn to protect yourself online.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Learning Modules</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/module/phishing"><a className="hover:text-white">Phishing Recognition</a></Link></li>
              <li><Link href="/module/email"><a className="hover:text-white">Email Safety</a></Link></li>
              <li><Link href="/module/social-media"><a className="hover:text-white">Social Media Security</a></Link></li>
              <li><Link href="/module/ai-chatbots"><a className="hover:text-white">AI Chatbot Safety</a></Link></li>
              <li><Link href="/challenge"><a className="hover:text-white">Final Challenge</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Resources</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white">Security Blog</a></li>
              <li><a href="#" className="hover:text-white">Downloadable Guides</a></li>
              <li><a href="#" className="hover:text-white">Video Library</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CyberSafe Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
