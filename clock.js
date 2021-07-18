const clockContainer = document.querySelector('.clock'),
    /* soup 때처럼 부모 element의 자식 element 가져오기 */
    // 따로 . 이나 # 이 없다면 HTML 태그
    clockTitle = clockContainer.querySelector('.clock__title')

// 현재 시각 얻기
function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // 시간이 업데이트가 될까?
    const seconds = date.getSeconds();
    /* 업데이트가 되지만 새로고침을 해야 한다.
    => setInterval(함수, 기간)을 사용한다. 
    함수를 기간마다 실행한다*/

    /* 숫자가 10보다 작으면 앞에 0을 붙이자 => 삼항연산자 */
    clockTitle.innerHTML = `
    ${hours< 10 ? '0' + hours : hours}:${minutes< 10 ? '0' + minutes : minutes}:${seconds< 10 ? '0' + seconds : seconds}`

}

function init() {
    getTime()
    setInterval(getTime, 1000)
}

init();