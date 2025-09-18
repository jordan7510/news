import Image from "next/image";
import Logo from "../../../public/assets/argus_logo.svg"

export default function MiddleHeader() {

  return (
    <div>
      <div>
        <Image
          src={Logo}
          alt="Logo" width={250} height={100}
        />
      </div>
      <div>
        {/* <Image
        src={}
        /> */}
      </div>
    </div>
  )
}
