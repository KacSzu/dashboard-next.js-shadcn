import { ModeToggle } from "./ModeToggle";

function Header() {
  return (
    <div className="flex w-[80%] item-center justify-end m-[auto] py-[10px]">
      <ModeToggle />
    </div>
  );
}

export default Header;
