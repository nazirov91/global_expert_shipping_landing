import { useGlobals } from '@/lib/globals';

export default function PrivacyPolicy() {
  const { businessName, globals } = useGlobals();
  const phone =
    globals.phone_number || globals.phone || globals.primary_phone || '1-888-889-0939';
  const email = globals.email || globals.support_email || 'cdelany@aaatransporters.co';
  const address =
    globals.address ||
    globals.business_address ||
    '6340 SW 163RD PL, MIAMI, FL 33193';

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12'>
        <header>
          <p className='text-sm text-muted-foreground uppercase tracking-widest'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <h1 className='mt-4 text-4xl font-bold tracking-tight'>Privacy Policy</h1>
          <p className='mt-6 text-base leading-7 text-muted-foreground'>
            This Privacy Policy explains how {businessName} (“we,” “us,” or “our”) collects, uses,
            discloses, and safeguards information when you visit our website, request a quote, book a
            shipment, or communicate with our team, including via SMS and voice calls delivered over
            10DLC-compliant messaging routes. By engaging with our services, you agree to the terms
            outlined below.
          </p>
        </header>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Information We Collect</h2>
          <p className='text-muted-foreground leading-7'>
            We collect information that helps us provide auto transport brokerage services
            efficiently and compliantly. This includes:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
            <li>
              Personal identifiers such as your name, email address, phone number, and preferred
              method of contact.
            </li>
            <li>
              Shipment details supplied during quote requests, including pickup and delivery
              addresses, vehicle make/model, operability status, and desired transport dates.
            </li>
            <li>
              Billing information and payment confirmations when you authorize services through our
              verified merchant partners.
            </li>
            <li>
              Communications metadata (time, channel, message status) related to 10DLC and TCPA
              compliant SMS campaigns, without collecting message content beyond what is necessary to
              fulfill your request.
            </li>
            <li>
              Website usage data such as pages visited, referring URLs, browser type, and device
              identifiers collected through cookies, pixels, and similar technologies.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>How We Use Your Information</h2>
          <p className='text-muted-foreground leading-7'>
            We use the information we collect in the following ways:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
            <li>To generate accurate shipping quotes and coordinate vehicle transport logistics.</li>
            <li>
              To verify your identity, prevent fraud, comply with FMCSA regulations, and maintain our
              USDOT broker authority.
            </li>
            <li>
              To deliver transactional updates and scheduling notices via email, phone calls, and
              10DLC-registered SMS numbers, in accordance with TCPA consent requirements.
            </li>
            <li>
              To send promotional offers and customer experience surveys when you have opted in to
              receive marketing communications.
            </li>
            <li>
              To improve our website performance, service offerings, and carrier network operations.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>10DLC &amp; TCPA Compliance</h2>
          <p className='text-muted-foreground leading-7'>
            We maintain registered 10DLC messaging campaigns and follow all applicable Telephone
            Consumer Protection Act (TCPA) rules. By providing your phone number and consenting to
            receive SMS or voice communications, you acknowledge:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
            <li>
              Message frequency varies based on shipment activity; typical notifications include
              quotes, scheduling updates, and transport status alerts.
            </li>
            <li>
              Message and data rates may apply. Carrier participation is subject to change.
            </li>
            <li>
              You can opt out of SMS communications at any time by replying STOP; HELP provides
              assistance information.
            </li>
            <li>
              Consent to receive SMS or automated calls is not a condition of purchasing our services.
            </li>
            <li>
              We retain opt-in and opt-out records as required by CTIA and carrier guidelines.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Information Sharing</h2>
          <p className='text-muted-foreground leading-7'>
            We share information only when necessary to deliver our services or as required by law.
            This includes:
          </p>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
            <li>
              Pre-qualified motor carriers, dispatchers, and insurance partners engaged to transport
              your vehicle.
            </li>
            <li>
              Payment processors and financial institutions that complete authorized transactions.
            </li>
            <li>
              Technology vendors who support our website, CRM, and compliant messaging platforms
              under confidentiality agreements.
            </li>
            <li>
              Government agencies or legal authorities if required to comply with subpoenas, court
              orders, or enforce our agreements.
            </li>
          </ul>
          <p className='text-muted-foreground leading-7'>
            We do not sell or rent personal information to unrelated third parties.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Data Security &amp; Retention</h2>
          <p className='text-muted-foreground leading-7'>
            We use physical, technical, and administrative controls to protect your data. Access is
            limited to personnel with a business need, and sensitive information is encrypted in
            transit and at rest whenever feasible. We retain information only as long as necessary to
            fulfill the purposes described above, meet regulatory obligations, resolve disputes, and
            enforce agreements.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Your Choices</h2>
          <ul className='list-disc pl-6 space-y-2 text-muted-foreground leading-7'>
            <li>
              Access &amp; Correction: Contact us to review or update your personal information.
            </li>
            <li>
              Marketing Preferences: Opt out of marketing emails by using the unsubscribe link or
              contacting us directly.
            </li>
            <li>
              SMS Consent: Reply STOP to any text message to opt out. Reply HELP or contact us for
              assistance.
            </li>
            <li>
              Cookies: Adjust your browser settings to refuse cookies. Doing so may impact site
              functionality.
            </li>
          </ul>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Children&apos;s Privacy</h2>
          <p className='text-muted-foreground leading-7'>
            Our services are intended for adults involved in vehicle transport decisions. We do not
            knowingly collect personal information from children under 13. If you believe a minor has
            provided us with personal information, contact us so we can delete it promptly.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Policy Updates</h2>
          <p className='text-muted-foreground leading-7'>
            We may update this Privacy Policy to reflect changes in our practices, technology, or
            legal requirements. Updates will be posted on this page with an amended effective date.
            Material changes may also be communicated through email or SMS notifications consistent
            with your communication preferences.
          </p>
        </section>

        <section className='space-y-4'>
          <h2 className='text-2xl font-semibold'>Contact Us</h2>
          <p className='text-muted-foreground leading-7'>
            For questions about this Privacy Policy or to exercise your privacy rights, contact us
            at:
          </p>
          <address className='not-italic text-muted-foreground leading-7'>
            {businessName}
            <br />
            {address}
            <br />
            Phone: {phone}
            <br />
            Email: {email}
          </address>
        </section>
      </div>
    </div>
  );
}
