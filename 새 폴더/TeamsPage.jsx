import React from 'react';
import './TeamsPage.css';

const kboTeams = [
    { name: 'KIA 타이거즈', site: 'https://www.kiatigers.co.kr/'},
    { name: '롯데 자이언츠', site: 'https://www.giantsclub.com/' },
    { name: '삼성 라이온즈', site: 'https://www.samsunglions.com/' },
    { name: 'LG 트윈스', site: 'https://www.lgtwins.com/' },
    { name: '두산 베어스', site: 'https://www.doosanbears.com/' },
    { name: 'KT 위즈', site: 'https://www.ktwiz.co.kr/'},
    { name: 'SSG 랜더스', site: 'https://www.ssglanders.com/' },
    { name: '한화 이글스', site: 'https://www.hanwhaeagles.co.kr/' },
    { name: 'NC 다이노스', site: 'https://www.ncdinos.com/' },
    { name: '키움 히어로즈', site: 'https://www.heroesbaseball.co.kr/' }
];

const TeamsPage = () => {
    return (
        <div className="teams-container">
            <header className="teams-header slide-in-left">
                <span className="hero-subtitle">KBO LEAGUE TEAMS</span>
                <h2 className="teams-title">⚾️ 10개 구단 공식 정보</h2>
                <p className="teams-desc">응원하는 팀의 공식 소식을 가장 빠르게 확인하세요.</p>
                <div className='electric-btn visit-btn'>
                    <span>⚾️KBO공식홈 바로가기</span></div>
            </header>

            <div className="teams-grid">
                {kboTeams.map((team, index) => (
                    <a href={team.site} target="_blank" rel="noopener noreferrer" key={index} className="team-card-link">
                        <div className="team-card" style={{ borderTop: `6px solid ${team.color}` }}>
                            <div className="team-icon">🏟️</div>
                            <h3>{team.name}</h3>
                            {/* 전기 광선 버튼 적용 */}
                            <div className="electric-btn visit-btn">
                                <span>방문하기</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TeamsPage;