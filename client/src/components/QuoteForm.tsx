import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Calendar, MapPin, Truck, CheckCircle } from 'lucide-react'

interface QuoteFormData {
  origin: string
  destination: string
  pickupDate: string
  trailerType: string
  name: string
  phone: string
  email: string
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    origin: '',
    destination: '',
    pickupDate: '',
    trailerType: '',
    name: '',
    phone: '',
    email: ''
  })

  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Quote form submitted:', formData)
    
    // Show fancy success toast notification
    toast({
      title: "Quote Request Submitted! 🚛",
      description: `Thank you ${formData.name || 'for your interest'}! We'll send your personalized quote to ${formData.email} within 1 hour.`,
      duration: 6000,
      className: "border-green-200 bg-green-50 text-green-900",
    })
  }

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold text-primary">Get Your Free Quote</CardTitle>
        <CardDescription>Instant estimate in under 60 seconds</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Origin */}
          <div className="space-y-2">
            <Label htmlFor="origin" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Pickup City, State
            </Label>
            <Input
              id="origin"
              placeholder="e.g., Los Angeles, CA"
              value={formData.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              data-testid="input-origin"
              required
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label htmlFor="destination" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Delivery City, State
            </Label>
            <Input
              id="destination"
              placeholder="e.g., Miami, FL"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              data-testid="input-destination"
              required
            />
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <Label htmlFor="pickupDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Pickup Date
            </Label>
            <Input
              id="pickupDate"
              type="date"
              value={formData.pickupDate}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              data-testid="input-pickup-date"
              required
            />
          </div>

          {/* Trailer Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Trailer Type
            </Label>
            <Select value={formData.trailerType} onValueChange={(value) => handleInputChange('trailerType', value)}>
              <SelectTrigger data-testid="select-trailer-type">
                <SelectValue placeholder="Select trailer type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open (Most Popular - Saves $200)</SelectItem>
                <SelectItem value="enclosed">Enclosed (Premium Protection)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                data-testid="input-name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                data-testid="input-phone"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                data-testid="input-email"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-chart-1 hover:bg-chart-1/90 text-white text-lg py-6"
            data-testid="button-submit-quote"
          >
            Get My Free Quote Now
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}