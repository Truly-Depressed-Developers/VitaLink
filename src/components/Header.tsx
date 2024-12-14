import { Avatar, AvatarImage } from "./ui/avatar";

export default function Header({ isHomePage }: { isHomePage: boolean }) {
  return (
    <div className="h-[5vh]">
      {isHomePage ? (
        <>
          <h1 className="text-center text-xl font-bold">VitaLink</h1>
          <Avatar className="absolute right-4 top-4 h-5 w-5">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </>
      ) : (
        <h1 className="text-center text-xl font-bold">VitaLink</h1>
      )}
    </div>
  );
}
