let count = 0;
let username = "";
let users = [];

// 페이지 로드 시 기존 데이터 불러오기
window.onload = function() {
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    if (savedUsers) {
        users = savedUsers;
        updateRanking();
    }
};

// 로그인 버튼 클릭 시
document.getElementById('loginButton').addEventListener('click', function() {
    username = document.getElementById('username').value;
    if (username) {
        // 로그인 섹션 숨기기
        document.getElementById('loginSection').style.display = 'none';
        // 게임 섹션 보이기
        document.getElementById('gameSection').style.display = 'block';
        document.getElementById('rankingSection').style.display = 'block';
        // 사용자 이름 환영 인사
        document.getElementById('greeting').textContent = username + '님, 환영합니다!';
        
        // 새로운 유저 추가 또는 기존 유저 찾기
        let existingUser = users.find(user => user.name === username);
        if (!existingUser) {
            users.push({ name: username, clicks: 0 });
        } else {
            count = existingUser.clicks; // 기존 클릭 수 불러오기
        }

        updateRanking();
        updateLocalStorage(); // 데이터 저장
    } else {
        alert("이름을 입력하세요!");
    }
});

// 클릭 버튼 클릭 시
document.getElementById('clickButton').addEventListener('click', function() {
    count++;
    document.getElementById('count').textContent = '클릭 수: ' + count;

    // 유저 클릭 수 업데이트
    for (let user of users) {
        if (user.name === username) {
            user.clicks = count;
        }
    }

    // 랭킹 업데이트
    updateRanking();
    updateLocalStorage(); // 데이터 저장
});

// 랭킹 업데이트 함수
function updateRanking() {
    // 클릭 수에 따라 유저를 정렬
    users.sort((a, b) => b.clicks - a.clicks);

    // 랭킹 테이블 업데이트
    const rankingTableBody = document.querySelector('#rankingTable tbody');
    rankingTableBody.innerHTML = ''; // 기존 내용을 비우기

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.clicks}</td>
        `;
        rankingTableBody.appendChild(row);
    });
}

// 데이터 저장 함수
function updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users));
}


