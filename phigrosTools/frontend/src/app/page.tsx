import { Header } from "./_component/header";
import { Button } from "../components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center mb-10">
        <div className="text-xl mb-4">このツールでは以下の機能があります。</div>
        <div className="flex flex-col space-y-2 text-lg">
          <div className="flex">
            <span>1.</span>
            <span> Phigrosのレート計算</span>
          </div>
          <div className="flex">
            <span>2.</span>
            <span> ハイスコアを登録・保存</span>
          </div>
          <div className="flex">
            <span>3.</span>
            <span> レート上げにおすすめの譜面推薦</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4">
        <Button className="w-32 sm:w-40 md:w-48 lg:w-56">
          <Link href="/signin">ログイン</Link>
        </Button>
        <Button className="w-32 sm:w-40 md:w-48 lg:w-56">
          <Link href="/signup">会員登録</Link>
        </Button>
      </div>
    </div>
  );
}
