// Life Timer - メインスクリプト

// 健康寿命データ（1975-2025年）
const healthLifeExpectancy = {
    1975: { male: 64.6, female: 68.5 },
    1976: { male: 64.8, female: 68.7 },
    1977: { male: 64.9, female: 68.8 },
    1978: { male: 65.1, female: 69.0 },
    1979: { male: 65.3, female: 69.1 },
    1980: { male: 65.5, female: 69.3 },
    1981: { male: 65.6, female: 69.4 },
    1982: { male: 65.8, female: 69.6 },
    1983: { male: 66.0, female: 69.7 },
    1984: { male: 66.2, female: 69.9 },
    1985: { male: 66.3, female: 70.0 },
    1986: { male: 66.5, female: 70.2 },
    1987: { male: 66.7, female: 70.3 },
    1988: { male: 66.9, female: 70.5 },
    1989: { male: 67.1, female: 70.6 },
    1990: { male: 67.3, female: 70.8 },
    1991: { male: 67.4, female: 70.9 },
    1992: { male: 67.6, female: 71.1 },
    1993: { male: 67.8, female: 71.2 },
    1994: { male: 68.0, female: 71.4 },
    1995: { male: 68.1, female: 71.5 },
    1996: { male: 68.3, female: 71.7 },
    1997: { male: 68.5, female: 71.8 },
    1998: { male: 68.7, female: 72.0 },
    1999: { male: 68.9, female: 72.1 },
    2000: { male: 69.0, female: 72.3 },
    2001: { male: 69.4, female: 72.7 },
    2002: { male: 69.6, female: 72.8 },
    2003: { male: 69.8, female: 73.0 },
    2004: { male: 69.5, female: 72.7 },
    2005: { male: 69.9, female: 73.1 },
    2006: { male: 70.1, female: 73.3 },
    2007: { male: 70.3, female: 73.4 },
    2008: { male: 70.5, female: 73.6 },
    2009: { male: 70.7, female: 73.7 },
    2010: { male: 70.4, female: 73.6 },
    2011: { male: 70.9, female: 73.9 },
    2012: { male: 71.1, female: 74.1 },
    2013: { male: 71.2, female: 74.2 },
    2014: { male: 71.4, female: 74.4 },
    2015: { male: 71.6, female: 74.5 },
    2016: { male: 72.1, female: 74.8 },
    2017: { male: 72.2, female: 75.0 },
    2018: { male: 72.4, female: 75.1 },
    2019: { male: 72.7, female: 75.4 },
    2020: { male: 72.8, female: 75.5 },
    2021: { male: 73.0, female: 75.7 },
    2022: { male: 72.6, female: 75.5 },
    2023: { male: 73.3, female: 75.8 },
    2024: { male: 73.4, female: 76.0 },
    2025: { male: 73.6, female: 76.1 }
};

// DOM要素の取得
const lifeForm = document.getElementById('lifeForm');
const resultSection = document.getElementById('resultSection');
const remainingYearsElement = document.getElementById('remainingYears');
const totalHealthyYearsElement = document.getElementById('totalHealthyYears');
const currentAgeElement = document.getElementById('currentAge');
const remainingDaysElement = document.getElementById('remainingDays');
const livedPercentageElement = document.getElementById('livedPercentage');
const progressOverlay = document.getElementById('progressOverlay');

// フォーム送信イベントリスナー
lifeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const birthYear = parseInt(document.getElementById('birthYear').value);
    const gender = document.getElementById('gender').value;
    
    // バリデーション
    if (!birthYear || !gender) {
        showAlert('すべての項目を入力してください');
        return;
    }
    
    if (birthYear < 1975 || birthYear > 2025) {
        showAlert('1975年から2025年の間で入力してください');
        return;
    }
    
    // 計算と表示
    calculateLifeTimer(birthYear, gender);
});

/**
 * 人生タイマーの計算
 * @param {number} birthYear - 生まれた年
 * @param {string} gender - 性別 (male/female)
 */
function calculateLifeTimer(birthYear, gender) {
    const currentYear = new Date().getFullYear();
    const currentAge = currentYear - birthYear;
    const healthyLifeExpectancy = healthLifeExpectancy[birthYear][gender];
    const remainingYears = Math.max(0, healthyLifeExpectancy - currentAge);
    const remainingDays = Math.round(remainingYears * 365.25);
    const livedPercentage = Math.min(100, Math.round((currentAge / healthyLifeExpectancy) * 100));
    
    // 結果の表示
    updateVisualization(remainingYears, healthyLifeExpectancy, currentAge, remainingDays, livedPercentage);
}

/**
 * 可視化の更新
 * @param {number} remainingYears - 残り年数
 * @param {number} healthyLifeExpectancy - 健康寿命
 * @param {number} currentAge - 現在の年齢
 * @param {number} remainingDays - 残り日数
 * @param {number} livedPercentage - 経過率
 */
function updateVisualization(remainingYears, healthyLifeExpectancy, currentAge, remainingDays, livedPercentage) {
    // 数値の更新
    remainingYearsElement.textContent = remainingYears.toFixed(1);
    totalHealthyYearsElement.textContent = healthyLifeExpectancy.toFixed(1);
    currentAgeElement.textContent = currentAge;
    remainingDaysElement.textContent = remainingDays.toLocaleString();
    livedPercentageElement.textContent = livedPercentage + '%';
    
    // 円形進行表示の更新
    updateProgressCircle(livedPercentage);
    
    // 結果セクションの表示
    resultSection.classList.add('show');
}

/**
 * 進行円の更新
 * @param {number} percentage - 経過率（0-100）
 */
function updateProgressCircle(percentage) {
    const progressAngle = (percentage / 100) * 360;
    
    // 円形進行表示の更新（経過部分を赤で表示）
    progressOverlay.style.background = `conic-gradient(
        transparent 0deg,
        rgba(255, 107, 107, 0.8) 0deg,
        rgba(255, 107, 107, 0.8) ${progressAngle}deg,
        transparent ${progressAngle}deg
    )`;
}

/**
 * アラート表示
 * @param {string} message - メッセージ
 */
function showAlert(message) {
    alert(message);
}

/**
 * 数値のフォーマット
 * @param {number} num - 数値
 * @returns {string} フォーマットされた文字列
 */
function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * 年齢計算の詳細版（月日も考慮）
 * @param {Date} birthDate - 生年月日
 * @returns {number} 正確な年齢
 */
function calculateExactAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// 初期化処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('Life Timer initialized');
    
    // 現在年を生まれた年の最大値に設定
    const currentYear = new Date().getFullYear();
    const birthYearInput = document.getElementById('birthYear');
    birthYearInput.setAttribute('max', currentYear);
    
    // プレースホルダーの年を現在年-30に設定
    const placeholderYear = currentYear - 30;
    birthYearInput.setAttribute('placeholder', `例: ${placeholderYear}`);
});

// エラーハンドリング
window.addEventListener('error', function(e) {
    console.error('Life Timer Error:', e.error);
    showAlert('エラーが発生しました。ページを再読み込みしてください。');
});

// デバッグ用の関数
function debugHealthData() {
    console.log('健康寿命データ:', healthLifeExpectancy);
    console.log('データ年数:', Object.keys(healthLifeExpectancy).length);
}