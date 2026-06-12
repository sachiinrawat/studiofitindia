import PolicyLayout from "../components/Global/PolicyLayout";

const Refund = () => {
  return (
    <PolicyLayout title="Cancellation & Refund">
      <h2>Cancellation and Refund Policy (Razorpay Compliant)</h2>
      <p>
        Studio Fit India follows a transparent and fair refund & cancellation
        policy in line with Razorpay guidelines and Indian consumer laws.
      </p>

      <h3>1. Refund Policy</h3>
      <ul>
        <li>
          All memberships, programs, and packages purchased from Studio Fit
          India are non-refundable once the service has started or access has
          been provided.
        </li>
        <li>
          Refund requests, if any, are considered only within 24 hours of
          purchase and before service activation, subject to internal
          verification.
        </li>
        <li>
          Any refund approval is at the sole discretion of Studio Fit India.
        </li>
      </ul>

      <h3>2. Cancellation Policy</h3>
      <ul>
        <li>Memberships or programs, once activated, cannot be cancelled.</li>
        <li>Cancellation does not guarantee eligibility for a refund.</li>
      </ul>

      <h3>3. Transfer Policy (Within 24 Hours)</h3>
      <ul>
        <li>
          A purchased membership may be transferred to another individual within
          24 hours of purchase.
        </li>
        <li>
          Transfer requests must be raised through official communication
          channels within the stipulated time.
        </li>
        <li>
          After 24 hours, no transfer, cancellation, or refund will be allowed.
        </li>
      </ul>

      <h3>4. Service Access & Refund Clarification</h3>
      <ul>
        <li>In the rare event that a refund is approved:</li>
        <li>
          The membership or service may continue or may be discontinued, based
          on Studio Fit India’s internal assessment.
        </li>
        <li>
          Studio Fit India reserves the right to manage service access
          independently of refund processing.
        </li>
      </ul>

      <h3>5. Missed Sessions</h3>
      <p>
        Missed classes or sessions due to personal, medical, or technical
        reasons are not eligible for refunds, extensions, or compensation.
      </p>

      <h3>6. Processing Timeline</h3>
      <p>
        Any approved refund will be processed within 7–10 working days through
        the original payment method.
      </p>
    </PolicyLayout>
  );
};

export default Refund;
