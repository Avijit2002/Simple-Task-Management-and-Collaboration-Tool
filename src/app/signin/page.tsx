
import Signin from "../_components/signinForm";
import LampDemo from "../_components/lampHeading";

export default async function Home() {
  return (
    <main className="grid h-screen w-screen grid-cols-2">
      <div className=" bg-purple-50 grid place-items-center">
        <Signin />
      </div>
      <div className=" bg-purple-400">
        <LampDemo />
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.read();

//   return (
//     <div className="w-full max-w-xs">
//       <CreatePost />
//       <h2>Your posts:</h2>
//       {latestPost ? (
//         latestPost.map(x=>{
//           return(
//             <div>
//               <p key={x.id} className="truncate"> {x.name}</p>
//             </div>
//           )
//         })
//       ) : (
//         <p>You have no posts yet.</p>
//       )}
//     </div>
//   );
// }
