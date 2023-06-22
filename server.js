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

// tcp
// zvf1kAN4NexAETh/c3pSt/Ue6vXVoGdqfMbuNIuSWetedEPwGbnYMruYf2SELwHdfKx9f9MAsMoFGmUH6M03znCPEDLfkAQkvht+0u7Bh3xe1Wffa2apBi4YFpEurfyez4Vrs0eYE7zVC8nuyZml2M6m/Wwk+mWidUBikI9v3bLU3WtPBN5JGoI2ORTQAygkiYNksJx4TbU9lz+aKTIL2LphCkXPNvzp2/HOg7pUwoehXZUTDPpoaENULshhcBId+dW/m30MapmEr5XODzFzudrnayfpkEe6wJ+xxvojw8zSScuPJiURBF/1Wu08M3ZGpX+umJznCsT1LSQ1lMfBwRjZDthMv4bP0WJykYllmNm0WKm/Sx8n8cehGREO+dIDwGfMzC/9jKeEZ6SFPWjXlZ3OgDOFZ04poTqZUMKdZJoaLCP/dLBDnQoeMXdGT0DwFtcPXYOtvRRatBFao/K+ID3KRGiGr/sUKCadx77sAXd98TwJfYEbrw9iCa3MgYz+vuGp2HQt4tBxSPBB1/zAwY1q3emhJiHGLpsXLI5jxqiU4+R8ozxKsXZNMXEmKitj4udNWavUW0sFOpGD+o/p6vV2tEHVqmvt21O3kpf32z63f0yL5PaOlk2b4EuAT88Su3L3V6ZF/G4Rs/By6jQzhcSH6hSMJCfrYmbVL1Uktry8zNV8r4bcg8L3EBrWIrAJllDzvdd7RzTlOSrsZ7trWZAGjNCzIEYvmwcR9V/OKzd1KxJ9LnyOD4tWGTDAzpZtXMDwv7AfdVU29bqwRw7AJSd5q60G0Aw0E3dXpa+4nyfiPNY00kmY/M89tRlQku0wk9iJt76YSNH8zAfjmgND8qw4QFv7XD3BqPNyIpPf4qiAL2u+AV2bymukA1fsCJGHnzv8+WKmhXqKH2cr+NU/DpieijRnXIFt/8sJ6Wy9SSc=
// ws
// 4YU2yXhnWjwMZAT6a6MGzHdFMiTjeCavchahR4qe/E6nDzbYhII5WyZE3ZodndhNt8LBP6OUjRN1UiOi7IAEnDIntbNwaTZMtA7daUSisQhauA3NmLhy7rX4eo8pNCiVcj/sdUlsM7whojxPPcT4TBKsxQEa0CLSihSad8j9b6cvZqchTpyEvkXM+WbqOEPM6xIx8OSpT3TRZn7rboeSE9E+UPNYyKK+OO7aOc9SJ3CojBK8ZrwiMXW9HJxkS9rMG4cGNB6rZkUn7QqqjKK5w1xjtrtt1eEmuzo+LAMoZJ16RY3A69ZKrCpzcaKbLKS5snG3gVWH7Qh0hAaa8zzUaEDQ7PZDtGhe+mYDUsMxZTPoyti7C5BaJWqfQTtwi5t1QC6wujSR8N2yo5klN27sgHLyDnOF99ydbtvDoRFFCAn/kY95aLMIQWvCj0rfeOUyU0arhGzh+GSTgYgZkLtlELo+HY2ZfiVlISufp2faDjB1U5sHYyiV6mSbO0oYqgQ4er1/b+FOKbbhLVmVfLgOqMoKqWpqtwaBxpx7cvZ3GZBY9T+jT0v5wr1b+nhCKSlSwzk4tjO45eO/ijvDqtxcvBn35Hz2ElHVWkqYvA0MoDRTA+hLZi44vQxA78Rfq4qEEgRXE/jrM02SeqNhUDESHswr8XD3o10E0dYGKRfcoOh1Ee6mNP7ZqSRwg5RHss2JqBU5SW7Q5nyQ/oLM3Ct+WWLPd5iQmB7Ekz7TvtFmtOw4678ebbefrioM+gHtdvTYgVSIRpoJpwseE+Q2klCz6arRyCvfOHe+SgTP8R8bwdark5ditZUTWoN0n4+uGj03l8k0FIg2II7P9wFpq00NT5tv9rSSM592zhIi9tHgj5UD8vFxF4NyHi0HuszrHFOGei9YUeVva33RQiQhCMaVDNxjREiyFPbCoNNzlrJdpO5qw75fbkBryNH/mMnyImnRlhY411tyayyOZkpF7xbbVXHQYnBX/TPobDEJLKEgYqRg6MpCe7UccCEkLh2+iANhOtzprY50B1z2Wv8ebwzr81Mlyjch1bJ4+YGO3/0iFsqt/Y7OrplRJxnzY/SyPgVCtTMsJB6e6o+wcGfG/qJf/yXpE7VaGZstwrm72EpTeu2UEroVepFvtCv6G2khO6h59atrHyAqYPmSFCYLBPXwM6VACEQ5hECbM6J/WWb/o3xkVMXFOjFHGcLS4UVMMYhYNUI9WUk6hsG8ylIAQOHMmsax7Tz4oYW1HgNVwCYiUFAzoj6VbfZcOGNmfwGmbC7A

