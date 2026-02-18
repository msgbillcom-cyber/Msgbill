import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy | MsgBill",
  description: "MsgBill Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container-wide py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Privacy Policy</h1>
        <p className="text-secondary-600 mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>
        <div className="prose prose-secondary max-w-none space-y-6">
          <p className="text-secondary-600">
            MsgBill respects your privacy. This policy describes how we collect, use, and protect
            your information.
          </p>
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-secondary-600">
            We collect information you provide: name, email, business details, client and invoice
            data. We also collect usage data to improve the service.
          </p>
          <h2 className="text-xl font-semibold">2. How We Use It</h2>
          <p className="text-secondary-600">
            We use your data to provide invoicing, payment links, and related features. We do not
            sell your data to third parties.
          </p>
          <h2 className="text-xl font-semibold">3. Data Storage</h2>
          <p className="text-secondary-600">
            Your data is stored securely. We use Supabase (hosted) and industry-standard security
            practices.
          </p>
          <h2 className="text-xl font-semibold">4. Contact</h2>
          <p className="text-secondary-600">
            For privacy questions, contact us at support@msgbill.com.
          </p>
        </div>
        <p className="mt-12 text-secondary-600">
          <Link href="/" className="text-primary-600 hover:underline">
            ← Back to Home
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
