// `use client`
`useSession({ required: true })`
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route.js";
import { Operations } from "../../components/Operations.jsx";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-10">
      {/* <Link className="p-3 rounded hover:bg-emerald-600 hover:text-white hover:shadow transition "
          href={`/dashboard/user/${session?.user.id}`}>User Profile</Link> */}
      <div className="relative flex w-fit mb-2 bg-gray-700 border-2 border-slate-600 rounded-2xl">
        <Link href="/track/income">
          <button className="text-xl p-2">Track Expenses</button>
        </Link>
        <span className="absolute flex top-0 right-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
      </div>
      <Operations />
    </div>
  );
}
