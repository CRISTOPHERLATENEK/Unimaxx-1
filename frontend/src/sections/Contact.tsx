import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Contact() {
  const { data } = useData();
  const content = data.content;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    segment: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      label: 'Telefone',
      value: content['contact.phone'] || '0800 770 3320'
    },
    {
      icon: Mail,
      label: 'E-mail',
      value: content['contact.email'] || 'contato@linx.com.br'
    },
    {
      icon: MapPin,
      label: 'Endereço',
      value: content['contact.address'] || 'Av. das Nações Unidas, 7221 - São Paulo, SP'
    },
    {
      icon: Clock,
      label: 'Horário de Atendimento',
      value: content['contact.hours'] || 'Segunda a Sexta, 8h às 18h'
    }
  ];

  const segmentOptions = [
    'Moda e Acessórios',
    'Alimentação',
    'Farmácia',
    'Postos de Combustível',
    'Outros'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', segment: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contato" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {content['contact.title'] || 'Vamos'}
          </h2>
          <p className="text-4xl sm:text-5xl font-bold text-primary">
            {content['contact.subtitle'] || 'conversar?'}
          </p>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {content['contact.description'] || 'Ligamos para você em até 1h. Fale sobre os desafios do seu negócio e encontre a solução ideal.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-6">
              Informações de Contato
            </h3>

            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 p-6 bg-card rounded-xl border border-border flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Mapa - São Paulo, SP
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-6">
              {content['contact.form.title'] || 'Receba uma ligação'}
            </h3>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  Solicitação enviada!
                </h4>
                <p className="text-muted-foreground">
                  Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <Label htmlFor="name">
                    {content['contact.form.name'] || 'Nome'}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    {content['contact.form.phone'] || 'Telefone'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    {content['contact.form.email'] || 'E-mail'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="segment">
                    {content['contact.form.segment'] || 'Segmento'}
                  </Label>
                  <Select
                    value={formData.segment}
                    onValueChange={(value) =>
                      setFormData({ ...formData, segment: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      {segmentOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">
                    {content['contact.form.message'] || 'Mensagem'}
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Conte-nos sobre seu negócio..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {content['contact.form.submit'] || 'Solicitar Contato'}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}