export interface JobType {
  value: string;
  label: string;
  skills: string[];
}

// Based on actual CrowdWorks and Lancers category structures
export const JOB_TYPES: JobType[] = [
  {
    value: "frontend",
    label: "Webエンジニア・フロントエンド",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Nuxt.js", "Tailwind CSS", "WordPress", "Figma→コーディング", "レスポンシブ対応"],
  },
  {
    value: "backend",
    label: "バックエンドエンジニア",
    skills: ["Node.js", "Python", "PHP", "Ruby", "Java", "Go", "Laravel", "Django", "MySQL", "PostgreSQL", "AWS", "GCP", "Firebase", "Docker", "REST API設計"],
  },
  {
    value: "mobile",
    label: "スマホアプリ開発（iOS/Android）",
    skills: ["Swift", "Kotlin", "React Native", "Flutter", "iOS", "Android", "Firebase", "App Store申請", "Google Play申請"],
  },
  {
    value: "ai",
    label: "AI・機械学習・データサイエンス",
    skills: ["Python", "Claude API", "Gemini API", "OpenAI API", "LangChain", "RAG", "PyTorch", "TensorFlow", "scikit-learn", "自然言語処理", "データ分析", "Pandas"],
  },
  {
    value: "webdesign",
    label: "Webデザイナー・UIデザイナー",
    skills: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "LP制作", "UI設計", "UXデザイン", "バナー制作", "WordPress", "コーディング対応"],
  },
  {
    value: "graphic",
    label: "グラフィックデザイナー・DTP",
    skills: ["Illustrator", "Photoshop", "InDesign", "ロゴ制作", "名刺・チラシ", "印刷物デザイン", "パッケージデザイン", "SNS画像制作"],
  },
  {
    value: "video",
    label: "動画制作・映像編集",
    skills: ["Premiere Pro", "After Effects", "Final Cut Pro", "DaVinci Resolve", "Motion Graphics", "YouTube編集", "字幕・テロップ", "サムネイル制作"],
  },
  {
    value: "writing",
    label: "ライター・コンテンツ制作",
    skills: ["SEOライティング", "ブログ記事作成", "取材・インタビュー", "コピーライティング", "校正・編集", "SNSライティング", "セールスライティング", "メルマガ作成"],
  },
  {
    value: "marketing",
    label: "Webマーケター・SEO",
    skills: ["SEO対策", "Google広告", "Meta広告", "Instagram運用", "X（Twitter）運用", "Google Analytics", "コンテンツマーケティング", "メールマーケティング"],
  },
  {
    value: "translation",
    label: "翻訳・通訳",
    skills: ["英日翻訳", "日英翻訳", "中国語翻訳", "韓国語翻訳", "技術翻訳", "ビジネス翻訳", "字幕翻訳", "同時通訳"],
  },
  {
    value: "dataentry",
    label: "データ入力・事務・バックオフィス",
    skills: ["データ入力", "Excel", "Word", "Googleスプレッドシート", "文字起こし", "Webリサーチ", "カスタマーサポート", "議事録作成"],
  },
  {
    value: "consulting",
    label: "コンサルタント・ビジネス支援",
    skills: ["経営コンサルティング", "マーケティング戦略", "事業計画書作成", "PowerPoint資料作成", "Webコンサルティング", "業務効率化"],
  },
];

export const EXPERIENCE_YEARS = [
  { value: "under1", label: "1年未満" },
  { value: "1to3", label: "1〜3年" },
  { value: "3to5", label: "3〜5年" },
  { value: "5to10", label: "5〜10年" },
  { value: "over10", label: "10年以上" },
];

export const TONES = [
  { value: "polite" as const, label: "丁寧" },
  { value: "business" as const, label: "ビジネス" },
  { value: "passionate" as const, label: "熱意重視" },
];

