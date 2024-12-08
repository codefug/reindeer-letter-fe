import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="relative h-[22px] w-[67px] bg-black opacity-50">
        <Image src="/images/logo.png" alt="loading" fill priority />
      </section>
    </div>
  );
}
