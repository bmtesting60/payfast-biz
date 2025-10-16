import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Shield, TrendingUp, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import heroBackground from "@/assets/hero-background.jpg";

const Index = () => {
  const features = [
    { icon: Zap, title: "Instant Payments", description: "Send payments in seconds, not days" },
    { icon: Shield, title: "Secure & Compliant", description: "Bank-grade security for all transactions" },
    { icon: Clock, title: "24/7 Processing", description: "Never miss a payment opportunity" },
    { icon: Globe, title: "Global Reach", description: "Support for multiple currencies worldwide" },
  ];

  const benefits = [
    "Zero paperwork or manual processes",
    "Direct bank account transfers",
    "Instant payment confirmations",
    "Real-time transaction tracking",
    "Automated payment workflows",
    "Comprehensive payment support",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-60 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
              B2B Payments Made{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Simple
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your business payments with instant digital transfers. As easy as P2P, built for B2B.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-elegant">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Sending Payments
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose PayFlow?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern businesses that value speed, security, and simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Everything You Need for Modern B2B Payments
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the future of business transactions with our comprehensive payment platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <Card className="p-8 shadow-elegant bg-gradient-to-br from-card to-muted/30">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <span className="text-muted-foreground">Processing Speed</span>
                    <span className="text-2xl font-bold text-success">Instant</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <span className="text-muted-foreground">Uptime</span>
                    <span className="text-2xl font-bold text-foreground">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg backdrop-blur-sm">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-2xl font-bold text-success">98.5%</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center space-x-2 text-success">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-semibold">+127% growth this quarter</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shift animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your B2B Payments?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of businesses already using PayFlow for instant, secure transactions.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-opacity shadow-elegant">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 PayFlow. Built for modern businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
