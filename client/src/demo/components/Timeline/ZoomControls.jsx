import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import './ZoomControls.css';
export function ZoomControls({
  currentZoom,
  onZoomChange,
  onTodayClick
}) {
  const zoomLevels = ['day', 'week', 'month'];
  return <div className="zoom-controls">
      <Button variant="ghost" size="sm" onClick={onTodayClick} className="today-btn">
        <Calendar className="icon-sm" />
        Today
      </Button>
      
      <div className="divider-vertical" />
      
      <div className="zoom-segments">
        {zoomLevels.map(zoom => <button key={zoom} onClick={() => onZoomChange(zoom)} className={`zoom-segment ${currentZoom === zoom ? 'active' : ''}`}>
            {zoom.charAt(0).toUpperCase() + zoom.slice(1)}
          </button>)}
      </div>
    </div>;
}