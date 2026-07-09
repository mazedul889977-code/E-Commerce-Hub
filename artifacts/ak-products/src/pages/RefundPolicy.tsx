import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund and Returns Policy</h1>
        <div className="prose prose-gray max-w-none text-gray-700">
          
          <h2>Our 30-Day Guarantee</h2>
          <p>We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the item within 30 days of receipt for a full refund or exchange.</p>
          
          <h2>Eligibility for Returns</h2>
          <ul>
            <li>Your item must be unused and in the same condition that you received it.</li>
            <li>It must also be in the original packaging.</li>
            <li>To complete your return, we require a receipt or proof of purchase.</li>
          </ul>
          
          <h2>Refund Process</h2>
          <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
          
          <h2>Late or Missing Refunds</h2>
          <p>If you haven’t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. If you’ve done all of this and you still have not received your refund yet, please contact us at support@akproductsusa.com.</p>
          
          <h2>Shipping Returns</h2>
          <p>To return your product, you should mail your product to the address provided by our support team. You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
