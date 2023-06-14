'use strict';

var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});

// zvf1kAN4NexAETh/c3pSt/Ue6vXVoGdqfMbuNIuSWetedEPwGbnYMruYf2SELwHdfKx9f9MAsMoFGmUH6M03znCPEDLfkAQkvht+0u7Bh3xe1Wffa2apBi4YFpEurfyez4Vrs0eYE7zVC8nuyZml2M6m/Wwk+mWidUBikI9v3bLU3WtPBN5JGoI2ORTQAygkiYNksJx4TbU9lz+aKTIL2LphCkXPNvzp2/HOg7pUwoehXZUTDPpoaENULshhcBId+dW/m30MapmEr5XODzFzudrnayfpkEe6wJ+xxvojw8zSScuPJiURBF/1Wu08M3ZGpX+umJznCsT1LSQ1lMfBwRjZDthMv4bP0WJykYllmNm0WKm/Sx8n8cehGREO+dIDwGfMzC/9jKeEZ6SFPWjXlZ3OgDOFZ04poTqZUMKdZJoaLCP/dLBDnQoeMXdGT0DwFtcPXYOtvRRatBFao/K+ID3KRGiGr/sUKCadx77sAXd98TwJfYEbrw9iCa3MgYz+vuGp2HQt4tBxSPBB1/zAwY1q3emhJiHGLpsXLI5jxqiU4+R8ozxKsXZNMXEmKitj4udNWavUW0sFOpGD+o/p6vV2tEHVqmvt21O3kpf32z63f0yL5PaOlk2b4EuAT88Su3L3V6ZF/G4Rs/By6jQzhcSH6hSMJCfrYmbVL1Uktry8zNV8r4bcg8L3EBrWIrAJllDzvdd7RzTlOSrsZ7trWZAGjNCzIEYvmwcR9V/OKzd1KxJ9LnyOD4tWGTDAzpZtXMDwv7AfdVU29bqwRw7AJSd5q60G0Aw0E3dXpa+4nyfiPNY00kmY/M89tRlQku0wk9iJt76YSNH8zAfjmgND8qw4QFv7XD3BqPNyIpPf4qiAL2u+AV2bymukA1fsCJGHnzv8+WKmhXqKH2cr+NU/DpieijRnXIFt/8sJ6Wy9SSc=
