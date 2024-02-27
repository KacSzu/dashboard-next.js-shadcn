import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardTitle } from "./ui/card";
const data = [
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
  {
    avatar: "https://github.com/shadcn.png",
    name: "Kacper Szulc",
    email: "kacper.sz1@o2.pl",
    price: "1982zł",
  },
];
function ActiveOrders() {
  return (
    <div className="w-[29%]">
      <Card className="p-4">
        <CardTitle>Recent projects</CardTitle>
        <CardContent className="p-0 mt-5 flex flex-col  divide-y divide-y-muted-foreground">
          {data.map(({ avatar, name, email, price }, i) => (
            <div
              key={i}
              className="flex justify-between mt-1 space-y-3 items-center"
            >
              <Avatar>
                <AvatarImage src={avatar} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p>{name}</p>
                <span className="text-xs text-muted-foreground">{email}</span>
              </div>
              <div className="text-primary">+{price}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default ActiveOrders;
