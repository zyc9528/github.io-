/**
 * 投资与开发策略建议图表
 * 用于创建和渲染投资策略相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', initInvestmentCharts);

// 监听图表重新加载事件
document.addEventListener('chartreload', initInvestmentCharts);

// 初始化投资策略图表
function initInvestmentCharts() {
    // 投资优先级赛道图表
    const investmentPriorityChart = document.getElementById('investment-priority-chart');
    if (!investmentPriorityChart) return;
    
    // 确保获取到的是Canvas元素或创建一个新的Canvas
    let canvas;
    if (investmentPriorityChart.tagName === 'CANVAS') {
        canvas = investmentPriorityChart;
    } else {
        // 清空容器
        investmentPriorityChart.innerHTML = '';
        // 创建Canvas元素
        canvas = document.createElement('canvas');
        investmentPriorityChart.appendChild(canvas);
    }
    
    // 使用Canvas创建图表
    const investmentPriorityCtx = canvas.getContext('2d');
    if (!investmentPriorityCtx) return;
    new Chart(investmentPriorityCtx, {
        type: 'bar',
        data: {
            labels: ['产业地产(甘泉堡经开区)', '产业地产(经开区)', '核心区商住混合(天山区)'],
            datasets: [{
                label: '投资优先级评分',
                data: [85, 78, 72],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(37, 99, 235, 0.6)',
                    'rgba(37, 99, 235, 0.4)'
                ],
                borderColor: [
                    'rgba(37, 99, 235, 1)',
                    'rgba(37, 99, 235, 1)',
                    'rgba(37, 99, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '优先级评分'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '投资区域'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '投资优先级赛道评分',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
    
    // 风险评估图表
    const riskAssessmentChart = document.getElementById('risk-assessment-chart');
    if (!riskAssessmentChart) return;
    
    // 确保获取到的是Canvas元素或创建一个新的Canvas
    let riskCanvas;
    if (riskAssessmentChart.tagName === 'CANVAS') {
        riskCanvas = riskAssessmentChart;
    } else {
        // 清空容器
        riskAssessmentChart.innerHTML = '';
        // 创建Canvas元素
        riskCanvas = document.createElement('canvas');
        riskAssessmentChart.appendChild(riskCanvas);
    }
    
    // 使用Canvas创建图表
    const riskAssessmentCtx = riskCanvas.getContext('2d');
    if (!riskAssessmentCtx) return;
    new Chart(riskAssessmentCtx, {
        type: 'radar',
        data: {
            labels: ['供应过剩风险', '流拍风险', '政策风险', '市场波动风险', '资金回收风险'],
            datasets: [
                {
                    label: '米东区住宅',
                    data: [85, 40, 50, 60, 65],
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    pointBackgroundColor: 'rgba(239, 68, 68, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(239, 68, 68, 1)'
                },
                {
                    label: '甘泉堡工业用地',
                    data: [30, 75, 45, 55, 70],
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    pointBackgroundColor: 'rgba(245, 158, 11, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(245, 158, 11, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: '风险评估对比',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}