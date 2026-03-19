// src/mockData.js
export const initialProducts = (() => {
    const sortedTeams = ["KIA", "Lotte", "LG", "Doosan", "KT", "SSG", "Hanwha", "NC", "Kiwoom", "Samsung"];
    const itemNames = [
        "에센셜모자1", "에센셜모자2", "에센셜모자3", "모자레플리카1", "모자레플리카2", "모자레플리카3",
        "에센셜유니폼1", "레플리카유니폼1", "시즌유니폼1", "에센셜유니폼2", "레플리카유니폼2", "시즌유니폼2",
        "응원봉1", "응원봉2", "머리띠1", "백팩1", "키링1", "슬로건1", "텀블러1", "후드티1"
    ];

    let data = [];
    sortedTeams.forEach((team) => {
        for (let i = 0; i < 20; i++) {
            data.push({
                id: `${team}-${100 + i}`,
                name: `${team} ${itemNames[i]}`,
                price: 35000 + (i * 2000),
                teamName: team,
                stockQuantity: 50,
                description: `${team} 구단의 공식 프리미엄 굿즈입니다.`,
                imageUrl: "https://via.placeholder.com/800x566?text=KBO+GOODS"
            });
        }
    });
    return data;
})();