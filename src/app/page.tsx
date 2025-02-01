import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="flex h-32 flex-col items-center justify-center gap-4 rounded-b-3xl bg-[#1D3461]">
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/pl.svg"
            alt="Premier League Logo"
            width={20}
            height={20}
            className=""
          />
          <h1 className="text-3xl text-white">Premier League</h1>
        </div>
      </div>
    </div>
  );
}
