import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
    return (
        <div className="dark min-h-screen flex items-center justify-center bg-background p-4">
             <div className="absolute top-8 left-8">
                <Link to="/" className="flex items-center space-x-2">
                    <Clapperboard className="h-8 w-8 text-primary" />
                    <span className="text-2xl font-bold">Streamix</span>
                </Link>
             </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button className="w-full">Sign in</Button>
                    <p className="mt-4 text-center text-sm text-muted-foreground">
                        Don't have an account? <a href="#" className="underline">Sign up</a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};
  
export default AuthPage;