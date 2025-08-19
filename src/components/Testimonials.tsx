import React from 'react';
import { Star, Briefcase, GraduationCap, Globe, MessageCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const testimonials = [
  {
    name: "Natália C.",
    profession: "Gerente",
    icon: Briefcase,
    iconColor: "bg-brand-teal",
    text: "Se você precisa aprender espanhol para o trabalho a Uni é ótima, eu não sabia nada quando comecei e tinha muita vergonha de tentar... em 3 meses já conseguia participar em reuniões do trabalho de forma significativa! Hoje sou gerente e comando LATAM no meu departamento.",
    rating: 5
  },
  {
    name: "Adriana V.",
    profession: "Coordenadora de RH",
    icon: GraduationCap,
    iconColor: "bg-brand-orange",
    text: "Faço aula de espanhol e saí do zero ao avançado com uma metodologia e abordagem maravilhosa! Hoje trabalho em uma startup e não tenho dificuldades em me comunicar e entender nossos colaboradores hispanos!",
    rating: 5
  },
  {
    name: "Paula Q.",
    profession: "Líder Global",
    icon: Globe,
    iconColor: "bg-brand-yellow",
    text: "Quando comecei minhas aulas eu me sentia insegura e com muito medo de falar nas reuniões de trabalho, hoje sou fluente e líder de uma equipe Global que atende LATAM e USA.",
    rating: 5
  },
  {
    name: "Leticia J.",
    profession: "Analista",
    icon: Briefcase,
    iconColor: "bg-brand-teal",
    text: "Iniciei com as aulas de espanhol há 2 anos, estou muito feliz com a minha evolução e com a didática utilizada pela professora Milena.",
    rating: 5
  }
];

export default function Testimonials() {
  const whatsappNumber = "5511950816765";
  const whatsappMessage = "Olá! Vi os depoimentos das alunas e quero ter a mesma experiência!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-brand-yellow/10 to-brand-orange-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que nossas alunas dizem
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Histórias reais de transformação e conquista da confiança
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {testimonials.map((testimonial, index) => {
            const IconComponent = testimonial.icon;
            return (
              <AnimatedSection
                key={index}
                animation="slideUp"
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
                      {index === 0 && (
                        <img 
                          src="/_name_SJvDxw0azqw_9d73c51a-cb14-4b3e-a8d0-0982299aa379.webp" 
                          alt="Natália C."
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                      {index === 1 && (
                        <img 
                          src="/retrato-de-mulher-senior-em-blazer-profissional-ao-ar-livre.jpg" 
                          alt="Adriana V."
                          className="w-full h-full object-cover object-top"
                        />
                      )}
                      {index === 2 && (
                        <img 
                          src="/photo-1590650153855-d9e808231d41.jpeg" 
                          alt="Paula Q."
                          className="w-full h-full object-cover object-center"
                        />
                      )}
                      {index === 3 && (
                        <img 
                          src="/_name_RAjpj5SVvHI_83c44082-4012-4582-a4c1-0d937b235c2b.webp" 
                          alt="Leticia J."
                          className="w-full h-full object-cover object-center"
                        />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                      <Star className="w-3 h-3 text-brand-yellow fill-current" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm sm:text-base font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.profession}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-yellow fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </AnimatedSection>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Elas também tinham medo de errar. Hoje falam espanhol com confiança.

Agora é a sua vez de transformar o seu jeito de aprender! 
          </p>
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Quero mudar minha história</span>
          </a>
        </div>
      </div>
    </section>
  );
}
