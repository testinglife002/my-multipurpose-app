import React from 'react';
import { formatDateAxis, isWeekend, isToday } from '../../utils/dateUtils';
import './TimelineHeader.css';
export function TimelineHeader({
  dates,
  zoom,
  pixelsPerDay
}) {
  return <div className="timeline-header">
      <div className="timeline-header-sidebar">
        Stage / Task
      </div>
      
      <div className="timeline-header-dates">
        {dates.map((date, i) => {
        const isWknd = isWeekend(date);
        const isTdy = isToday(date);
        return <div key={i} className={`date-column ${isWknd ? 'weekend' : ''} ${isTdy ? 'today' : ''}`} style={{
          width: pixelsPerDay
        }}>
              <span className={`date-label ${isTdy ? 'today-text' : ''}`}>
                {formatDateAxis(date, zoom)}
              </span>
              
              {zoom === 'day' && <span className="year-label">
                  {date.getFullYear()}
                </span>}
              
              {isTdy && <div className="today-indicator" />}
            </div>;
      })}
      </div>
    </div>;
}