import { ModeToggle } from "./ModeToggle";

function Header() {
  return (
    <div className="flex w-[80%] item-center justify-end m-[auto] py-[10px]">
      <div className="Right">
        <ModeToggle />
      </div>
    </div>
  );
}

export default Header;
