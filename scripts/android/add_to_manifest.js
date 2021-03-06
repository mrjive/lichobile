const fs = require('fs');

module.exports = function() {

  const LINES_TO_ADD = [
    {
      text: ' android:installLocation="auto"',
      after: '<manifest'
    },
    {
      text: ' android:hapticFeedbackEnabled="false"',
      after: '<manifest'
    },
    {
      text: ' android:resizeableActivity="false"',
      after: '<application'
    }
  ];

  const MANIFEST = 'platforms/android/app/src/main/AndroidManifest.xml';

  var manifestText = fs.readFileSync(MANIFEST).toString();

  LINES_TO_ADD.forEach(function(lineToAdd) {
    if (manifestText.indexOf(lineToAdd.text) === -1) {
      manifestText = manifestText.replace(lineToAdd.after, lineToAdd.after + lineToAdd.text);
    }
  });

  fs.writeFileSync(MANIFEST, manifestText);

};
