import { memo } from 'react';
import './TornEdge.css';

const TornEdge = memo(function TornEdge({ position = 'top', color = 'var(--color-cream)', flip = false }) {
  const id = `torn-${position}-${Math.random().toString(36).substr(2, 5)}`;

  return (
    <div className={`torn-edge torn-edge--${position} ${flip ? 'torn-edge--flip' : ''}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="torn-edge__svg"
      >
        <path
          d={`M0,${position === 'top' ? '60' : '0'} 
              C20,${position === 'top' ? '45' : '18'} 40,${position === 'top' ? '55' : '8'} 60,${position === 'top' ? '48' : '15'}
              C80,${position === 'top' ? '42' : '22'} 100,${position === 'top' ? '50' : '12'} 130,${position === 'top' ? '44' : '19'}
              C160,${position === 'top' ? '38' : '25'} 180,${position === 'top' ? '52' : '10'} 220,${position === 'top' ? '46' : '17'}
              C260,${position === 'top' ? '40' : '23'} 290,${position === 'top' ? '54' : '9'} 320,${position === 'top' ? '42' : '21'}
              C350,${position === 'top' ? '30' : '33'} 380,${position === 'top' ? '48' : '15'} 410,${position === 'top' ? '44' : '19'}
              C440,${position === 'top' ? '40' : '23'} 470,${position === 'top' ? '52' : '11'} 500,${position === 'top' ? '38' : '25'}
              C530,${position === 'top' ? '24' : '39'} 560,${position === 'top' ? '50' : '13'} 590,${position === 'top' ? '46' : '17'}
              C620,${position === 'top' ? '42' : '21'} 650,${position === 'top' ? '54' : '9'} 680,${position === 'top' ? '40' : '23'}
              C710,${position === 'top' ? '36' : '27'} 740,${position === 'top' ? '48' : '15'} 780,${position === 'top' ? '44' : '19'}
              C820,${position === 'top' ? '40' : '23'} 850,${position === 'top' ? '56' : '7'} 880,${position === 'top' ? '42' : '21'}
              C910,${position === 'top' ? '28' : '35'} 940,${position === 'top' ? '50' : '13'} 970,${position === 'top' ? '46' : '17'}
              C1000,${position === 'top' ? '42' : '21'} 1030,${position === 'top' ? '52' : '11'} 1060,${position === 'top' ? '38' : '25'}
              C1090,${position === 'top' ? '34' : '29'} 1120,${position === 'top' ? '48' : '15'} 1150,${position === 'top' ? '44' : '19'}
              C1180,${position === 'top' ? '40' : '23'} 1210,${position === 'top' ? '54' : '9'} 1240,${position === 'top' ? '46' : '17'}
              C1270,${position === 'top' ? '38' : '25'} 1300,${position === 'top' ? '50' : '13'} 1340,${position === 'top' ? '42' : '21'}
              C1380,${position === 'top' ? '36' : '27'} 1410,${position === 'top' ? '48' : '15'} 1440,${position === 'top' ? '44' : '19'}
              L1440,${position === 'top' ? '0' : '60'} L0,${position === 'top' ? '0' : '60'} Z`}
          fill={color}
        />
      </svg>
    </div>
  );
});

export default TornEdge;
