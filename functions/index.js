const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");

initializeApp();

// 驗證入館答案，答案與帳密只存在伺服器端，原始碼不可見
exports.verifyGateAnswer = onCall({ region: "asia-east1", invoker: "public" }, async (request) => {
  const CORRECT_ANSWERS = ["阿里菇", "蘇聯將軍"];
  const VISITOR_EMAIL = "visitor@himivideo.com";
  const VISITOR_PASSWORD = "ThreeCatZaCao!";

  const answer = (request.data.answer || "").trim();

  if (!CORRECT_ANSWERS.includes(answer)) {
    throw new HttpsError("permission-denied", "答案不對，再想想喜美的故事…");
  }

  // 答案正確 → 回傳帳密讓前端登入（帳密不在 index.html 原始碼中）
  return { email: VISITOR_EMAIL, password: VISITOR_PASSWORD };
});
