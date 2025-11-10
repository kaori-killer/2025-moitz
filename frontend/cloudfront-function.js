function handler(event) {
  var req = event.request;
  var headers = req.headers || {};
  var qs = req.querystring || {};

  var ua = (headers['user-agent'] && headers['user-agent'].value || '').toLowerCase();
  var isBot = /facebook|twitterbot|kakaotalk|naverbot|slackbot|bot|crawler|spider/i.test(ua);
  var isResultPage = /^\/result\/[A-Za-z0-9._-]+$/.test(req.uri);

  var count = getParam('count');
  var place = getParam('place');

  // 봇 접근 시 동적 OG 태그 생성
  if (isBot && isResultPage && count) {
    return createOgResponse(req, headers, count, place);
  }

  // 일반 사용자는 쿼리스트링 제거
  if (!isBot && Object.keys(qs).length > 0) {
    req.querystring = {};
  }

  return req;

  // 헬퍼 함수
  function getParam(key, defaultValue) {
    var item = qs[key];
    if (!item || !item.value) return defaultValue || '';
    return decodeURIComponent(item.value.replace(/\+/g, ' '));
  }

  function createTitle(count, place) {
    if (!count || parseInt(count) <= 0) return '모잇지 추천 결과';

    var num = parseInt(count);
    if (place && num > 1) return place + ' 등 ' + num + '곳에서 출발하는 모임 장소를 추천했어요!';
    if (place) return place + '에서 출발하는 모임 장소를 추천했어요!';
    return num + '곳에서 출발하는 모임 장소를 추천했어요!';
  }

  function createOgResponse(req, headers, count, place) {
    var host = (headers.host && headers.host.value) || 'moitz.kr';
    var url = 'https://' + host + req.uri;
    var title = createTitle(count, place);
    var description = '친구들과 모임, 만날 지역을 빠르게! 모잇지📍';
    var image = 'https://moitz.kr/og-image.png';
    var siteName = '모잇지';
    var imageAlt = '모잇지 - 친구들과 모임, 만날 지역을 빠르게!';

    var html =
      '<!doctype html><html lang="ko"><head>' +
      '<meta charset="utf-8"/>' +
      '<meta name="viewport" content="width=device-width,initial-scale=1"/>' +
      '<meta property="og:locale" content="ko_KR"/>' +
      '<meta property="og:title" content="' + escape(title) + '"/>' +
      '<meta property="og:description" content="' + escape(description) + '"/>' +
      '<meta property="og:type" content="website"/>' +
      '<meta property="og:image" content="' + escape(image) + '"/>' +
      '<meta property="og:image:width" content="1200"/>' +
      '<meta property="og:image:height" content="600"/>' +
      '<meta property="og:image:alt" content="' + escape(imageAlt) + '"/>' +
      '<meta property="og:url" content="' + escape(url) + '"/>' +
      '<meta property="og:site_name" content="' + escape(siteName) + '"/>' +
      '<meta name="twitter:card" content="summary_large_image"/>' +
      '<meta name="twitter:title" content="' + escape(title) + '"/>' +
      '<meta name="twitter:description" content="' + escape(description) + '"/>' +
      '<meta name="twitter:image" content="' + escape(image) + '"/>' +
      '<title>' + escape(title) + '</title>' +
      '</head><body></body></html>';

    return {
      statusCode: 200,
      statusDescription: 'OK',
      headers: {
        'content-type': { value: 'text/html; charset=UTF-8' },
        'cache-control': { value: 'no-store, max-age=0' }
      },
      body: { encoding: 'text', data: html }
    };
  }

  function escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

