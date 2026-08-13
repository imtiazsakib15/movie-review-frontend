import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Movie Review Portal</h1>
      <Link
        href="/browse"
        className="mt-6 inline-block rounded-md bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-200"
      >
        Browse media
      </Link>
    </div>
  );
}
