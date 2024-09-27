import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import coverImage from "@/assets/images/cover-01.jpg";
import { Label } from "@/components/ui/label";
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");

  // Login function
  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", { email, password });
  };

  // Register function
  const handleRegister = () => {
    // Handle register logic here
    console.log("Registering with", { fullName, username, registerPassword });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left side image */}
      <div className="hidden md:flex md:w-1/2 bg-cover bg-center">
        <img
          src={coverImage}
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-col justify-center w-full md:w-1/2 bg-white p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {activeTab === "login" ? "Welcome..." : "Create an account..."}
        </h2>
        <div className="mx-auto w-full max-w-md">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            {/* Tab list for switching between login and register */}
            <TabsList className="flex justify-around">
              <TabsTrigger value="login" className="w-full">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="w-full">
                Register
              </TabsTrigger>
            </TabsList>

            {/* Login Tab Content */}
            <TabsContent value="login">
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" onClick={handleLogin}>
                Login
              </Button>
            </TabsContent>

            {/* Register Tab Content */}
            <TabsContent value="register">
              <div className="mb-4">
                <Label htmlFor="fullname">Full Name</Label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="flex h-10 !w-full rounded-md !border !border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="registerPassword">Password</Label>
                <Input
                  type="password"
                  id="registerPassword"
                  placeholder="Enter your password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="registerPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmRegisterPassword"
                  placeholder="Confirm your password"
                  value={confirmRegisterPassword}
                  onChange={(e) => setConfirmRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <Button className="w-full" onClick={handleRegister}>
                Register
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
