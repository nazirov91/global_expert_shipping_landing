import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Clock, Shield, DollarSign, Users, Award } from 'lucide-react'

const stats = [
  {
    number: '50,000+',
    label: 'Vehicles Shipped',
    description: 'Successfully transported nationwide'
  },
  {
    number: '4.8/5',
    label: 'Customer Rating',
    description: 'Average satisfaction score'
  },
  {
    number: '98%',
    label: 'On-Time Delivery',
    description: 'Reliable pickup and delivery'
  },
  {
    number: '24/7',
    label: 'Customer Support',
    description: 'Always here when you need us'
  }
]

const advantages = [
  {
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'Competitive pricing with no hidden fees. We\'ll match any legitimate competitor quote.',
    badge: 'Price Match'
  },
  {
    icon: Shield,
    title: 'Comprehensive Insurance',
    description: 'Full coverage up to $100,000 with zero deductible. Your vehicle is protected every mile.',
    badge: 'Fully Insured'
  },
  {
    icon: Clock,
    title: 'Fast & Reliable',
    description: '7-10 day standard delivery with express options available. Real-time tracking included.',
    badge: 'Express Available'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Experienced transport coordinators guide you through every step of the process.',
    badge: 'Personal Support'
  },
  {
    icon: Award,
    title: 'Industry Leading',
    description: 'FMCSA licensed, BBB A+ rated, and trusted by major dealerships and individuals.',
    badge: 'A+ Rating'
  },
  {
    icon: TrendingUp,
    title: 'Proven Track Record',
    description: '15+ years in business with thousands of successful deliveries and satisfied customers.',
    badge: '15+ Years'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose AutoShip Pro
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're not just another auto transport company. We're your trusted partner 
            committed to providing exceptional service and peace of mind.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-card-border">
              <CardContent className="pt-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon
            return (
              <Card key={index} className="hover-elevate transition-all duration-200 border-card-border">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {advantage.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}