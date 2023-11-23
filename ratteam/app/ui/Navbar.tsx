import Image from "@/node_modules/next/image";
import logo from "../../public/logo.png";
export default function NavBar() {
  return (
    <div>
      <Image
        src={logo}
        width={500}
        height={500}
        alt="logo"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}
