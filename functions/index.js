const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

// Update account on transaction creation
exports.updateAccountOnTransaction = functions.firestore
  .document("users/{uid}/transactions/{transactionId}")
  .onCreate(async (snap, context) => {
    console.log("hello");
    const transaction = snap.data();
    const { uid } = context.params;

    // Find the account by name (assuming accountName is unique per user)
    const accountsRef = admin.firestore().collection(`users/${uid}/accounts`);
    const accountSnap = await accountsRef
      .where("accountName", "==", transaction.account)
      .limit(1)
      .get();

    if (!accountSnap.empty) {
      const accountDoc = accountSnap.docs[0];
      const accountRef = accountDoc.ref;
      const amount = Number(transaction.amount);

      if (transaction.type === "Expense") {
        await accountRef.update({
          balance: admin.firestore.FieldValue.increment(-amount),
          totalExpense: admin.firestore.FieldValue.increment(amount),
        });
      } else if (transaction.type === "Income") {
        await accountRef.update({
          balance: admin.firestore.FieldValue.increment(amount),
          totalIncome: admin.firestore.FieldValue.increment(amount),
        });
      }
    }
  });
