import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBKSaZxs-tbW7bhxMVkyAr8yJ9lcxrmY0",
  authDomain: "claudeproject-a94ee.firebaseapp.com",
  projectId: "claudeproject-a94ee",
  storageBucket: "claudeproject-a94ee.firebasestorage.app",
  messagingSenderId: "708325305180",
  appId: "1:708325305180:web:b7617def9617d858a5af99"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const videos = [
  { ytId: "ki0O27Y79mg", title: "喜美不爽頭變大", duration: "0:39" },
  { ytId: "y7wfrs_jNzs", title: "喜美金剛不壞體", duration: "1:01" },
  { ytId: "NRhBmcHDZhE", title: "繳學費即可入學 喜美嘲笑亂太郎", duration: "0:28" },
  { ytId: "gCizLmPqyYo", title: "校長老番癲 喜美跟著癲", duration: "3:33" },
  { ytId: "2xV91iIOY_w", title: "喜美寫意擒拿手", duration: "1:30" },
  { ytId: "ab2Ivmj7ddo", title: "紅喜美", duration: "0:27" },
  { ytId: "5VBfg1ab2yA", title: "校長中傀儡術 喜美忠狗護主", duration: "4:05" },
  { ytId: "mzkxN9BX6Pw", title: "喜美狗印效力同等校長", duration: "0:17" },
  { ytId: "_SiXDJKESbA", title: "喜美噴賽內力強", duration: "0:35" },
  { ytId: "4wbemCdd1aw", title: "喜美伯母交情好 吃飯剩下沒關係", duration: "0:30" },
  { ytId: "S_Y3J1GeqvE", title: "考試整忍蛋 喜美有興趣", duration: "0:39" },
  { ytId: "MUOQMwnKgoc", title: "喜美經典灑狗血", duration: "0:23" },
  { ytId: "d82LSsf1o-Q", title: "喜美美食狗 不屑吃小魚", duration: "1:04" },
  { ytId: "VlDIdlKa-Qw", title: "真●喜美搜救隊", duration: "0:56" },
  { ytId: "jl7aJYxL7zY", title: "喜美抽烏龜-2", duration: "1:52" },
  { ytId: "3hfb6UAR2Jw", title: "喜美抽烏龜-1", duration: "1:04" },
  { ytId: "fm4mlQavt2o", title: "喜美也愛吃橘子", duration: "0:23" },
  { ytId: "hgIqldZVV9k", title: "喜美最不爽偷吃", duration: "1:28" },
  { ytId: "JA39x6ZKRm8", title: "校長耍賴吞象棋", duration: "0:47" },
  { ytId: "SoU93sixkDU", title: "喜美兼職當偵探", duration: "3:40" },
  { ytId: "Ce0B7H6WGfg", title: "忍蛋平安歸來 喜美喜敲木魚", duration: "3:26" },
  { ytId: "ujNbumK14Nc", title: "老番癲發作 喜美皮皮剉", duration: "0:49" },
  { ytId: "9Z-kQ3F4y3g", title: "喜美之倒數計時", duration: "0:57" },
  { ytId: "wcppy3xyH2s", title: "比武太無聊 喜美快睡著", duration: "1:19" },
  { ytId: "KeT_390Cr70", title: "喜美領命抓刺客", duration: "0:26" },
  { ytId: "Yp8bODSCEL8", title: "失眠太痛苦 喜美也認同", duration: "2:26" },
  { ytId: "flGt2UoP8yg", title: "喜美無所不能 敲鐘打鼓都行", duration: "0:16" },
  { ytId: "zO-8TC8SNaY", title: "喜美燒腦下圍棋", duration: "0:46" },
  { ytId: "5CBcx-i7pFo", title: "喜美被抓龍", duration: "0:32" },
  { ytId: "eL7NpcPdw4s", title: "喜美搞笑變銅像", duration: "1:05" },
  { ytId: "nj6TBZTKT2k", title: "喜美抓龍", duration: "0:10" },
  { ytId: "LQ93yNHXrqU", title: "喜美之你丟我撿", duration: "0:36" },
  { ytId: "ixs_E8LevwE", title: "吸到胡椒打噴嚏", duration: "0:13" },
  { ytId: "W5YndlMzRWk", title: "喜美悠哉喝抹茶", duration: "0:47" },
  { ytId: "svoIo63GeDw", title: "老師出門 喜美代課", duration: "0:20" },
  { ytId: "-rOV8kXR2jo", title: "喜美完全沒興趣", duration: "0:40" },
  { ytId: "Re-2PQ1sf4Y", title: "喜美喜歡喝甜酒", duration: "1:52" },
  { ytId: "Zs_ZkUla13c", title: "喜美難得出遠門", duration: "1:19" },
  { ytId: "Zm-e3-M3w2w", title: "喜美搞笑BBQ", duration: "0:30" },
  { ytId: "K7S_5ykMtjY", title: "喜美緊急來通報", duration: "0:24" },
  { ytId: "VBCHl1z0RhU", title: "喜美象棋又要贏 校長假裝頭很痛", duration: "0:14" },
  { ytId: "VClaql9u-t4", title: "沒有招待好 喜美很拍謝", duration: "0:11" },
  { ytId: "5A9azoK-ftc", title: "喜美之雲很像魚", duration: "0:21" },
  { ytId: "BFT1dtYtFMg", title: "喜美搞笑泡抹茶", duration: "0:37" },
  { ytId: "Ob1XZziFm5U", title: "喜美雖小被PK", duration: "0:20" },
  { ytId: "s5JiiB0VTvU", title: "喜美不爽鼾聲大", duration: "0:42" },
  { ytId: "bNEc6JlVG_I", title: "喜美楞葵花寶典", duration: "0:46" },
  { ytId: "cjWDVyzCZxg", title: "户部老師閃到腰", duration: "0:20" },
  { ytId: "Uj7u5W-0yAI", title: "喜美歡喜狂敲鐘", duration: "0:07" },
  { ytId: "YGE5V-7og4E", title: "笨忍者不會漢字 喜美代寫挑戰書", duration: "0:42" },
  { ytId: "XMN4AvK51xw", title: "喜美仍是不鳥他", duration: "0:54" },
  { ytId: "LEs_8xPue1M", title: "喜美不鳥笨忍者", duration: "0:40" },
  { ytId: "av_UOLb8fQ8", title: "喜美雖小吃瀉藥", duration: "1:03" },
  { ytId: "wF4d6_KQr2E", title: "喜美嚇到剉青賽", duration: "0:31" },
  { ytId: "vdow8E5ITO4", title: "喜美蘇聯將軍招", duration: "0:37" },
  { ytId: "Dl8vAUCVwCI", title: "喜美葡萄被偷吃", duration: "1:12" },
  { ytId: "PFlPf0Q2Kys", title: "吃了阿里菇 很想洗衣服", duration: "0:29" },
  { ytId: "6AaIUi_Klrc", title: "聽到阿里菇 喜美有興趣", duration: "0:17" },
  { ytId: "BYdCg0la7R4", title: "喜美表示認可", duration: "0:11" },
  { ytId: "mvDSWK0-L7o", title: "雜草變沙拉 喜美很不爽", duration: "0:44" },
  { ytId: "hykHfPqkBqE", title: "喜美掃地突尿急", duration: "0:28" },
  { ytId: "o5TqjhZyo_k", title: "喜美雖小噴鼻水", duration: "0:31" },
  { ytId: "TiUxqRTpn_o", title: "喜美雖小掉陷阱", duration: "0:21" },
  { ytId: "rwKdk1hU0aE", title: "喜美勞跑不掃地", duration: "0:12" },
];

async function seed() {
  console.log(`Seeding ${videos.length} videos...`);
  for (const v of videos) {
    await setDoc(doc(collection(db, "videos"), v.ytId), {
      ytId: v.ytId,
      title: v.title,
      duration: v.duration,
      likes: 0,
      createdAt: serverTimestamp(),
    });
    console.log(`✓ ${v.title}`);
  }
  console.log("Done!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
