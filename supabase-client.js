(function () {
  // ↓ 아래 두 줄을 PHASE 0-2에서 복사한 실제 값으로 교체하세요
  var SUPABASE_URL      = 'https://vydnigilbemznsjozxdb.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5ZG5pZ2lsYmVtem5zam96eGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NjYyNjEsImV4cCI6MjA5NjU0MjI2MX0.OWDopqLtvS2qBupxOHufH6xtfKOtZ0c9SqU7z26vpMc';
  // ↑ service_role key는 절대 이 파일에 넣지 마세요

  window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  function showStatus(ok, msg) {
    var el = document.createElement('div');
    el.style.cssText =
      'position:fixed;bottom:72px;left:50%;transform:translateX(-50%);' +
      'padding:10px 16px;border-radius:8px;font-size:13px;' +
      "font-family:'Noto Sans KR',sans-serif;z-index:9999;white-space:nowrap;" +
      (ok
        ? 'background:#E1F5EE;color:#0F6E56;'
        : 'background:#FEE2E2;color:#E53935;');
    el.textContent = msg;
    document.body.appendChild(el);
    if (ok) {
      setTimeout(function () { el.remove(); }, 2000);
    }
  }

  async function testConnection() {
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
      showStatus(false, '⚙️ Supabase URL을 입력해주세요 (supabase-client.js 4번째 줄)');
      return;
    }

    try {
      var res = await window.supabase.from('app_config').select('key').limit(1);
      if (res.error) {
        var m = (res.error.message || '').toLowerCase();
        if (m.includes('failed to fetch') || m.includes('networkerror')) {
          showStatus(false, '❌ DB 연결 실패: 네트워크 오류');
        } else {
          // 서버가 응답함(테이블 없음 등 서버측 오류도 연결 자체는 성공)
          showStatus(true, '✅ DB 연결 성공');
        }
      } else {
        showStatus(true, '✅ DB 연결 성공');
      }
    } catch (e) {
      showStatus(false, '❌ DB 연결 실패: ' + (e.message || '알 수 없는 오류'));
    }
  }

  document.addEventListener('DOMContentLoaded', testConnection);
})();
