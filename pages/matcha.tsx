// pageフォルダの中で絶対importするやつ
import type { NextPage } from 'next';

import Card from '../src/components/card';

// typescriptを書ける謎の空間

// 関数コンポーネント
// typescriptでは 「:　型」っていう感じの書き方する
// 今回は「Matcha」っていう関数コンポーネントに上でimportした「NextPage」っていう型をつけてる
const Matcha: NextPage = () => {
    // typescriptを書ける謎の空間
    const title = "カード"
    const kana = "カナ"

    // return文でjsxを返す
    // jsxとはjsの中にhtmlを書くやつ
    // 最初はキモいけどいつか慣れる、ガンバって
    return(
        <>
            <p>aaa</p>
            <h1>matchaです!!!!!!!!!!!!!!!!!!!!</h1>
            <p>超便利!</p>
            <Card title={title} kana={kana}/>
        </>
    )
}

// exportしないと動かない
// 定型文として覚えるやつ
export default Matcha;

// エディタ: pages/matcha.tsx
// 実際のリンク: localhost:3001/matcha
// Next.jsではpagesフォルダの中のファイルの名前が、リンクと結びつく

// pages/matcha.tsxはsrc/components/card.tsxを読み込んでる
// pagesフォルダとcomponentsフォルダの違いは、実際のリンクに影響するかどうか
// pages内のファイルは作っただけで生成される
// components内のファイルは、読み込まないと表示されない
// (Cardコンポーネントをmatcha.tsxに読み込ませてるのは表示させたいから)
// matcha.tsxが親で、cardが子！！！！！！！
// 親から子に情報を渡したい、それがprops(title、kanaがそれ)
