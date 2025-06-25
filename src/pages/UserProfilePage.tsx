import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserProfilePage = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <Avatar className="h-32 w-32">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">User Name</h1>
          <p className="mt-2 text-muted-foreground">user.name@example.com</p>
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold">My List</h2>
        <p className="mt-2 text-muted-foreground">
          This section would display the user's saved movies and shows.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
           {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="bg-muted aspect-video rounded-md flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Saved Item {i+1}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;