import { Chart } from "chart.js"

export const CHART_COLORS = [
    'rgba(255, 182, 193, 0.7)',
    'rgba(173, 216, 230, 0.7)',
    'rgba(144, 238, 144, 0.7)',
    'rgba(255, 218, 185, 0.7)',
    'rgba(221, 160, 221, 0.7)',
    'rgba(176, 196, 222, 0.7)',
    'rgba(255, 228, 181, 0.7)',
    'rgba(216, 191, 216, 0.7)',
    'rgba(176, 224, 230, 0.7)',
    'rgba(255, 192, 203, 0.7)'
  ]
  
  export const CHART_BORDER_COLORS = [
    'rgba(255, 182, 193, 1)',
    'rgba(173, 216, 230, 1)',
    'rgba(144, 238, 144, 1)',
    'rgba(255, 218, 185, 1)',
    'rgba(221, 160, 221, 1)',
    'rgba(176, 196, 222, 1)',
    'rgba(255, 228, 181, 1)',
    'rgba(216, 191, 216, 1)',
    'rgba(176, 224, 230, 1)',
    'rgba(255, 192, 203, 1)'
  ]
  Chart.defaults.backgroundColor = CHART_COLORS
  Chart.defaults.onHover = (event, active) => {
    const target = event.native?.target as HTMLElement
    if (active.length > 0 && target) {
      target.style.cursor = 'pointer'
    } else {
      target.style.cursor = 'default'
    }
  }