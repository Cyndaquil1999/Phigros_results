import Link from "next/link";
import { Button } from "../../components/ui/button";

export function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xl">Phigrosレート計算ツール</div>
      <div className="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
        <Button>
          <Link href="/">ホーム</Link>
        </Button>
        <Button>
          <Link href="/rate">レート計算</Link>
        </Button>
        <Button>
          <Link href="/submitScore">スコア登録</Link>
        </Button>
      </div>
    </div>
  );
}
