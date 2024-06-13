import Link from "next/link";
import { Button } from "../../components/ui/button";

export function Header() {
  return (
    <div className="flex justify-between items-center h-20 mb-5 bg-headerBackground">
      <div className="text-xl text-white pl-10">Phigrosレート計算ツール</div>
      <div className="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 px-10">
        <Button className="bg-lime-500 hover:bg-lime-300">
          <Link href="/" className="text-black">ホーム</Link>
        </Button>
        <Button className="bg-yellow-500 hover:bg-yellow-300">
          <Link href="/rate" className="text-black">レート計算</Link>
        </Button>
        <Button className="bg-teal-500 hover:bg-teal-300">
          <Link href="/submitScore" className="text-black">スコア登録</Link>
        </Button>
      </div>
    </div>
  );
}
