
import Signup from "../_components/signupForm";
import LampDemo from "../_components/lampHeading";

export default async function Home() {
  return (
    <main className="grid h-screen w-screen grid-cols-2">
      <div className=" bg-purple-50 grid place-items-center">
        <Signup />
      </div>
      <div className=" bg-purple-400">
        <LampDemo />
      </div>
    </main>
  );
}

