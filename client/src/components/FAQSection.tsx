import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How much does auto transport cost?",
    answer: "Auto transport costs vary based on distance, vehicle type, season, and transport method. Typical costs range from $500-$1,500 for standard vehicles. Enclosed transport costs 40-60% more than open transport. We provide free, no-obligation quotes tailored to your specific needs."
  },
  {
    question: "How long does auto transport take?",
    answer: "Transit times depend on the distance and route. Local moves (under 500 miles) typically take 1-3 days, while cross-country transport takes 7-10 days. We provide estimated pickup and delivery windows when you book your transport."
  },
  {
    question: "Is my vehicle insured during transport?",
    answer: "Yes, all vehicles are covered by carrier insurance during transport. Our carriers maintain minimum insurance coverage as required by federal regulations. We recommend documenting your vehicle's condition with photos before pickup."
  },
  {
    question: "What's the difference between open and enclosed transport?",
    answer: "Open transport uses standard car carrier trailers (most common and economical). Enclosed transport uses enclosed trailers that protect vehicles from weather and road debris - recommended for luxury, classic, or high-value vehicles."
  },
  {
    question: "Can I put personal items in my car?",
    answer: "You can leave up to 100 pounds of personal items in the trunk, but they're not covered by carrier insurance. Remove all valuable items, documents, and anything that could shift during transport. The gas tank should be no more than 1/4 full."
  },
  {
    question: "How do I prepare my vehicle for transport?",
    answer: "Remove or secure loose items, disable car alarms, ensure the battery is charged, check for leaks, document existing damage with photos, and keep fuel level at 1/4 tank or less. Remove toll transponders and parking passes."
  },
  {
    question: "Do you transport non-running vehicles?",
    answer: "Yes, we can transport inoperable vehicles. Additional fees may apply as special equipment is required for loading. The vehicle must be able to roll, steer, and brake for safety reasons during loading and unloading."
  },
  {
    question: "When do I pay for auto transport?",
    answer: "Most carriers require a deposit (typically $50-$200) to secure your booking, with the remaining balance due upon delivery. We never require full payment upfront. Payment methods usually include cash, certified check, or money order to the driver."
  },
  {
    question: "Can I track my vehicle during transport?",
    answer: "Yes, we provide regular updates on your shipment's progress. Many of our carriers offer GPS tracking, and you'll receive the driver's contact information for direct communication once your vehicle is picked up."
  },
  {
    question: "What if my delivery date changes?",
    answer: "Weather, traffic, and mechanical issues can affect delivery schedules. Carriers will contact you 24-48 hours before pickup and delivery to confirm timing. We work closely with carriers to minimize delays and keep you informed."
  }
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to the most common questions about auto transport services.
            Don't see your question? Contact us for personalized assistance.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openItems.has(index)
            return (
              <Card key={index} className="overflow-hidden">
                <button
                  className="w-full text-left p-6 hover-elevate focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => toggleItem(index)}
                  data-testid={`faq-question-${index}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </button>
                
                {isOpen && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <div className="text-muted-foreground leading-relaxed" data-testid={`faq-answer-${index}`}>
                      {faq.answer}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md hover-elevate active-elevate-2 transition-colors"
            data-testid="button-contact-from-faq"
          >
            Contact Our Experts
          </a>
        </div>
      </div>
    </section>
  )
}