var uid;
document.getElementById('help').addEventListener('click', help);
document.getElementById('submit').addEventListener('click', submit);

window.onload = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.

            var user = firebase.auth().currentUser;

            if (user != null) {
                var email_id = user.email;
                var name = user.displayName;
                uid = user.uid;
                console.log("Signed in with" + email_id + uid);

            }
        }
        else {
            window.location.href = "https://andronix-techriz.firebaseapp.com/login.html";

        }
    });


}


function submit() {


    var purID = document.getElementById('purchID').value;
    checkForID(purID);

}

function checkForID(id) {

    // /premiumID/users/7dlpEmVPM4f204Fe2duyPx5khSI2/xtaIbnNNPjJNH0RGCHCm
    console.log("Reaching here!")
    var db = firebase.firestore();
    var docRef = db.collection("users").doc("properties").collection(uid).doc("isPrem");
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Prem gotcha", doc.data());
        isPrem = doc.data().isprem;
        console.log(isPrem);

        console.log("Premium passed");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   console.log("Signed in successfully");

        //Pref check
        var docRef = db.collection("premiumID").doc("premPrefs").collection(uid).doc("Prefs");
        docRef.get().then(function (doc) {
          if (doc.exists) {
            console.log("Prem Prefs exist", doc.data());
            console.log("Prem Prefs ", doc.data().prefs);
            if (doc.data().prefs == true) {
             console.log("Redirecting to home");
              window.location.href = "https://andronix-techriz.firebaseapp.com/home.html";
            }
            else{
              console.log("Prem Prefs are false");
              console.log("Redirecting to check");
              window.location.href = "https://andronix-techriz.firebaseapp.com/premiumCon.html";
            }
          } else {
           console.log("Prefs do not exist")
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });

      }
      else {
        console.log("No such document!");
        isPrem = false;
      }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });


    // console.log(uid + ' ' + id);

    // var docRef = db.collection("PremIDTest").doc(uid).collection("premID");
    //       docRef.get().then(function (doc) {
    //         if (doc.exists) {
    //             onsole.log("Prefs do exist")
    //           }
    //          else {
    //          console.log("Prefs do not exist")
    //         }
    //       }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //       });
    
}

function updatePref() {

    var db = firebase.firestore();

    db.collection("premiumID").doc("premPrefs").collection(uid).set({
        pref: true,
    })
        .then(function () {
            console.log("Pref Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });


}