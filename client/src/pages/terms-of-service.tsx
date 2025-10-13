import { useGlobals } from '@/lib/globals';

export default function TermsOfService() {
  const { businessName, globals } = useGlobals();
  const phone =
    globals.phone_number || globals.phone || globals.primary_phone || '1-888-889-0939';
  const email = globals.email || globals.support_email || 'cdelany@aaatransporters.co';
  const dotNumber = globals.dot_number || 'USDOT 2246322';

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12'>
        <header>
          <p className='text-sm text-muted-foreground uppercase tracking-widest'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Terms of Service</h1>
          <p className='mt-6 text-base leading-7 text-muted-foreground'>
            These Terms of Service (“Terms”) govern your access to and use of the auto transport
            brokerage services provided by {businessName} (“we,” “us,” or “our”). By submitting a
            quote request, booking a shipment, or communicating with us via phone, email, or SMS, you
            acknowledge that you have read, understood, and agree to these Terms.
          </p>
        </header>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>1. Our Role as a Broker</h2>
          <p className='text-muted-foreground leading-7'>
            {businessName} operates as a licensed and bonded auto transport broker under {dotNumber}.
            We coordinate transportation services between you and independently contracted motor
            carriers that meet FMCSA safety and insurance requirements. We do not own or operate
            transport trucks, and carriers are solely responsible for the physical transport of your
            vehicle.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>2. Quotes, Bookings &amp; Payments</h2>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground leading-7'>
            <li>
              Quotes are estimates based on current market conditions, equipment availability, and
              shipment details provided by you. Market fluctuations may affect final carrier rates.
            </li>
            <li>
              A booking is confirmed once you authorize us to dispatch a carrier and, when required,
              provide a brokerage fee, deposit, or credit card authorization.
            </li>
            <li>
              The remaining balance, if any, is typically due to the carrier upon pickup or delivery
              in the form of cash, certified funds, or other pre-approved payment arrangements.
            </li>
            <li>
              Failure to provide accurate information (vehicle size, operability, modifications, or
              access requirements) may result in additional fees, scheduling delays, or cancellation.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>3. Pickup &amp; Delivery</h2>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground leading-7'>
            <li>
              We coordinate door-to-door service whenever possible. If local regulations or roadway
              conditions restrict carrier access, you may need to meet the driver at a nearby safe
              location.
            </li>
            <li>
              Estimated pickup and delivery windows are not guaranteed but reflect best efforts based
              on carrier schedules, weather, traffic, and other factors beyond our control.
            </li>
            <li>
              You or your authorized agent must be present to hand over and receive the vehicle,
              inspect it with the carrier, and sign the Bill of Lading at pickup and delivery.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>4. Vehicle Condition &amp; Personal Items</h2>
          <p className='text-muted-foreground leading-7'>
            You are responsible for preparing the vehicle for transport, including mechanical
            readiness, fluid levels, and the removal of personal items or aftermarket accessories not
            agreed upon during booking. Carriers may refuse transport or assess surcharges for
            overloaded vehicles or inaccurate disclosures. Personal belongings left in the vehicle are
            transported at your own risk and may not be covered by carrier insurance policies.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>5. Cancellations &amp; Refunds</h2>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground leading-7'>
            <li>
              You may cancel in writing prior to a carrier being assigned for a full refund of any
              broker fee paid directly to us.
            </li>
            <li>
              If you cancel after a carrier has been dispatched or reject service without reasonable
              cause, you may forfeit the broker fee and be responsible for carrier dry-run charges.
            </li>
            <li>
              If we cannot secure a carrier within the agreed dispatch window, you may request a full
              refund of any fees paid to us, and this agreement will terminate without liability.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>6. Communications, 10DLC &amp; TCPA</h2>
          <p className='text-muted-foreground leading-7'>
            By providing your phone number and opting in to receive communications, you consent to
            receive SMS messages and automated or prerecorded calls relating to quotes, dispatch
            updates, delivery coordination, and customer service. We maintain registered 10DLC
            messaging campaigns and follow TCPA guidelines:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground leading-7'>
            <li>
              Message frequency varies according to shipment activity; message and data rates may
              apply.
            </li>
            <li>
              Reply STOP to cancel SMS messages or HELP for assistance. Opting out of SMS does not
              affect transactional phone calls or emails necessary to fulfill your shipment.
            </li>
            <li>
              Consent to receive SMS or automated calls is not a condition of purchasing services. If
              you prefer to communicate exclusively by email or standard voice calls, notify us and we
              will honor your request.
            </li>
            <li>
              We log consent status, maintain suppression lists, and cooperate with carrier reviews to
              ensure campaign compliance.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>7. Insurance &amp; Claims</h2>
          <p className='text-muted-foreground leading-7'>
            Every carrier we dispatch is required to maintain active USDOT authority, cargo insurance,
            and liability coverage. You must document the vehicle&apos;s condition with the carrier at
            pickup and delivery. Any damage claims must be noted on the Bill of Lading and submitted
            directly to the carrier&apos;s insurer. We will assist you in facilitating communication
            but are not responsible for carrier negligence or declined claims.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>8. Disclaimer of Warranties</h2>
          <p className='text-muted-foreground leading-7'>
            Except as expressly stated herein, our services are provided “as-is” without warranties of
            any kind, whether express or implied, including warranties of merchantability, fitness for
            a particular purpose, or non-infringement. We do not guarantee carrier availability,
            delivery times, or uninterrupted access to our website or communication platforms.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>9. Limitation of Liability</h2>
          <p className='text-muted-foreground leading-7'>
            To the fullest extent permitted by law, our total liability for any claim arising out of
            or relating to these Terms or our brokerage services is limited to the amount of fees you
            paid directly to {businessName}. We are not liable for incidental, indirect, punitive, or
            consequential damages, including lost profits, regardless of foreseeability.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>10. Indemnification</h2>
          <p className='text-muted-foreground leading-7'>
            You agree to indemnify, defend, and hold harmless {businessName}, its officers, employees,
            and agents from any claims, damages, or expenses (including reasonable attorneys&apos;
            fees) arising from your breach of these Terms, misuse of the services, or violation of
            applicable laws.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>11. Dispute Resolution</h2>
          <p className='text-muted-foreground leading-7'>
            These Terms are governed by the laws of the state in which our principal office is
            located, without regard to conflict of laws principles. Any dispute will first be
            addressed through good faith negotiations. If unresolved, the dispute shall be submitted
            to binding arbitration in that state, except where prohibited or where you choose to file
            a valid claim in small claims court.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>12. Updates to These Terms</h2>
          <p className='text-muted-foreground leading-7'>
            We may modify these Terms to reflect changes in regulations, carrier requirements, or
            business practices. Updated Terms will be posted on this page with a revised effective
            date. Continued use of our services after updates become effective constitutes acceptance
            of the revised Terms.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>13. Contact Information</h2>
          <p className='text-muted-foreground leading-7'>
            If you have questions about these Terms or need to update your communication preferences,
            contact us at {email} or call {phone}. Written notices may be sent to our main office.
          </p>
        </section>
      </div>
    </div>
  );
}
