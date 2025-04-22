import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui";
import { Zap, Rocket, LogIn, UserPlus } from "lucide-react";

function AnimatedAuthPages() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setGradientPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (isLogin) => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: ""
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e, isLogin) => {
    e.preventDefault();
    setIsAnimating(true);
    
    setTimeout(() => {
      if (validateForm(isLogin)) {
        setTimeout(() => {
          console.log(isLogin ? "Login successful" : "Signup successful", formData);
          setIsAnimating(false);
        }, 1000);
      } else {
        setIsAnimating(false);
      }
    }, 300);
  };

  const getButtonVariant = () => {
    return activeTab === "login" ? "accent" : "primary";
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-all duration-500"
      style={{
        background: `
          radial-gradient(
            circle at ${gradientPos.x}% ${gradientPos.y}%,
            hsl(var(--accent)),
            hsl(var(--primary)),
            hsl(195, 100%, 85%)
          )
        `,
      }}
    >
      <Card className="w-full max-w-md backdrop-blur-sm bg-background/80 border-none shadow-lg overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        <CardHeader className="text-center relative z-10">
          <div className="flex justify-center mb-2">
            {activeTab === "login" ? (
              <LogIn className="w-8 h-8 text-accent animate-bounce" />
            ) : (
              <UserPlus className="w-8 h-8 text-primary animate-pulse" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">
            {activeTab === "login" ? "Welcome Back!" : "Join Us!"}
          </CardTitle>
          <CardDescription className="text-muted-foreground/80">
            {activeTab === "login" 
              ? "Login to access your account" 
              : "Create a new account to get started"}
          </CardDescription>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
          <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-sm">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all"
            >
              <LogIn className="w-4 h-4 mr-2" /> Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <form onSubmit={(e) => handleSubmit(e, true)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-accent-foreground/80">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`transition-all ${errors.email ? "border-destructive animate-shake" : "border-accent/30 hover:border-accent/60 focus:border-accent"}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-accent-foreground/80">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`transition-all ${errors.password ? "border-destructive animate-shake" : "border-accent/30 hover:border-accent/60 focus:border-accent"}`}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm animate-fade-in">
                      {errors.password}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  variant={getButtonVariant()}
                  className={`w-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${isAnimating ? "animate-pulse" : ""}`}
                  disabled={isAnimating}
                >
                  {isAnimating ? (
                    <span>Accessing your account...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-bounce" />
                      <span>Login</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-6">
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-primary-foreground/80">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`transition-all ${errors.email ? "border-destructive animate-shake" : "border-primary/30 hover:border-primary/60 focus:border-primary"}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-primary-foreground/80">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`transition-all ${errors.password ? "border-destructive animate-shake" : "border-primary/30 hover:border-primary/60 focus:border-primary"}`}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm animate-fade-in">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-primary-foreground/80">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`transition-all ${errors.confirmPassword ? "border-destructive animate-shake" : "border-primary/30 hover:border-primary/60 focus:border-primary"}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm animate-fade-in">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  variant={getButtonVariant()}
                  className={`w-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 ${isAnimating ? "animate-pulse" : ""}`}
                  disabled={isAnimating}
                >
                  {isAnimating ? (
                    <span>Creating your account...</span>
                  ) : (
                    <>
                      <Rocket className="w-4 h-4 mr-2 animate-pulse" />
                      <span>Launch Your Journey</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Add these to your CSS
const styles = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-shake {
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;

// Inject styles
document.head.appendChild(
  Object.assign(document.createElement('style'), { textContent: styles })
);

export default AnimatedAuthPages;
