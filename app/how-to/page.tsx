'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function HowToPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-transparent">
      {/* Header */}
      <header 
        className="sticky top-0 z-40 shadow-lg border-b border-blue-300 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/header-mogi.jpg)',
          backgroundAttachment: 'scroll'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-start gap-4">
            <button
              onClick={() => router.back()}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                使い方ガイド
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 bg-white/10 backdrop-blur-md rounded-2xl my-4 sm:my-8 mx-4 sm:mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 space-y-8">
          {/* Introduction */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              長崎県茂木町の魅力の記録について
            </h2>
            <p className="text-foreground text-base leading-relaxed">
              このアプリケーションは、長崎県茂木町で実施した取材内容を記録・管理するためのツールです。以下の機能を使い、効率的に取材情報を管理できます。
            </p>
          </div>

          {/* Feature 1 */}
          <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📝</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  1. 新規作成ボタンで取材記録を作成
                </h3>
                <p className="text-foreground leading-relaxed">
                  ページ右上の「新規作成」ボタンをクリックすると、取材記録入力フォームが表示されます。以下の情報を入力してください：
                </p>
                <ul className="list-disc list-inside text-foreground mt-3 space-y-2">
                  <li><strong>取材相手の名前</strong>：インタビュー対象者の名前</li>
                  <li><strong>取材日</strong>：カレンダーから取材実施日を選択</li>
                  <li><strong>取材内容</strong>：詳細な取材内容をテキストで入力</li>
                </ul>
                <p className="text-foreground mt-3 text-sm text-gray-600">
                  全ての項目は必須です。入力完了後、「保存」ボタンをクリックしてください。
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="border-l-4 border-emerald-500 pl-6 py-4 bg-emerald-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📥</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  2. CSVダウンロードで記録をエクスポート
                </h3>
                <p className="text-foreground leading-relaxed">
                  ページ右上の緑色の「CSVダウンロード」ボタンをクリックすると、現在の取材記録すべてがCSV形式のファイルでダウンロードされます。
                </p>
                <p className="text-foreground mt-3 leading-relaxed">
                  ダウンロードされたCSVファイルは、ExcelやGoogleスプレッドシートなどで開き、さらに詳しい分析や管理ができます。
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-3xl">🔍</div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  3. キーワード検索で関連記録を抽出
                </h3>
                <p className="text-foreground leading-relaxed">
                  一覧ページの上部にある検索ボックスを使い、キーワードで取材記録をフィルタリングできます。
                </p>
                <p className="text-foreground mt-3 leading-relaxed">
                  <strong>検索対象：</strong>
                </p>
                <ul className="list-disc list-inside text-foreground mt-2 space-y-1">
                  <li>取材相手の名前</li>
                  <li>取材内容のテキスト</li>
                  <li>記録の要約</li>
                </ul>
                <p className="text-foreground mt-3 text-sm text-gray-600">
                  例：「茂木漁港」「地域貢献」などのキーワードを入力すると、関連する取材記録のみが表示されます。
                </p>
              </div>
            </div>
          </div>

          {/* Additional Tips */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 pl-6 py-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-3xl">💡</div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  便利なTips
                </h3>
                <ul className="space-y-2 text-foreground">
                  <li>
                    <strong>カード表示：</strong>
                    各取材記録はカード形式で表示され、取材日、取材相手の名前、内容の要約が一目で確認できます。
                  </li>
                  <li>
                    <strong>詳細表示：</strong>
                    任意のカードをクリックするとモーダルが開き、取材内容の全文が表示されます。
                  </li>
                  <li>
                    <strong>削除機能：</strong>
                    詳細モーダル内の「削除」ボタンで不要な記録を削除できます。
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-semibold px-8 py-3"
            >
              一覧に戻る
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
