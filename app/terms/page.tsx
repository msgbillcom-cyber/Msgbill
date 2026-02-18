import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service | MsgBill",
  description: "MsgBill Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container-wide py-16 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-secondary-900 mb-6">Terms of Service</h1>
        <p className="text-secondary-600 mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>
        <div className="prose prose-secondary max-w-none space-y-6">
          <p className="text-secondary-600">
            By using MsgBill, you agree to these Terms of Service. MsgBill is an invoicing and
            business management platform for Indian small businesses.
          </p>
          <h2 className="text-xl font-semibold">1. Acceptable Use</h2>
          <p className="text-secondary-600">
            You agree to use MsgBill only for lawful business purposes. You will not use the
            service for fraud, spam, or any illegal activity.
          </p>
          <h2 className="text-xl font-semibold">2. Your Data</h2>
          <p className="text-secondary-600">
            You retain ownership of your data. We process and store it to provide the service.
            See our Privacy Policy for details.
          </p>
          <h2 className="text-xl font-semibold">3. Service Availability</h2>
          <p className="text-secondary-600">
            We strive for high availability but do not guarantee uninterrupted service.
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