export const STRENGTH_SUGGESTIONS: Record<string, string[]> = {
  frontend: [
    "デザインカンプからの忠実なコーディングが得意で、ピクセル単位のズレも見逃しません。",
    "レスポンシブ対応とクロスブラウザ検証を標準で行い、スマホ〜PCで完璧に崩れない実装を提供します。",
    "コンポーネント設計の知識があり、保守しやすいコードを心がけています。リファクタも対応可能です。",
    "Figmaのデザインデータを直接確認しながら実装するため、認識のズレが少なく、手戻りを最小化できます。",
  ],
  backend: [
    "API設計からDB設計・サーバー構築まで一気通貫で対応でき、フロントとの連携経験も豊富です。",
    "セキュリティ（認証・権限管理・SQLインジェクション対策）を意識した実装を標準で行います。",
    "パフォーマンス改善の実績があり、レスポンス速度の最適化やN+1問題の解消も得意です。",
    "ドキュメントの整備を丁寧に行い、引き継ぎやチーム開発でも混乱が起きにくい構成にします。",
  ],
  mobile: [
    "iOSとAndroid両対応の経験があり、片方だけでなくクロスプラットフォーム対応が可能です。",
    "App Store/Google Playへの申請・審査対応の経験があるため、リリースまでトータルに対応できます。",
    "UXを重視したUI実装が得意で、ネイティブのような滑らかな動作を意識した開発をしています。",
    "プッシュ通知・決済・位置情報など各種SDK連携の実績があり、機能追加にも柔軟に対応できます。",
  ],
  ai: [
    "LLM APIの組み込み〜プロンプト設計まで対応でき、用途に合わせた回答精度のチューニングが得意です。",
    "RAGを用いた社内データ活用システムの構築経験があり、ハルシネーションを減らす設計ができます。",
    "Pythonによるデータ処理〜分析〜可視化まで一気通貫で対応でき、非エンジニアへの説明も丁寧です。",
    "AIの倫理・安全性も意識した実装を行い、出力のフィルタリングや人間によるチェックフローも設計します。",
  ],
  webdesign: [
    "デザインだけでなくコーディング実装まで対応可能なため、デザイナーとエンジニアの橋渡しができます。",
    "UX視点でのUI設計が得意で、ユーザーが迷わない導線・CTA配置を意識したデザインを提供します。",
    "クライアントの事業・ターゲット・競合を調査した上でデザイン方針を提案し、単なる見た目だけでなく成果につながるデザインを作ります。",
    "修正対応は迅速に行い、コメントやFigmaの共有で認識合わせをしながら進めるのでスムーズに完成に至ります。",
  ],
  graphic: [
    "ブランドイメージや世界観を深く理解した上でデザインに落とし込み、一貫性のあるビジュアルを提供します。",
    "印刷物の入稿データ作成に精通しており、色ズレや解像度の問題が起きないデータで納品します。",
    "ラフ案〜本制作の段階で丁寧にフィードバックを得ながら進めるため、手戻りが少ないのが強みです。",
    "SNS用・印刷用・Web用と用途に合わせた最適な形式で複数納品対応が可能です。",
  ],
  video: [
    "テロップのデザインや動きにもこだわり、視聴者が最後まで離脱しない編集を心がけています。",
    "YouTubeのアルゴリズムを意識した尺・構成設計ができ、再生維持率の改善に貢献できます。",
    "BGM・効果音の選定・音量バランスも丁寧に調整し、視聴体験を損なわない仕上がりにします。",
    "修正回数の上限を設けず、ご満足いただけるまで柔軟に対応します。サムネイル制作も同時に承ります。",
  ],
  writing: [
    "SEOと読者体験を両立した記事を作成でき、検索順位の向上と回遊率の改善に貢献します。",
    "取材・インタビューの経験があり、一次情報を元にした信頼性の高いコンテンツを提供できます。",
    "クライアントのトンマナ・ブランドボイスを最初にしっかりヒアリングし、ブランドに合った文体で書きます。",
    "納期前日には必ず仮納品を行い、修正時間を確保する進め方で締め切りを守ります。",
  ],
  marketing: [
    "広告運用は数値分析を必ず行い、CPAやROASを意識した改善サイクルを回せます。",
    "SEOとSNS運用を組み合わせた複合的な集客戦略を提案でき、チャネル横断での成果を出します。",
    "Google Analytics/Search Consoleのデータを読み解き、根拠のある改善提案が得意です。",
    "小さくテストして効果検証 → 勝ちパターンをスケールするという進め方で、無駄な予算消費を防ぎます。",
  ],
  translation: [
    "専門分野（技術・法律・医療など）の翻訳経験があり、用語の正確さと自然な読み口を両立します。",
    "翻訳メモリやスタイルガイドを活用し、長期・大量案件でも表記ゆれなく一貫した品質で納品します。",
    "翻訳後に必ず逆翻訳チェックとネイティブ確認を行い、ニュアンスのずれを排除します。",
    "タイトなスケジュールへの対応経験があり、急ぎ案件の優先対応も可能です。",
  ],
  dataentry: [
    "入力後は必ずセルフチェックを行い、誤字・入力ミスが限りなくゼロに近い状態で納品します。",
    "大量データの処理はExcelマクロや関数を活用し、手作業よりも速く・正確に対応できます。",
    "進捗報告を細かく行い、依頼者が状況を把握しやすいコミュニケーションを心がけています。",
    "機密情報の取り扱いにも慣れており、情報管理の徹底について事前にルールを確認・遵守します。",
  ],
  consulting: [
    "現状の課題を数値で把握した上で施策を提案し、感覚ではなくデータに基づいた意思決定を支援します。",
    "中小企業から大手まで幅広い支援経験があり、組織の規模や状況に合わせた現実的な提案が得意です。",
    "戦略を作るだけでなく、実行フェーズのサポートまで伴走できるため、絵に描いた餅で終わりません。",
    "資料作成（PowerPoint/Notion）が得意で、社内展開・役員報告に使えるクオリティで成果物を提供します。",
  ],
};
