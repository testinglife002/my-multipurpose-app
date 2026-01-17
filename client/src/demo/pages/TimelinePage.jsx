import React, { useEffect, useMemo, useState, useRef } from 'react';
import { subDays } from 'date-fns';
import { INITIAL_TASKS, STAGES } from '../data/mockData';
import { getPixelsPerDay, generateDateAxis, isToday } from '../utils/dateUtils';
import { TimelineHeader } from '../components/Timeline/TimelineHeader';
import { TaskBar } from '../components/Timeline/TaskBar';
import { DependencyLines } from '../components/Timeline/DependencyLines';
import { ZoomControls } from '../components/Timeline/ZoomControls';
import { TaskOverlay } from '../components/TaskDetail/TaskOverlay';
import { Button } from '../components/ui/Button';
import { Plus, Filter, Settings, Search } from 'lucide-react';
import './TimelinePage.css';
export function TimelinePage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [zoom, setZoom] = useState('day');
  const [selectedTask, setSelectedTask] = useState(null);
  const [viewportStart, setViewportStart] = useState(subDays(new Date(), 2));
  const containerRef = useRef(null);
  const pixelsPerDay = getPixelsPerDay(zoom);
  const totalDays = 60;
  const dates = useMemo(() => generateDateAxis(viewportStart, totalDays, zoom), [viewportStart, totalDays, zoom]);
  const handleTaskUpdate = updatedTask => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };
  const handleTodayClick = () => {
    setViewportStart(subDays(new Date(), 2));
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  };
  const ROW_HEIGHT = 64;
  const getTaskRowIndex = taskId => {
    let rowIndex = 0;
    for (const stage of STAGES) {
      const stageTasks = tasks.filter(t => t.stage === stage);
      const taskIndex = stageTasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        return rowIndex + taskIndex;
      }
      rowIndex += Math.max(stageTasks.length, 1);
    }
    return -1;
  };
  return <div className="timeline-page" style={{marginTop:'40px'}} >
      <header className="app-header">
        <div className="header-left">
          <div className="app-logo">
            <span>P</span>
          </div>
          <h1 className="app-title">Product Roadmap</h1>
          <div className="divider" />
          <div className="header-meta">
            <span className="meta-primary">Q4 2023</span>
            <span>•</span>
            <span>6 Active Tasks</span>
          </div>
        </div>

        <div className="header-right">
          <div className="search-wrapper">
            <Search className="search-icon" />
            <input type="text" placeholder="Search tasks..." className="search-input" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="btn-icon-left" />
            Filter
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="btn-icon-left" />
            New Task
          </Button>
          <div className="user-profile">
            <img src="https://i.pravatar.cc/150?u=1" alt="Profile" />
          </div>
        </div>
      </header>

      <div className="toolbar">
        <ZoomControls currentZoom={zoom} onZoomChange={setZoom} onTodayClick={handleTodayClick} />
        <div className="view-settings">
          <Settings className="icon-sm" />
          <span>View Settings</span>
        </div>
      </div>

      <div className="timeline-container" ref={containerRef}>
        <div className="sidebar">
          <div className="sidebar-header">Stages</div>
          <div className="sidebar-content">
            {STAGES.map(stage => {
            const stageTasks = tasks.filter(t => t.stage === stage);
            const height = Math.max(stageTasks.length * ROW_HEIGHT, ROW_HEIGHT);
            const progress = stageTasks.length ? stageTasks.reduce((acc, t) => acc + t.completion, 0) / stageTasks.length : 0;
            return <div key={stage} className="sidebar-row" style={{
              height
            }}>
                  <div className="stage-info">
                    <span className="stage-name">{stage}</span>
                    <span className="stage-count">{stageTasks.length}</span>
                  </div>
                  <div className="stage-progress-bg">
                    <div className="stage-progress-fill" style={{
                  width: `${progress}%`
                }} />
                  </div>
                </div>;
          })}
          </div>
        </div>

        <div className="timeline-grid-wrapper">
          <div style={{
          width: dates.length * pixelsPerDay,
          minWidth: '100%'
        }}>
            <TimelineHeader dates={dates} zoom={zoom} pixelsPerDay={pixelsPerDay} />

            <div className="timeline-content">
              <div className="grid-lines">
                {dates.map((date, i) => <div key={i} className={`grid-column ${isToday(date) ? 'today' : ''}`} style={{
                width: pixelsPerDay
              }} />)}
                {dates.some(d => isToday(d)) && <div className="today-line" style={{
                left: getPixelsPerDay(zoom) * dates.findIndex(d => isToday(d)) + getPixelsPerDay(zoom) / 2
              }}>
                    <div className="today-dot" />
                  </div>}
              </div>

              {STAGES.map(stage => {
              const stageTasks = tasks.filter(t => t.stage === stage);
              const height = Math.max(stageTasks.length * ROW_HEIGHT, ROW_HEIGHT);
              return <div key={stage} className="swim-lane" style={{
                height
              }}>
                    {stageTasks.map((task, index) => <div key={task.id} className="task-row" style={{
                  top: index * ROW_HEIGHT,
                  height: ROW_HEIGHT
                }}>
                        <TaskBar task={task} timelineStart={viewportStart} pixelsPerDay={pixelsPerDay} onClick={setSelectedTask} />
                      </div>)}
                  </div>;
            })}

              <DependencyLines tasks={tasks} timelineStart={viewportStart} pixelsPerDay={pixelsPerDay} rowHeight={ROW_HEIGHT} getTaskRowIndex={getTaskRowIndex} />
            </div>
          </div>
        </div>
      </div>

      {selectedTask && <TaskOverlay task={selectedTask} onClose={() => setSelectedTask(null)} onUpdate={handleTaskUpdate} />}
    </div>;
}