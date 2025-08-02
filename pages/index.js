export default function Home() {
  return (
    <main className="p-8 max-w-xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-2">🧠 Farcaster Mini App</h1>
      <p className="text-gray-600 mb-6">Preview any OpenSea token directly in Warpcast as a frame.</p>

      <div className="bg-gray-100 p-4 rounded-md text-left text-sm">
        <p className="mb-1 font-semibold">Example Cast:</p>
        <code className="block whitespace-pre">
          [frame]{"\n"}
          src: https://farcaster-miniapp-os.vercel.app/f/base/0x4200000000000000000000000000000000000006
        </code>
      </div>

      <p className="mt-8 text-xs text-gray-400">This is day 1 on Zack's coding journey 🛠️</p>
    </main>
  );
}
